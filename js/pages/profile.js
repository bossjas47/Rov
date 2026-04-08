import { firebaseService } from '../services/FirebaseService.js';
import { authManager } from '../services/AuthManager.js';
import { ToastManager } from '../components/Toast.js';
import { heroes } from '../data/heroes.js';

class ProfileApp {
    constructor() {
        this.toast = new ToastManager();
        this.userData = null;
        this.recentDrafts = [];
        
        this.init();
    }

    init() {
        // Setup auth state listener
        firebaseService.onAuthStateChanged((user, userData) => {
            this.userData = userData;
            if (user) {
                this.showProfile();
                this.loadRecentDrafts();
            } else {
                this.showLoginRequired();
            }
        });

        // Setup form listener
        const editForm = document.getElementById('editProfileForm');
        if (editForm) {
            editForm.addEventListener('submit', (e) => this.handleEditSubmit(e));
        }

        // Make available globally
        window.profileApp = this;
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
        const profileContent = document.getElementById('profileContent');
        const editBtn = document.getElementById('editProfileBtn');
        
        if (loginRequired) loginRequired.classList.remove('hidden');
        if (profileContent) profileContent.classList.add('hidden');
        if (editBtn) editBtn.classList.add('hidden');
    }

    showProfile() {
        const loginRequired = document.getElementById('loginRequired');
        const profileContent = document.getElementById('profileContent');
        const editBtn = document.getElementById('editProfileBtn');
        
        if (loginRequired) loginRequired.classList.add('hidden');
        if (profileContent) profileContent.classList.remove('hidden');
        if (editBtn) editBtn.classList.remove('hidden');
        
        this.updateProfileUI();
    }

