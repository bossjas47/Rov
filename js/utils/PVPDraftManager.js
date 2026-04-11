import { DraftManager } from './DraftManager.js';
import { pvpManager } from '../services/PVPManager.js';
import { firebaseService } from '../services/FirebaseService.js';

export class PVPDraftManager {
  constructor(toast) {
    this.toast = toast;
    this.draftManager = null;
    this.timerInterval = null;
    this.remainingTime = 60;
    this.onTimerUpdate = null;
    this.onDraftUpdate = null;
    this.unsubscribeDraft = null;
  }

  async init(onDraftUpdate, onTimerUpdate) {
    this.onDraftUpdate = onDraftUpdate;
    this.onTimerUpdate = onTimerUpdate;
    this.draftManager = new DraftManager(() => {}, this.toast);

    const room = pvpManager.currentRoom;
    if (!room || !room.draft) {
      return { success: false, error: 'ไม่พบข้อมูลการดราฟ' };
    }

    this.syncFromRoom(room);
    this.listenToDraft();
    this.startTimer();

    return { success: true };
  }

  syncFromRoom(room) {
    if (!room.draft) return;
    const draft = room.draft;

    this.draftManager.bo = room.boFormat || 3;
    this.draftManager.currentGame = room.currentGame || 1;

    this.draftManager.state = {
      blue: {
        bans: [...(draft.blue?.bans || [])],
        picks: [...(draft.blue?.picks || [])]
      },
      red: {
        bans: [...(draft.red?.bans || [])],
        picks: [...(draft.red?.picks || [])]
      },
      currentStep: draft.currentStep || 0,
      isComplete: draft.isComplete || false
    };

    this.draftManager.globalBannedHeroes = new Set(draft.globalBannedHeroes || []);

    if (room.games) {
      this.draftManager.games = room.games.map(g => ({
        gameNumber: g.gameNumber,
        blue: { ...g.blue },
        red: { ...g.red }
      }));
    }
  }

