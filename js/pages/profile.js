// Profile Page JavaScript

class ProfileApp {
    constructor() {
        this.toast = new ToastManager();
        this.userData = null;
        this.recentDrafts = [];
        this.init();
    }
    
    init() {
        firebaseService.onAuthStateChanged((user, userData) => {
            this.userData = userData;
            if (user) { this.showProfile(); this.loadRecentDrafts(); }
            else this.showLoginRequired();
        });
        window.profileApp = this;
        window.app = this;
    }
    
    toggleSidebar() {
        window.toggleSidebar();
    }
    
    showLoginRequired() { 
        document.getElementById('loginRequired')?.classList.remove('hidden'); 
        document.getElementById('profileContent')?.classList.add('hidden'); 
        document.getElementById('editProfileBtn')?.classList.add('hidden'); 
    }
    
    showProfile() { 
        document.getElementById('loginRequired')?.classList.add('hidden'); 
        document.getElementById('profileContent')?.classList.remove('hidden'); 
        document.getElementById('editProfileBtn')?.classList.remove('hidden'); 
        this.updateProfileUI(); 
    }
    
    updateProfileUI() {
        if (!this.userData) return;
        const name = this.userData.displayName || this.userData.username || 'User';
        document.getElementById('profileName').textContent = name;
        document.getElementById('profileTeam').textContent = this.userData.teamName || 'ไม่มีทีม';
        document.getElementById('profileBio').textContent = this.userData.bio || 'ยังไม่มีคำอธิบาย';
        document.getElementById('profileEmail').textContent = this.userData.email || '-';
        document.getElementById('profileUsername').textContent = this.userData.username || '-';
        if (this.userData.createdAt) { 
            const d = this.userData.createdAt.toDate ? this.userData.createdAt.toDate() : new Date(this.userData.createdAt); 
            document.getElementById('profileJoined').textContent = d.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }); 
        }
        const avatar = document.getElementById('profileAvatar');
        const placeholder = document.getElementById('profileAvatarPlaceholder');
        if (this.userData.photoURL) { 
            avatar.src = this.userData.photoURL; 
            avatar.classList.remove('hidden'); 
            placeholder.classList.add('hidden'); 
        } else { 
            placeholder.textContent = name.charAt(0).toUpperCase(); 
            placeholder.classList.remove('hidden'); 
            avatar.classList.add('hidden'); 
        }
        const isPublic = this.userData.isPublic !== false;
        document.getElementById('privacyToggle').checked = isPublic;
        document.getElementById('privacyBadge').innerHTML = isPublic ? '<i data-lucide="globe" class="w-3 h-3 inline"></i> สาธารณะ' : '<i data-lucide="lock" class="w-3 h-3 inline"></i> ส่วนตัว';
        const stats = this.userData.stats || {};
        document.getElementById('statTotalDrafts').textContent = stats.totalDrafts || 0;
        const total = (stats.wins || 0) + (stats.losses || 0);
        document.getElementById('statWinRate').textContent = total > 0 ? Math.round((stats.wins / total) * 100) + '%' : '0%';
        document.getElementById('statWins').textContent = stats.wins || 0;
        if (window.lucide) lucide.createIcons();
    }
    
    async loadRecentDrafts() {
        const user = firebaseService.getCurrentUser();
        if (!user) return;
        this.recentDrafts = await firebaseService.getUserDrafts(user.uid, 5);
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
            const resultClass = { win: 'badge-win', lose: 'badge-lose', draw: 'badge-draw', practice: 'badge-practice' }[draft.result] || 'badge-practice';
            const resultText = { win: 'ชนะ', lose: 'แพ้', draw: 'เสมอ', practice: 'ฝึกซ้อม' }[draft.result] || 'ฝึกซ้อม';
            const date = draft.createdAt?.toDate ? draft.createdAt.toDate() : new Date(draft.createdAt);
            return `<div class="draft-history-item flex items-center justify-between"><div class="flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">BO${draft.bo}</div><div><p class="font-semibold text-gray-800">${draft.matchName || 'ไม่มีชื่อ'}</p><p class="text-sm text-gray-500">${draft.myTeam || 'ทีมของฉัน'} vs ${draft.opponentTeam || 'คู่แข่ง'}</p><p class="text-xs text-gray-400">${date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p></div></div><span class="px-3 py-1 rounded-full text-xs font-semibold ${resultClass}">${resultText}</span></div>`;
        }).join('');
    }
    
    editProfile() {
        if (!this.userData) return;
        document.getElementById('editDisplayName').value = this.userData.displayName || '';
        document.getElementById('editTeamName').value = this.userData.teamName || '';
        document.getElementById('editBio').value = this.userData.bio || '';
        document.getElementById('editProfileModal')?.classList.remove('hidden');
    }
    
    closeEditModal() { document.getElementById('editProfileModal')?.classList.add('hidden'); }
    
    async handleEditSubmit(e) {
        e.preventDefault();
        const user = firebaseService.getCurrentUser();
        if (!user) return;
        const result = await firebaseService.updateUserProfile(user.uid, { 
            displayName: document.getElementById('editDisplayName').value, 
            teamName: document.getElementById('editTeamName').value, 
            bio: document.getElementById('editBio').value 
        });
        if (result.success) { 
            this.toast.show('อัปเดตโปรไฟล์สำเร็จ!', 'success'); 
            this.closeEditModal(); 
            this.userData = await firebaseService.getUserData(user.uid); 
            this.updateProfileUI(); 
        } else this.toast.show(result.error || 'เกิดข้อผิดพลาด', 'error');
    }
    
    async togglePrivacy() {
        const user = firebaseService.getCurrentUser();
        if (!user) return;
        const isPublic = document.getElementById('privacyToggle').checked;
        const result = await firebaseService.updatePrivacy(user.uid, isPublic);
        if (result.success) { 
            this.toast.show(isPublic ? 'ตั้งค่าโปรไฟล์เป็นสาธารณะแล้ว' : 'ตั้งค่าโปรไฟล์เป็นส่วนตัวแล้ว', 'success'); 
            this.userData = await firebaseService.getUserData(user.uid); 
            this.updateProfileUI(); 
        } else { 
            this.toast.show(result.error || 'เกิดข้อผิดพลาด', 'error'); 
            document.getElementById('privacyToggle').checked = !isPublic; 
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.profileApp = new ProfileApp();
    window.app = window.profileApp;
});
