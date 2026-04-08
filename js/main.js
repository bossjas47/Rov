import { DraftManager } from './utils/DraftManager.js';
import { HeroGrid } from './components/HeroGrid.js';
import { TeamPanel } from './components/TeamPanel.js';
import { ToastManager } from './components/Toast.js';
import { roleLabels, heroes } from './data/heroes.js';
import { firebaseService } from './services/FirebaseService.js';
import { authManager } from './services/AuthManager.js';

class DraftApp {
    constructor() {
        this.toast = new ToastManager();
        this.draftManager = new DraftManager(() => this.update(), this.toast);
        this.heroGrid = new HeroGrid('hero-grid', this.draftManager);
        this.bluePanel = new TeamPanel('blue', 'blue-team-panel');
        this.redPanel = new TeamPanel('red', 'red-team-panel');
        this.timerInterval = null;
        this.timeLeft = 60;
        this.boSelected = false;
        
        this.init();
    }

    init() {
        this.renderRoleFilters();
        this.setupEventListeners();
        this.update();
        
        // Show BO selection modal on start
        setTimeout(() => this.showBOModal(), 500);
        
        // Make available globally
        window.draftApp = this;
        window.app = this;
    }

    renderRoleFilters() {
        const container = document.getElementById('role-filters');
        if (!container) return;
        
        const roles = ['all', 'fighter', 'tank', 'mage', 'assassin', 'marksman', 'support'];
        
        container.innerHTML = roles.map(role => `
            <button onclick="draftApp.setRole('${role}')" 
                class="role-btn px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${role === 'all' ? 'active' : 'bg-white/40 text-gray-600 hover:bg-white/60'}"
                data-role="${role}">
                ${roleLabels[role]}
            </button>
        `).join('');
    }

