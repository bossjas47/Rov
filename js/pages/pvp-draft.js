import { pvpManager } from '../services/PVPManager.js';
import { PVPDraftManager } from '../utils/PVPDraftManager.js';
import { HeroGrid } from '../components/HeroGrid.js';
import { TeamPanel } from '../components/TeamPanel.js';
import { ToastManager } from '../components/Toast.js';

let pvpDraftManager;
let heroGrid;
let bluePanel;
let redPanel;
let toast;

const gameCompleteModal = document.getElementById('game-complete-modal');
const matchCompleteModal = document.getElementById('match-complete-modal');

async function init() {
  toast = new ToastManager();
  pvpDraftManager = new PVPDraftManager(toast);
  
  // สร้าง UI Components
  bluePanel = new TeamPanel('blue', 'blue-panel');
  redPanel = new TeamPanel('red', 'red-panel');
  heroGrid = new HeroGrid('heroes-container', pvpDraftManager.draftManager);

  // เชื่อมต่อกับ window เพื่อให้ component เรียกใช้ได้
  window.draftApp = {
    selectHero: async (heroId) => {
      const result = await pvpDraftManager.selectHero(heroId);
      if (!result.success) toast.show(result.error, 'error');
    },
    removeHero: (team, type, index) => {
      // ระบบ PVP ไม่อนุญาตให้ลบฮีโร่ที่เลือกไปแล้ว (ยกเว้นจะทำระบบขอแก้)
      toast.show('ไม่สามารถลบฮีโร่ในโหมด PVP ได้', 'warning');
    }
  };

  // ดึงข้อมูลห้องจาก URL
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('room');

  if (!roomId) {
    toast.show('ไม่พบรหัสห้อง', 'error');
    setTimeout(() => window.location.href = 'lobby.html', 2000);
    return;
  }

  // เริ่มต้นระบบดราฟ
  const result = await pvpDraftManager.init(updateUI, updateTimer);
  if (!result.success) {
    toast.show(result.error, 'error');
    return;
  }

  document.getElementById('room-id-display').textContent = roomId;
  
  // ฟังการเปลี่ยนแปลงของห้อง
  pvpManager.listenToRoom(roomId, (room) => {
    if (room.status === 'finished') {
      showMatchComplete();
    }
  });
}

function updateUI(state) {
  if (!state) return;

  bluePanel.update(state);
  redPanel.update(state);
  heroGrid.updateStatus();

  // อัปเดตข้อมูลเกมและเทิร์น
  document.getElementById('game-number').textContent = `${state.currentGame}/${state.bo}`;
  document.getElementById('turn-team').textContent = state.currentTeam === 'blue' ? 'Blue Team' : 'Red Team';
  document.getElementById('turn-team').className = state.currentTeam === 'blue' ? 'text-blue-400' : 'text-red-400';
  
  const step = pvpDraftManager.getCurrentStep();
  document.getElementById('turn-action').textContent = step ? (step.type === 'ban' ? `แบน ${step.count} ตัว` : `เลือก ${step.count} ตัว`) : 'ดราฟเสร็จสิ้น';

  // อัปเดต Phase Indicator
  const phase = pvpDraftManager.getPhaseText();
  document.querySelectorAll('.phase-indicator').forEach(el => {
    if (el.textContent === phase) {
      el.classList.add('phase-active', 'bg-blue-600', 'text-white');
      el.classList.remove('bg-gray-100');
    } else {
      el.classList.remove('phase-active', 'bg-blue-600', 'text-white');
      el.classList.add('bg-gray-100');
    }
  });

  // แสดง Modal เมื่อดราฟเสร็จ
  if (state.isComplete) {
    if (pvpDraftManager.isMatchComplete()) {
      showMatchComplete();
    } else {
      showGameComplete(state.currentGame);
    }
  }
}

function updateTimer(seconds) {
  const timerDisplay = document.getElementById('timer-display');
  if (timerDisplay) {
    timerDisplay.textContent = seconds;
    if (seconds <= 10) {
      timerDisplay.classList.add('timer-warning');
    } else {
      timerDisplay.classList.remove('timer-warning');
    }
  }
}

function showGameComplete(gameNumber) {
  document.getElementById('completed-game-number').textContent = gameNumber;
  gameCompleteModal.classList.remove('hidden');
}

function showMatchComplete() {
  matchCompleteModal.classList.remove('hidden');
}

// Event Listeners
document.getElementById('modal-next-game-btn').addEventListener('click', async () => {
  const result = await pvpDraftManager.nextGame();
  if (result.success) {
    gameCompleteModal.classList.add('hidden');
    toast.show('เริ่มเกมถัดไป!', 'success');
  } else {
    toast.show(result.error || 'เกิดข้อผิดพลาด', 'error');
  }
});

document.getElementById('modal-end-match-btn').addEventListener('click', async () => {
  const winner = prompt('ใครชนะแมตช์นี้? (blue/red)');
  if (winner && ['blue', 'red'].includes(winner)) {
    await pvpDraftManager.endMatch(winner);
    gameCompleteModal.classList.add('hidden');
  }
});

document.getElementById('rematch-btn').addEventListener('click', async () => {
  const result = await pvpManager.requestRematch();
  if (result.success) {
    window.location.href = `lobby.html?room=${result.newRoomId}`;
  } else {
    toast.show(result.error, 'error');
  }
});

document.getElementById('back-to-lobby-btn').addEventListener('click', () => {
  window.location.href = 'lobby.html';
});

// เริ่มต้นระบบ
init();

window.addEventListener('beforeunload', () => {
  pvpManager.stopListening();
  pvpDraftManager?.cleanup();
});
