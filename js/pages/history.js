import { firebaseService } from '../services/FirebaseService.js';
import { authManager } from '../services/AuthManager.js';
import { ToastManager } from '../components/Toast.js';
import { heroes, getHeroById } from '../data/heroes.js';

class HistoryApp {
    constructor() {
        this.toast = new ToastManager();
        this.allDrafts = [];
        this.filteredDrafts = [];
        this.currentLimit = 20;
        
        this.init();
    }

    init() {
        // Setup auth state listener
        firebaseService.onAuthStateChanged((user, userData) => {
            if (user) {
                this.showHistory();
                this.loadDrafts();
            } else {
                this.showLoginRequired();
            }
        });

        // Make available globally
        window.historyApp = this;
        window.app = this;
    }

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

    showLoginRequired() {
        const loginRequired = document.getElementById('loginRequired');
        const historyContent = document.getElementById('historyContent');
        
        if (loginRequired) loginRequired.classList.remove('hidden');
        if (historyContent) historyContent.classList.add('hidden');
    }

    showHistory() {
        const loginRequired = document.getElementById('loginRequired');
        const historyContent = document.getElementById('historyContent');
        
        if (loginRequired) loginRequired.classList.add('hidden');
        if (historyContent) historyContent.classList.remove('hidden');
    }

    async loadDrafts() {
        const user = firebaseService.getCurrentUser();
        if (!user) return;

        this.allDrafts = await firebaseService.getUserDrafts(user.uid, this.currentLimit);
        this.filteredDrafts = [...this.allDrafts];
        this.renderDrafts();
    }

    filterDrafts() {
        const resultFilter = document.getElementById('filterResult').value;
        const boFilter = document.getElementById('filterBO').value;

        this.filteredDrafts = this.allDrafts.filter(draft => {
            let match = true;
            
            if (resultFilter !== 'all' && draft.result !== resultFilter) {
                match = false;
            }
            
            if (boFilter !== 'all' && draft.bo !== parseInt(boFilter)) {
                match = false;
            }
            
            return match;
        });

        this.renderDrafts();
    }

    renderDrafts() {
        const container = document.getElementById('draftsList');
        if (!container) return;

        if (this.filteredDrafts.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <i data-lucide="inbox" class="w-10 h-10 text-gray-400"></i>
                    </div>
                    <p class="text-gray-500">ไม่พบข้อมูลการดราฟ</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredDrafts.map(draft => this.renderDraftCard(draft)).join('');

        // Update load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.classList.toggle('hidden', this.filteredDrafts.length < this.currentLimit);
        }

        if (window.lucide) lucide.createIcons();
    }

