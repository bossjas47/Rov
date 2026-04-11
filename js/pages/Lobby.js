import { pvpManager } from '../services/PVPManager.js';
import { firebaseService } from '../services/FirebaseService.js';
import { ToastManager } from '../components/Toast.js';

let toast;

async function init() {
  toast = new ToastManager();
  
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('room');

  if (roomId) {
    const result = await pvpManager.joinRoom(roomId);
    if (result.success) {
      setupRoomListener(roomId);
    } else {
      toast.show(result.error, 'error');
    }
  }

  setupEventListeners();
}

function setupEventListeners() {
  const createBtn = document.getElementById('create-room-btn');
  if (createBtn) {
    createBtn.addEventListener('click', async () => {
      const bo = parseInt(document.getElementById('bo-select')?.value || '3');
      const result = await pvpManager.createRoom(bo);
      if (result.success) {
        window.location.href = `lobby.html?room=${result.roomId}`;
      } else {
        toast.show(result.error, 'error');
      }
    });
  }

  const startBtn = document.getElementById('start-draft-btn');
  if (startBtn) {
    startBtn.addEventListener('click', async () => {
      const result = await pvpManager.startDraft();
      if (result.success) {
        // จะถูก redirect โดย listener
      } else {
        toast.show(result.error, 'error');
      }
    });
  }
}

function setupRoomListener(roomId) {
  pvpManager.listenToRoom(roomId, (room) => {
    if (room.status === 'drafting') {
      window.location.href = `pvp-draft.html?room=${roomId}`;
    }
    updateLobbyUI(room);
  });
}

function updateLobbyUI(room) {
  const hostName = document.getElementById('host-name');
  if (hostName) hostName.textContent = room.hostName;
  
  const guestName = document.getElementById('guest-name');
  if (guestName) guestName.textContent = room.guestName || 'รอกผู้เล่น...';
  
  const startBtn = document.getElementById('start-draft-btn');
  if (startBtn) {
    startBtn.disabled = !room.guestId || !room.hostReady || !room.guestReady;
  }
}

init();