    updateProfileUI() {
        if (!this.userData) return;

        // Profile header
        const profileName = document.getElementById('profileName');
        const profileTeam = document.getElementById('profileTeam');
        const profileBio = document.getElementById('profileBio');
        const profileEmail = document.getElementById('profileEmail');
        const profileUsername = document.getElementById('profileUsername');
        const profileJoined = document.getElementById('profileJoined');
        const profileAvatar = document.getElementById('profileAvatar');
        const profileAvatarPlaceholder = document.getElementById('profileAvatarPlaceholder');
        const privacyBadge = document.getElementById('privacyBadge');
        const privacyToggle = document.getElementById('privacyToggle');

        // Basic info
        if (profileName) profileName.textContent = this.userData.displayName || this.userData.username || 'User';
        if (profileTeam) profileTeam.textContent = this.userData.teamName || 'ไม่มีทีม';
        if (profileBio) profileBio.textContent = this.userData.bio || 'ยังไม่มีคำอธิบาย';
        if (profileEmail) profileEmail.textContent = this.userData.email || '-';
        if (profileUsername) profileUsername.textContent = this.userData.username || '-';
        
        // Joined date
        if (profileJoined && this.userData.createdAt) {
            const date = this.userData.createdAt.toDate ? this.userData.createdAt.toDate() : new Date(this.userData.createdAt);
            profileJoined.textContent = date.toLocaleDateString('th-TH', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }

        // Avatar
        if (this.userData.photoURL) {
            if (profileAvatar) {
                profileAvatar.src = this.userData.photoURL;
                profileAvatar.classList.remove('hidden');
            }
            if (profileAvatarPlaceholder) profileAvatarPlaceholder.classList.add('hidden');
        } else {
            if (profileAvatarPlaceholder) {
                profileAvatarPlaceholder.textContent = (this.userData.displayName || this.userData.username || 'U').charAt(0).toUpperCase();
                profileAvatarPlaceholder.classList.remove('hidden');
            }
            if (profileAvatar) profileAvatar.classList.add('hidden');
        }

        // Privacy
        const isPublic = this.userData.isPublic !== false;
        if (privacyToggle) privacyToggle.checked = isPublic;
        if (privacyBadge) {
            privacyBadge.innerHTML = isPublic 
                ? `<span class="flex items-center gap-1"><i data-lucide="globe" class="w-3 h-3"></i> สาธารณะ</span>`
                : `<span class="flex items-center gap-1"><i data-lucide="lock" class="w-3 h-3"></i> ส่วนตัว</span>`;
        }

        // Stats
        const stats = this.userData.stats || {};
        const statTotalDrafts = document.getElementById('statTotalDrafts');
        const statWinRate = document.getElementById('statWinRate');
        const statWins = document.getElementById('statWins');

        if (statTotalDrafts) statTotalDrafts.textContent = stats.totalDrafts || 0;
        if (statWinRate) {
            const total = (stats.wins || 0) + (stats.losses || 0);
            const winRate = total > 0 ? Math.round((stats.wins / total) * 100) : 0;
            statWinRate.textContent = winRate + '%';
        }
        if (statWins) statWins.textContent = stats.wins || 0;

        if (window.lucide) lucide.createIcons();
    }

    async loadRecentDrafts() {
        const user = firebaseService.getCurrentUser();
        if (!user) return;

        const drafts = await firebaseService.getUserDrafts(user.uid, 5);
        this.recentDrafts = drafts;
        this.renderRecentDrafts();
    }

    renderRecentDrafts() {
        const container = document.getElementById('recentDrafts');
        if (!container) return;

        if (this.recentDrafts.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-8">ไม่มีข้อมูลการดราฟ</p>';
            return;
        }

        container.innerHTML = this.recentDrafts.map(draft => {
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
                month: 'short', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            return `
                <div class="draft-history-item flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                            BO${draft.bo}
                        </div>
                        <div>
                            <p class="font-semibold text-gray-800">${draft.matchName || 'ไม่มีชื่อ'}</p>
                            <p class="text-sm text-gray-500">${draft.myTeam || 'ทีมของฉัน'} vs ${draft.opponentTeam || 'คู่แข่ง'}</p>
                            <p class="text-xs text-gray-400">${dateStr}</p>
                        </div>
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${resultClass}">
                        ${resultText}
                    </span>
                </div>
            `;
        }).join('');
    }

    editProfile() {
        if (!this.userData) return;

        const modal = document.getElementById('editProfileModal');
        const displayNameInput = document.getElementById('editDisplayName');
        const teamNameInput = document.getElementById('editTeamName');
        const bioInput = document.getElementById('editBio');

        if (displayNameInput) displayNameInput.value = this.userData.displayName || '';
        if (teamNameInput) teamNameInput.value = this.userData.teamName || '';
        if (bioInput) bioInput.value = this.userData.bio || '';

        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    closeEditModal() {
        const modal = document.getElementById('editProfileModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    async handleEditSubmit(e) {
        e.preventDefault();

        const user = firebaseService.getCurrentUser();
        if (!user) return;

        const displayName = document.getElementById('editDisplayName').value;
        const teamName = document.getElementById('editTeamName').value;
        const bio = document.getElementById('editBio').value;

        const result = await firebaseService.updateUserProfile(user.uid, {
            displayName,
            teamName,
            bio
        });

        if (result.success) {
            this.toast.show('อัปเดตโปรไฟล์สำเร็จ!', 'success');
            this.closeEditModal();
            
            // Update user data
            this.userData = await firebaseService.getUserData(user.uid);
            this.updateProfileUI();
        } else {
            this.toast.show(result.error || 'เกิดข้อผิดพลาด', 'error');
        }
    }

    async togglePrivacy() {
        const user = firebaseService.getCurrentUser();
        if (!user) return;

        const toggle = document.getElementById('privacyToggle');
        const isPublic = toggle.checked;

        const result = await firebaseService.updatePrivacy(user.uid, isPublic);

        if (result.success) {
            this.toast.show(isPublic ? 'ตั้งค่าโปรไฟล์เป็นสาธารณะแล้ว' : 'ตั้งค่าโปรไฟล์เป็นส่วนตัวแล้ว', 'success');
            
            // Update user data
            this.userData = await firebaseService.getUserData(user.uid);
            this.updateProfileUI();
        } else {
            this.toast.show(result.error || 'เกิดข้อผิดพลาด', 'error');
            toggle.checked = !isPublic;
        }
    }
}

// Initialize
const profileApp = new ProfileApp();
window.profileApp = profileApp;
window.app = profileApp;
