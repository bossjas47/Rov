import { firebaseService } from './FirebaseService.js';

export class PVPManager {
  constructor() {
    this.db = firebaseService.db;
    this.currentRoom = null;
    this.unsubscribeRoom = null;
    this.unsubscribeChat = null;
  }

  generateRoomId() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async createRoom(boFormat = 3, settings = {}) {
    const user = firebaseService.getCurrentUser();
    if (!user) return { success: false, error: 'กรุณาเข้าสู่ระบบก่อน' };

    const roomId = this.generateRoomId();
    const userData = await firebaseService.getUserData(user.uid);

    const roomData = {
      roomId,
      hostId: user.uid,
      hostName: userData?.username || user.displayName || 'Player 1',
      guestId: null,
      guestName: null,
      status: 'waiting',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      boFormat,
      hostSide: 'blue',
      guestSide: 'red',
      hostReady: false,
      guestReady: false,
      currentGame: 1,
      games: [],
      settings: {
        timePerTurn: settings.timePerTurn || 60,
        allowSpectator: settings.allowSpectator !== false,
        isRanked: settings.isRanked || false
      },
      winner: null
    };

    try {
      await this.db.collection('pvp_rooms').doc(roomId).set(roomData);
      this.currentRoom = { ...roomData, id: roomId };
      return { success: true, roomId };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async joinRoom(roomId) {
    const user = firebaseService.getCurrentUser();
    if (!user) return { success: false, error: 'กรุณาเข้าสู่ระบบก่อน' };

    try {
      const roomRef = this.db.collection('pvp_rooms').doc(roomId);
      const roomDoc = await roomRef.get();

      if (!roomDoc.exists) return { success: false, error: 'ไม่พบห้องนี้' };
      
      const roomData = roomDoc.data();
      if (roomData.status === 'finished') return { success: false, error: 'ห้องนี้ปิดแล้ว' };

      if (roomData.hostId === user.uid) {
        this.currentRoom = { ...roomData, id: roomId };
        return { success: true, roomId, isHost: true };
      }

      if (roomData.guestId && roomData.guestId !== user.uid) {
        return { success: false, error: 'ห้องเต็มแล้ว' };
      }

      const userData = await firebaseService.getUserData(user.uid);
      await roomRef.update({
        guestId: user.uid,
        guestName: userData?.username || user.displayName || 'Player 2',
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      this.currentRoom = { 
        ...roomData, 
        id: roomId,
        guestId: user.uid,
        guestName: userData?.username || user.displayName || 'Player 2'
      };

      return { success: true, roomId, isHost: false };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async leaveRoom() {
    if (!this.currentRoom) return { success: true };
    
    const user = firebaseService.getCurrentUser();
    const roomId = this.currentRoom.id;

    try {
      this.stopListening();
      const roomRef = this.db.collection('pvp_rooms').doc(roomId);
      const roomDoc = await roomRef.get();

      if (!roomDoc.exists) {
        this.currentRoom = null;
        return { success: true };
      }

      const roomData = roomDoc.data();

      if (roomData.hostId === user?.uid) {
        await roomRef.update({ status: 'finished', updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
      } else if (roomData.guestId === user?.uid) {
        await roomRef.update({
          guestId: null,
          guestName: null,
          guestReady: false,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }

      this.currentRoom = null;
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async switchSide() {
    if (!this.currentRoom) return { success: false, error: 'ไม่ได้อยู่ในห้อง' };
    
    const roomId = this.currentRoom.id;
    try {
      const roomRef = this.db.collection('pvp_rooms').doc(roomId);
      const roomDoc = await roomRef.get();
      const roomData = roomDoc.data();

      if (!roomData.guestId) return { success: false, error: 'ต้องมีผู้เล่นครบ 2 คนก่อน' };

      await roomRef.update({
        hostSide: roomData.guestSide,
        guestSide: roomData.hostSide,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async setReady(isReady) {
    if (!this.currentRoom) return { success: false, error: 'ไม่ได้อยู่ในห้อง' };
    
    const user = firebaseService.getCurrentUser();
    const roomId = this.currentRoom.id;

    try {
      const roomRef = this.db.collection('pvp_rooms').doc(roomId);
      const roomDoc = await roomRef.get();
      const roomData = roomDoc.data();

      const isHost = roomData.hostId === user.uid;
      const updateData = { updatedAt: firebase.firestore.FieldValue.serverTimestamp() };

      if (isHost) updateData.hostReady = isReady;
      else if (roomData.guestId === user.uid) updateData.guestReady = isReady;
      else return { success: false, error: 'คุณไม่ได้อยู่ในห้องนี้' };

      await roomRef.update(updateData);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async startDraft() {
    if (!this.currentRoom) return { success: false, error: 'ไม่ได้อยู่ในห้อง' };
    
    const roomId = this.currentRoom.id;
    try {
      const roomRef = this.db.collection('pvp_rooms').doc(roomId);
      const roomDoc = await roomRef.get();
      const roomData = roomDoc.data();

      if (!roomData.guestId) return { success: false, error: 'ต้องมีผู้เล่นครบ 2 คน' };
      if (!roomData.hostReady || !roomData.guestReady) return { success: false, error: 'ผู้เล่นทั้งสองต้องพร้อมก่อน' };

      const draftState = {
        currentStep: 0,
        currentTeam: 'blue',
        currentMode: 'ban',
        timerEndAt: null,
        blue: {
          bans: [],
          picks: [],
          playerId: roomData.hostSide === 'blue' ? roomData.hostId : roomData.guestId,
          isConnected: true
        },
        red: {
          bans: [],
          picks: [],
          playerId: roomData.hostSide === 'red' ? roomData.hostId : roomData.guestId,
          isConnected: true
        },
        globalBannedHeroes: [],
        isComplete: false,
        gameNumber: 1
      };

      await roomRef.update({
        status: 'drafting',
        draft: draftState,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async updateDraftState(draftState) {
    if (!this.currentRoom) return;
    const roomId = this.currentRoom.id;
    try {
      await this.db.collection('pvp_rooms').doc(roomId).update({
        draft: draftState,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (e) {
      console.error('Update draft error:', e);
    }
  }

  async nextGame() {
    if (!this.currentRoom) return;
    const roomId = this.currentRoom.id;
    try {
      const roomRef = this.db.collection('pvp_rooms').doc(roomId);
      const roomDoc = await roomRef.get();
      const roomData = roomDoc.data();

      const currentGame = roomData.currentGame || 1;
      const boFormat = roomData.boFormat || 3;

      if (currentGame >= boFormat) return { success: false, error: 'จบแมตช์แล้ว' };

      const games = roomData.games || [];
      games.push({
        gameNumber: currentGame,
        blue: { ...roomData.draft.blue },
        red: { ...roomData.draft.red },
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      const globalBannedHeroes = [
        ...roomData.draft.globalBannedHeroes,
        ...roomData.draft.blue.picks,
        ...roomData.draft.red.picks
      ];

      const newDraftState = {
        currentStep: 0,
        currentTeam: 'blue',
        currentMode: 'ban',
        timerEndAt: null,
        blue: { bans: [], picks: [], playerId: roomData.draft.blue.playerId, isConnected: true },
        red: { bans: [], picks: [], playerId: roomData.draft.red.playerId, isConnected: true },
        globalBannedHeroes,
        isComplete: false,
        gameNumber: currentGame + 1
      };

      await roomRef.update({
        currentGame: currentGame + 1,
        games,
        draft: newDraftState,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async endMatch(winner) {
    if (!this.currentRoom) return;
    const roomId = this.currentRoom.id;
    try {
      const roomRef = this.db.collection('pvp_rooms').doc(roomId);
      const roomDoc = await roomRef.get();
      const roomData = roomDoc.data();

      const games = roomData.games || [];
      if (roomData.draft && !roomData.draft.isComplete === false) {
        games.push({
          gameNumber: roomData.currentGame,
          blue: { ...roomData.draft.blue },
          red: { ...roomData.draft.red },
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
      }

      await roomRef.update({
        status: 'finished',
        winner,
        games,
        endedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      await this.saveMatchHistory(roomData, winner);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async saveMatchHistory(roomData, winner) {
    const matchData = {
      roomId: roomData.roomId,
      boFormat: roomData.boFormat,
      startedAt: roomData.createdAt,
      endedAt: firebase.firestore.FieldValue.serverTimestamp(),
      blue: {
        userId: roomData.hostSide === 'blue' ? roomData.hostId : roomData.guestId,
        userName: roomData.hostSide === 'blue' ? roomData.hostName : roomData.guestName,
        result: winner === 'blue' ? 'win' : 'lose'
      },
      red: {
        userId: roomData.hostSide === 'red' ? roomData.hostId : roomData.guestId,
        userName: roomData.hostSide === 'red' ? roomData.hostName : roomData.guestName,
        result: winner === 'red' ? 'win' : 'lose'
      },
      games: roomData.games || [],
      winner
    };

    await this.db.collection('pvp_matches').add(matchData);
  }

  async sendChat(message) {
    if (!this.currentRoom) return;
    const user = firebaseService.getCurrentUser();
    const roomId = this.currentRoom.id;

    try {
      const chatData = {
        userId: user.uid,
        userName: user.displayName || 'Unknown',
        message: message.trim(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      };

      await this.db.collection('pvp_rooms').doc(roomId).collection('chat').add(chatData);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  listenToRoom(roomId, onUpdate, onError) {
    if (this.unsubscribeRoom) this.unsubscribeRoom();
    this.unsubscribeRoom = this.db.collection('pvp_rooms').doc(roomId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.currentRoom = { ...doc.data(), id: doc.id };
          if (onUpdate) onUpdate(this.currentRoom);
        } else {
          if (onError) onError('ห้องถูกปิดแล้ว');
        }
      }, (error) => {
        if (onError) onError(error.message);
      });
  }

  listenToChat(roomId, onUpdate) {
    if (this.unsubscribeChat) this.unsubscribeChat();
    this.unsubscribeChat = this.db.collection('pvp_rooms').doc(roomId)
      .collection('chat')
      .orderBy('timestamp', 'asc')
      .limitToLast(50)
      .onSnapshot((snapshot) => {
        const messages = [];
        snapshot.forEach((doc) => messages.push({ id: doc.id, ...doc.data() }));
        if (onUpdate) onUpdate(messages);
      });
  }

  stopListening() {
    if (this.unsubscribeRoom) { this.unsubscribeRoom(); this.unsubscribeRoom = null; }
    if (this.unsubscribeChat) { this.unsubscribeChat(); this.unsubscribeChat = null; }
  }

  isHost() {
    const user = firebaseService.getCurrentUser();
    return this.currentRoom && this.currentRoom.hostId === user?.uid;
  }

  isGuest() {
    const user = firebaseService.getCurrentUser();
    return this.currentRoom && this.currentRoom.guestId === user?.uid;
  }

  getMySide() {
    const user = firebaseService.getCurrentUser();
    if (!this.currentRoom || !user) return null;
    if (this.currentRoom.hostId === user.uid) return this.currentRoom.hostSide;
    if (this.currentRoom.guestId === user.uid) return this.currentRoom.guestSide;
    return null;
  }

  getOpponentSide() {
    const mySide = this.getMySide();
    return mySide === 'blue' ? 'red' : 'blue';
  }

  isMyTurn() {
    if (!this.currentRoom || !this.currentRoom.draft) return false;
    const mySide = this.getMySide();
    const draft = this.currentRoom.draft;
    return draft.currentTeam === mySide && !draft.isComplete;
  }

  async requestRematch() {
    if (!this.currentRoom) return { success: false, error: 'ไม่ได้อยู่ในห้อง' };
    try {
      const result = await this.createRoom(this.currentRoom.boFormat, this.currentRoom.settings);
      if (result.success) return { success: true, newRoomId: result.roomId };
      return result;
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
}

export const pvpManager = new PVPManager();