    renderDraftCard(draft) {
        const resultClass = {
            win: 'badge-win',
            lose: 'badge-lose',
            draw: 'badge-draw',
            practice: 'badge-practice'
        }[draft.result] || 'badge-practice';

        const resultText = {
            win: 'ชนะ',
            lose: 'แพ้',
            draw: 'เสมอ',
            practice: 'ฝึกซ้อม'
        }[draft.result] || 'ฝึกซ้อม';

        const date = draft.createdAt?.toDate ? draft.createdAt.toDate() : new Date(draft.createdAt);
        const dateStr = date.toLocaleDateString('th-TH', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Count heroes
        let totalPicks = 0;
        let totalBans = 0;
        if (draft.games) {
            draft.games.forEach(game => {
                totalPicks += (game.myPicks?.length || 0);
                totalBans += (game.myBans?.length || 0);
            });
        }

        return `
            <div class="draft-history-item cursor-pointer" onclick="historyApp.showDraftDetail('${draft.id}')">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <div class="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                            BO${draft.bo}
                        </div>
                        <div>
                            <p class="font-semibold text-gray-800 text-lg">${draft.matchName || 'ไม่มีชื่อ'}</p>
                            <p class="text-sm text-gray-500">${draft.myTeam || 'ทีมของฉัน'} vs ${draft.opponentTeam || 'คู่แข่ง'}</p>
                            <div class="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                <span class="flex items-center gap-1">
                                    <i data-lucide="calendar" class="w-3 h-3"></i>
                                    ${dateStr}
                                </span>
                                <span class="flex items-center gap-1">
                                    <i data-lucide="check-circle" class="w-3 h-3"></i>
                                    ${totalPicks} picks
                                </span>
                                <span class="flex items-center gap-1">
                                    <i data-lucide="ban" class="w-3 h-3"></i>
                                    ${totalBans} bans
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="px-4 py-2 rounded-full text-sm font-semibold ${resultClass}">
                            ${resultText}
                        </span>
                        <button onclick="event.stopPropagation(); historyApp.deleteDraft('${draft.id}')" 
                            class="p-2 rounded-lg hover:bg-red-100 text-red-500 transition-all" title="ลบ">
                            <i data-lucide="trash-2" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>
                ${draft.notes ? `
                    <div class="mt-3 pt-3 border-t border-gray-100">
                        <p class="text-sm text-gray-600">${draft.notes}</p>
                    </div>
                ` : ''}
            </div>
        `;
    }

    async showDraftDetail(draftId) {
        const draft = this.allDrafts.find(d => d.id === draftId);
        if (!draft) return;

        const modal = document.getElementById('draftDetailModal');
        const content = document.getElementById('draftDetailContent');
        if (!modal || !content) return;

        const resultClass = {
            win: 'badge-win',
            lose: 'badge-lose',
            draw: 'badge-draw',
            practice: 'badge-practice'
        }[draft.result] || 'badge-practice';

        const resultText = {
            win: 'ชนะ',
            lose: 'แพ้',
            draw: 'เสมอ',
            practice: 'ฝึกซ้อม'
        }[draft.result] || 'ฝึกซ้อม';

        content.innerHTML = `
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">${draft.matchName || 'ไม่มีชื่อ'}</h2>
                    <p class="text-gray-500">${draft.myTeam || 'ทีมของฉัน'} vs ${draft.opponentTeam || 'คู่แข่ง'}</p>
                </div>
                <div class="flex items-center gap-3">
                    <span class="px-4 py-2 rounded-full text-sm font-semibold ${resultClass}">
                        ${resultText}
                    </span>
                    <button onclick="historyApp.closeDetailModal()" class="p-2 rounded-lg hover:bg-gray-100 transition-all">
                        <i data-lucide="x" class="w-6 h-6 text-gray-500"></i>
                    </button>
                </div>
            </div>
            
            ${draft.games?.map((game, idx) => this.renderGameDetail(game, idx + 1)).join('') || '<p class="text-gray-500 text-center py-8">ไม่มีข้อมูลเกม</p>'}
            
            ${draft.notes ? `
                <div class="mt-6 p-4 bg-gray-50 rounded-xl">
                    <p class="text-sm font-medium text-gray-700 mb-2">หมายเหตุ</p>
                    <p class="text-gray-600">${draft.notes}</p>
                </div>
            ` : ''}
        `;

        modal.classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
    }

    renderGameDetail(game, gameNumber) {
        const renderHeroes = (heroIds) => {
            if (!heroIds || heroIds.length === 0) return '<p class="text-gray-400 text-sm">-</p>';
            
            return `<div class="flex flex-wrap gap-2">${heroIds.map(id => {
                const hero = getHeroById(id);
                if (!hero) return '';
                return `
                    <div class="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                        <img src="../rovhero/${hero.imageFile}" alt="${hero.name}" class="w-8 h-8 rounded object-cover">
                        <span class="text-sm text-gray-700">${hero.thaiName}</span>
                    </div>
                `;
            }).join('')}</div>`;
        };

        return `
            <div class="mb-6 pb-6 border-b border-gray-100 last:border-0">
                <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm">${gameNumber}</span>
                    เกมที่ ${gameNumber}
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p class="text-sm font-medium text-gray-700 mb-2">ตัวละครที่เลือก</p>
                        ${renderHeroes(game.myPicks)}
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-700 mb-2">ตัวละครที่แบน</p>
                        ${renderHeroes(game.myBans)}
                    </div>
                </div>
            </div>
        `;
    }

    closeDetailModal() {
        const modal = document.getElementById('draftDetailModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    async deleteDraft(draftId) {
        if (!confirm('ต้องการลบการดราฟนี้?')) return;

        const result = await firebaseService.deleteDraft(draftId);
        
        if (result.success) {
            this.toast.show('ลบการดราฟสำเร็จ', 'success');
            this.allDrafts = this.allDrafts.filter(d => d.id !== draftId);
            this.filterDrafts();
        } else {
            this.toast.show(result.error || 'เกิดข้อผิดพลาด', 'error');
        }
    }

    async loadMore() {
        this.currentLimit += 20;
        await this.loadDrafts();
    }
}

// Initialize
const historyApp = new HistoryApp();
window.historyApp = historyApp;
window.app = historyApp;