  listenToDraft() {
    if (this.unsubscribeDraft) this.unsubscribeDraft();
    const roomId = pvpManager.currentRoom?.id;
    if (!roomId) return;

    this.unsubscribeDraft = firebaseService.db
      .collection('pvp_rooms')
      .doc(roomId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const room = doc.data();
          if (room.draft) {
            this.syncFromRoom({ ...room, id: doc.id });
            if (this.onDraftUpdate) this.onDraftUpdate(this.getState());
          }
        }
      });
  }

  startTimer() {
    this.stopTimer();
    const room = pvpManager.currentRoom;
    if (!room || !room.draft) return;

    const timePerTurn = room.settings?.timePerTurn || 60;

    if (room.draft.timerEndAt) {
      const endTime = room.draft.timerEndAt.toMillis ? room.draft.timerEndAt.toMillis() : room.draft.timerEndAt;
      this.remainingTime = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    } else {
      this.remainingTime = timePerTurn;
      this.resetTimer();
    }

    this.timerInterval = setInterval(() => {
      this.remainingTime--;
      if (this.onTimerUpdate) this.onTimerUpdate(this.remainingTime);
      if (this.remainingTime <= 0) this.handleTimeout();
    }, 1000);

    if (this.onTimerUpdate) this.onTimerUpdate(this.remainingTime);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  async resetTimer() {
    const room = pvpManager.currentRoom;
    if (!room) return;

    const timePerTurn = room.settings?.timePerTurn || 60;
    const endTime = Date.now() + (timePerTurn * 1000);

    try {
      await firebaseService.db.collection('pvp_rooms').doc(room.id).update({
        'draft.timerEndAt': firebase.firestore.Timestamp.fromMillis(endTime),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      this.remainingTime = timePerTurn;
    } catch (e) {
      console.error('Reset timer error:', e);
    }
  }

  async handleTimeout() {
    if (!pvpManager.isMyTurn()) return;
    const step = this.draftManager.getCurrentStep();
    if (!step) return;

    const availableHeroes = this.getAvailableHeroes();
    if (availableHeroes.length === 0) {
      await this.forceNextStep();
      return;
    }

    const randomHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)];
    this.toast?.show(`หมดเวลา! เลือก ${randomHero.thaiName || randomHero.name} อัตโนมัติ`, 'warning');
    await this.selectHero(randomHero.id);
  }

  async forceNextStep() {
    const step = this.draftManager.getCurrentStep();
    if (!step) return;

    const room = pvpManager.currentRoom;
    if (!room) return;

    const newStep = (room.draft.currentStep || 0) + 1;
    const isComplete = newStep >= 16;

    const updateData = {
      'draft.currentStep': newStep,
      'draft.isComplete': isComplete,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (!isComplete) {
      const nextStep = this.getStepInfo(newStep);
      updateData['draft.currentTeam'] = nextStep.team;
      updateData['draft.currentMode'] = nextStep.type;
    }

    await firebaseService.db.collection('pvp_rooms').doc(room.id).update(updateData);
    await this.resetTimer();
  }

  async selectHero(heroId) {
    if (!pvpManager.isMyTurn()) {
      return { success: false, error: 'ไม่ใช่ตาของคุณ' };
    }

    // Optimistic UI: อัปเดตสถานะในเครื่องทันทีและแจ้ง UI ให้ Render ใหม่
    const result = this.draftManager.selectHero(heroId);
    if (!result.success) return result;

    // แจ้ง UI ให้ Render ทันทีโดยไม่ต้องรอ Firebase
    if (this.onDraftUpdate) {
      this.onDraftUpdate(this.getState());
    }

    // ทำงานเบื้องหลัง: ส่งข้อมูลไป Firebase และรีเซ็ต Timer
    // ไม่ใช้ await เพื่อให้ฟังก์ชันคืนค่ากลับไปที่ UI ทันที
    this.syncToFirestore().catch(e => console.error('Optimistic sync error:', e));
    this.resetTimer().catch(e => console.error('Optimistic timer error:', e));

    return { success: true };
  }

  async syncToFirestore() {
    const room = pvpManager.currentRoom;
    if (!room) return;

    const state = this.draftManager.state;
    const step = this.draftManager.getCurrentStep();

    const updateData = {
      'draft.blue.bans': state.blue.bans,
      'draft.blue.picks': state.blue.picks,
      'draft.red.bans': state.red.bans,
      'draft.red.picks': state.red.picks,
      'draft.currentStep': state.currentStep,
      'draft.isComplete': state.isComplete,
      'draft.globalBannedHeroes': Array.from(this.draftManager.globalBannedHeroes),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (step) {
      updateData['draft.currentTeam'] = step.team;
      updateData['draft.currentMode'] = step.type;
    }

    try {
      await firebaseService.db.collection('pvp_rooms').doc(room.id).update(updateData);
    } catch (e) {
      console.error('Sync error:', e);
    }
  }

  async nextGame() {
    this.stopTimer();
    return await pvpManager.nextGame();
  }

  async endMatch(winner) {
    this.stopTimer();
    if (this.unsubscribeDraft) this.unsubscribeDraft();
    return await pvpManager.endMatch(winner);
  }

  getState() { return this.draftManager?.getState(); }
  getCurrentStep() { return this.draftManager?.getCurrentStep(); }
  getCurrentTeam() { return this.draftManager?.getCurrentTeam(); }
  getCurrentMode() { return this.draftManager?.getCurrentMode(); }
  isHeroDrafted(heroId) { return this.draftManager?.isHeroDrafted(heroId) || false; }
  isGlobalBanned(heroId) { return this.draftManager?.isGlobalBanned(heroId) || false; }
  getPhaseText() { return this.draftManager?.getPhaseText() || ''; }
  getActionHint() { return this.draftManager?.getActionHint() || ''; }
  getTeamText() { return this.draftManager?.getTeamText() || ''; }

  getAvailableHeroes() {
    if (!this.draftManager) return [];
    return this.draftManager.heroes.filter(hero => {
      return !this.isHeroDrafted(hero.id) && !this.isGlobalBanned(hero.id);
    });
  }

  getStepInfo(stepIndex) {
    const DRAFT_SEQUENCE = [
      { type: 'ban', team: 'blue', count: 1 },
      { type: 'ban', team: 'red', count: 1 },
      { type: 'ban', team: 'blue', count: 1 },
      { type: 'ban', team: 'red', count: 1 },
      { type: 'pick', team: 'blue', count: 1 },
      { type: 'pick', team: 'red', count: 2 },
      { type: 'pick', team: 'blue', count: 2 },
      { type: 'pick', team: 'red', count: 1 },
      { type: 'ban', team: 'red', count: 1 },
      { type: 'ban', team: 'blue', count: 1 },
      { type: 'ban', team: 'red', count: 1 },
      { type: 'ban', team: 'blue', count: 1 },
      { type: 'pick', team: 'red', count: 1 },
      { type: 'pick', team: 'blue', count: 2 },
      { type: 'pick', team: 'red', count: 2 },
      { type: 'pick', team: 'blue', count: 1 }
    ];
    return stepIndex < DRAFT_SEQUENCE.length ? DRAFT_SEQUENCE[stepIndex] : null;
  }

  isMatchComplete() { return this.draftManager?.isMatchComplete() || false; }
  getDraftData() { return this.draftManager?.getDraftData() || null; }

  cleanup() {
    this.stopTimer();
    if (this.unsubscribeDraft) {
      this.unsubscribeDraft();
      this.unsubscribeDraft = null;
    }
    this.draftManager = null;
  }
}
