import { DraftManager } from './utils/DraftManager.js';
import { HeroGrid } from './components/HeroGrid.js';
import { TeamPanel } from './components/TeamPanel.js';
import { ToastManager } from './components/Toast.js';
import { roleLabels, heroes } from './data/heroes.js';
import { saveDraftToFirebase } from './services/firebase-service.js';

class DraftApp {
    constructor() {
        this.toast = new ToastManager();
        this.draftManager = new DraftManager(() => this.update(), heroes, this.toast);
        this.heroGrid = new HeroGrid('hero-grid', this.draftManager);
        this.bluePanel = new TeamPanel('blue', 'blue-team-panel');
        this.redPanel = new TeamPanel('red', 'red-team-panel');
        
        this.init();
    }

    init() {
        this.renderRoleFilters();
        this.setupEventListeners();
        this.startTimer();
        this.heroGrid.render();
        this.update();
        window.app = this;
    }

    renderRoleFilters() {
        const container = document.getElementById('role-filters');
        const roles = ['all', 'fighter', 'tank', 'mage', 'assassin', 'marksman', 'support'];
        
        container.innerHTML = roles.map(role => `
            <button onclick="app.setRole('${role}')" 
                class="role-btn px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${role === 'all' ? 'active' : 'bg-white/40 text-gray-600 hover:bg-white/60'}"
                data-role="${role}">
                ${roleLabels[role]}
            </button>
        `).join('');
    }

    setupEventListeners() {
        let searchTimer;
        document.getElementById('searchHero').addEventListener('input', (e) => {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                this.heroGrid.setSearch(e.target.value);
            }, 150);
        });

        document.getElementById('btn-ban').addEventListener('click', () => this.setMode('ban'));
        document.getElementById('btn-pick').addEventListener('click', () => this.setMode('pick'));
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            if (confirm('ต้องการรีเซ็ตการดราฟท์ทั้งหมด?')) {
                this.draftManager.reset();
                this.heroGrid.render();
                this.toast.show('รีเซ็ตการดราฟท์เรียบร้อย', 'info');
            }
        });

        // Add Save to Firebase button listener
        const headerActions = document.querySelector('header .flex.items-center.gap-3');
        if (headerActions) {
            const saveBtn = document.createElement('button');
            saveBtn.id = 'saveFirebaseBtn';
            saveBtn.className = 'group px-4 py-2.5 rounded-xl liquid-glass hover:bg-white/60 transition-all flex items-center gap-2 text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 ml-2';
            saveBtn.innerHTML = '<i data-lucide="cloud-upload" class="w-4 h-4"></i><span class="hidden sm:inline">บันทึก</span>';
            headerActions.prepend(saveBtn);
            
            saveBtn.addEventListener('click', () => {
                this.draftManager.saveDraft(saveDraftToFirebase);
            });
        }
    }

    setRole(role) {
        this.heroGrid.setRole(role);
        document.querySelectorAll('.role-btn').forEach(btn => {
            const isActive = btn.dataset.role === role;
            btn.className = `role-btn px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${isActive ? 'active' : 'bg-white/40 text-gray-600 hover:bg-white/60'}`;
        });
    }

    setMode(mode) {
        this.draftManager.setMode(mode);
        this.update();
    }

    removeHero(team, type, index) {
        this.draftManager.removeHero(team, type, index);
        this.heroGrid.render();
    }

    update() {
        const state = this.draftManager.getState();
        
        this.bluePanel.update(state);
        this.redPanel.update(state);
        
        // Update counters
        document.getElementById('blue-ban-count').textContent = state.blue.bans.length;
        document.getElementById('blue-pick-count').textContent = state.blue.picks.length;
        document.getElementById('red-ban-count').textContent = state.red.bans.length;
        document.getElementById('red-pick-count').textContent = state.red.picks.length;
        
        const isBlue = state.currentTeam === 'blue';
        const isBan = state.currentMode === 'ban';
        
        document.getElementById('teamText').textContent = isBlue ? 'Blue Turn' : 'Red Turn';
        document.getElementById('currentTeamIndicator').className = `flex items-center gap-3 font-bold text-lg ${isBlue ? 'text-blue-600' : 'text-red-600'}`;
        document.getElementById('phase-text').textContent = isBan ? 'Ban Phase' : 'Pick Phase';
        document.getElementById('actionHint').textContent = isBan ? 'เลือกตัวละครเพื่อแบน' : 'เลือกตัวละครที่ต้องการ';
        
        // Team panel animations
        const bluePanel = document.getElementById('blue-team-panel');
        const redPanel = document.getElementById('red-team-panel');
        
        bluePanel.classList.toggle('team-active', isBlue);
        bluePanel.classList.remove('team-active-red');
        redPanel.classList.toggle('team-active-red', !isBlue);
        
        // Button states
        const btnBan = document.getElementById('btn-ban');
        const btnPick = document.getElementById('btn-pick');
        
        if (isBan) {
            btnBan.classList.add('ring-4', 'ring-red-500/30', 'scale-105');
            btnPick.classList.remove('ring-4', 'ring-blue-500/30', 'scale-105');
        } else {
            btnBan.classList.remove('ring-4', 'ring-red-500/30', 'scale-105');
            btnPick.classList.add('ring-4', 'ring-blue-500/30', 'scale-105');
        }
        
        if (window.lucide) lucide.createIcons();
    }

    startTimer() {
        let timeLeft = 60;
        const timerEl = document.getElementById('timer');
        const timer = setInterval(() => {
            timeLeft--;
            if (timeLeft < 0) {
                timeLeft = 60;
                // Auto switch hint
                this.toast.show('หมดเวลา! สลับเทิร์น', 'info', 2000);
            }
            timerEl.textContent = timeLeft;
            
            // Warning color
            if (timeLeft <= 5) {
                timerEl.parentElement.classList.add('animate-pulse', 'bg-red-500');
                timerEl.parentElement.classList.remove('from-blue-500', 'to-indigo-600');
            } else {
                timerEl.parentElement.classList.remove('animate-pulse', 'bg-red-500');
                timerEl.parentElement.classList.add('from-blue-500', 'to-indigo-600');
            }
        }, 1000);
    }
}

new DraftApp();