    setupEventListeners() {
        // Search
        let searchTimer;
        const searchInput = document.getElementById('searchHero');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimer);
                searchTimer = setTimeout(() => {
                    this.heroGrid.setSearch(e.target.value);
                }, 150);
            });
        }

        // Mode buttons
        const btnBan = document.getElementById('btn-ban');
        const btnPick = document.getElementById('btn-pick');
        
        if (btnBan) {
            btnBan.addEventListener('click', () => {
                this.toast.show('โหมดแบน - คลิกที่ตัวละครเพื่อแบน', 'info');
            });
        }
        
        if (btnPick) {
            btnPick.addEventListener('click', () => {
                this.toast.show('โหมดเลือก - คลิกที่ตัวละครเพื่อเลือก', 'info');
            });
        }
        
        // Reset button
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('ต้องการรีเซ็ตการดราฟทั้งหมด?')) {
                    this.draftManager.reset();
                    this.boSelected = false;
                    this.showBOModal();
                    this.toast.show('รีเซ็ตการดราฟท์เรียบร้อย', 'info');
                }
            });
        }

        // Save draft form
        const saveDraftForm = document.getElementById('saveDraftForm');
        if (saveDraftForm) {
            saveDraftForm.addEventListener('submit', (e) => this.handleSaveDraft(e));
        }
    }

    // Toggle sidebar
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
        if (overlay) {
            overlay.classList.toggle('hidden');
        }
    }

    // Set BO (Best of)
    setBO(bo) {
        this.draftManager.initMatch(bo);
        this.boSelected = true;
        this.closeBOModal();
        
        // Update UI
        const boDisplay = document.getElementById('boDisplay');
        const boText = document.getElementById('boText');
        const gameCounter = document.getElementById('gameCounter');
        const totalGames = document.getElementById('totalGames');
        
        if (boDisplay) boDisplay.classList.remove('hidden');
        if (boText) boText.textContent = `BO${bo}`;
        if (gameCounter) gameCounter.classList.remove('hidden');
        if (totalGames) totalGames.textContent = bo;
        
        this.updateGameCounter();
        this.startTimer();
        this.toast.show(`เริ่มดราฟแบบ BO${bo}`, 'success');
    }

    // Show BO modal
    showBOModal() {
        const modal = document.getElementById('boModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    // Close BO modal
    closeBOModal() {
        const modal = document.getElementById('boModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // Update game counter
    updateGameCounter() {
        const currentGameEl = document.getElementById('currentGame');
        if (currentGameEl) {
            currentGameEl.textContent = this.draftManager.currentGame;
        }
    }

    // Next game
    nextGame() {
        if (this.draftManager.nextGame()) {
            this.updateGameCounter();
            this.resetTimer();
            this.update();
            
            // Hide buttons
            const nextGameBtn = document.getElementById('nextGameBtn');
            const saveDraftBtn = document.getElementById('saveDraftBtn');
            if (nextGameBtn) nextGameBtn.classList.add('hidden');
            if (saveDraftBtn) saveDraftBtn.classList.add('hidden');
        }
    }

    // Select hero
    selectHero(heroId) {
        if (!this.boSelected) {
            this.toast.show('กรุณาเลือกรูปแบบการแข่งขันก่อน', 'warning');
            this.showBOModal();
            return;
        }

        const result = this.draftManager.selectHero(heroId);
        
        if (!result.success) {
            this.toast.show(result.error, 'error');
        }
        
        this.update();
    }

    // Remove hero
    removeHero(team, type, index) {
        this.draftManager.removeHero(team, type, index);
        this.update();
    }

    // Set role filter
    setRole(role) {
        this.heroGrid.setRole(role);
        document.querySelectorAll('.role-btn').forEach(btn => {
            const isActive = btn.dataset.role === role;
            btn.className = `role-btn px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${isActive ? 'active' : 'bg-white/40 text-gray-600 hover:bg-white/60'}`;
        });
    }

    // Update UI
    update() {
        const state = this.draftManager.getState();
        
        requestAnimationFrame(() => {
            this.bluePanel.update(state);
            this.redPanel.update(state);
            this.heroGrid.updateStatus();
            
            // Reset timer on turn change
            this.resetTimer();
            
            // Update phase text
            const phaseText = document.getElementById('phase-text');
            if (phaseText) phaseText.textContent = this.draftManager.getPhaseText();
            
            // Update team text
            const teamText = document.getElementById('teamText');
            if (teamText) teamText.textContent = this.draftManager.getTeamText();
            
            // Update action hint
            const actionHint = document.getElementById('actionHint');
            if (actionHint) actionHint.textContent = this.draftManager.getActionHint();
            
            // Update pick order hint
            const pickOrderHint = document.getElementById('pickOrderHint');
            if (pickOrderHint) pickOrderHint.textContent = this.draftManager.getActionHint();
            
            // Update team indicator
            const currentTeam = this.draftManager.getCurrentTeam();
            const currentTeamIndicator = document.getElementById('currentTeamIndicator');
            if (currentTeamIndicator && currentTeam) {
                const isBlue = currentTeam === 'blue';
                currentTeamIndicator.className = `flex items-center gap-3 font-bold text-lg ${isBlue ? 'text-blue-600' : 'text-red-600'}`;
            }
            
            // Update team panels active state
            const bluePanel = document.getElementById('blue-team-panel');
            const redPanel = document.getElementById('red-team-panel');
            
            if (bluePanel && redPanel && currentTeam) {
                const isBlue = currentTeam === 'blue';
                bluePanel.classList.toggle('team-active', isBlue);
                bluePanel.classList.remove('team-active-red');
                redPanel.classList.toggle('team-active-red', !isBlue);
            }
            
            // Update mode buttons
            const currentMode = this.draftManager.getCurrentMode();
            const btnBan = document.getElementById('btn-ban');
            const btnPick = document.getElementById('btn-pick');
            
            if (btnBan && btnPick && currentMode) {
                if (currentMode === 'ban') {
                    btnBan.classList.add('ring-4', 'ring-red-500/30', 'scale-105');
                    btnPick.classList.remove('ring-4', 'ring-blue-500/30', 'scale-105');
                } else {
                    btnBan.classList.remove('ring-4', 'ring-red-500/30', 'scale-105');
                    btnPick.classList.add('ring-4', 'ring-blue-500/30', 'scale-105');
                }
            }
            
            // Update sequence indicator
            this.updateSequenceIndicator();
            
            // Check if draft is complete
            if (state.isComplete) {
                this.onDraftComplete();
            }
            
            if (window.lucide) lucide.createIcons();
        });
    }

    // Update sequence indicator
    updateSequenceIndicator() {
        const container = document.getElementById('sequenceIndicator');
        if (!container) return;
        
        const sequence = this.draftManager.getSequence();
        
        container.innerHTML = sequence.map(item => {
            let className = 'sequence-item';
            if (item.isActive) className += ' active';
            if (item.isCompleted) className += ' completed';
            
            if (item.type === 'ban') {
                className += ' sequence-ban';
            } else {
                className += item.team === 'blue' ? ' sequence-pick-blue' : ' sequence-pick-red';
            }
            
            const icon = item.type === 'ban' ? '✕' : '✓';
            
            return `<div class="${className}" title="${item.type === 'ban' ? 'Ban' : 'Pick'} - ${item.team === 'blue' ? 'First' : 'Second'}">${icon}</div>`;
        }).join('');
    }

    // Called when draft is complete
    onDraftComplete() {
        const nextGameBtn = document.getElementById('nextGameBtn');
        const saveDraftBtn = document.getElementById('saveDraftBtn');
        
        // Check if there are more games
        if (this.draftManager.currentGame < this.draftManager.bo) {
            if (nextGameBtn) nextGameBtn.classList.remove('hidden');
        }
        
        // Always show save button
        if (saveDraftBtn) saveDraftBtn.classList.remove('hidden');
        
        this.toast.show(`ดราฟเกมที่ ${this.draftManager.currentGame} เสร็จสิ้น!`, 'success');
    }

    // Show save draft modal
    showSaveDraftModal() {
        // Check if logged in
        if (!authManager.isLoggedIn()) {
            this.toast.show('กรุณาเข้าสู่ระบบก่อนบันทึกการดราฟ', 'warning');
            authManager.showLoginModal();
            return;
        }

        const modal = document.getElementById('saveDraftModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    // Close save draft modal
    closeSaveDraftModal() {
        const modal = document.getElementById('saveDraftModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // Handle save draft
    async handleSaveDraft(e) {
        e.preventDefault();
        
        const matchName = document.getElementById('draftMatchName').value;
        const myTeam = document.getElementById('draftMyTeam').value;
        const opponentTeam = document.getElementById('draftOpponentTeam').value;
        const result = document.getElementById('draftResult').value;
        const notes = document.getElementById('draftNotes').value;
        
        const draftData = {
            ...this.draftManager.getDraftData(),
            matchName,
            myTeam,
            opponentTeam,
            result,
            notes
        };
        
        const saveResult = await firebaseService.saveDraft(draftData);
        
        if (saveResult.success) {
            this.toast.show('บันทึกการดราฟสำเร็จ!', 'success');
            this.closeSaveDraftModal();
            
            // Reset form
            e.target.reset();
        } else {
            this.toast.show(saveResult.error || 'เกิดข้อผิดพลาด', 'error');
        }
    }

    // Timer functions
    resetTimer() {
        this.timeLeft = 60;
        const timerEl = document.getElementById('timer');
        if (timerEl) timerEl.textContent = this.timeLeft;
        
        // Reset timer styling
        const timerContainer = timerEl?.parentElement;
        if (timerContainer) {
            timerContainer.classList.remove('animate-pulse', 'bg-red-500');
            timerContainer.classList.add('from-blue-500', 'to-indigo-600');
        }
    }

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        
        const timerEl = document.getElementById('timer');
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            
            if (this.timeLeft <= 0) {
                this.toast.show('หมดเวลา! กรุณาเลือกตัวละคร', 'warning');
                this.resetTimer();
                return;
            }
            
            if (timerEl) timerEl.textContent = this.timeLeft;
            
            // Warning styling when time is low
            const timerContainer = timerEl?.parentElement;
            if (this.timeLeft <= 10 && timerContainer) {
                timerContainer.classList.add('animate-pulse', 'bg-red-500');
                timerContainer.classList.remove('from-blue-500', 'to-indigo-600');
            }
        }, 1000);
    }
}

// Initialize app
const draftApp = new DraftApp();

// Export for global access
window.draftApp = draftApp;
