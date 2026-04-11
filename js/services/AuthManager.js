import { firebaseService } from './FirebaseService.js';
import { ToastManager } from '../components/Toast.js';

export class AuthManager {
    constructor() {
        this.toast = new ToastManager();
        this.onAuthChange = null;
        this.init();
    }
    init() {
        firebaseService.onAuthStateChanged((user, userData) => {
            this.updateUI(user, userData);
            if (this.onAuthChange) this.onAuthChange(user, userData);
        });
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        if (loginForm) loginForm.addEventListener('submit', async (e) => { e.preventDefault(); await this.login(document.getElementById('loginEmail').value, document.getElementById('loginPassword').value); });
        if (registerForm) registerForm.addEventListener('submit', async (e) => { e.preventDefault(); await this.register(document.getElementById('registerEmail').value, document.getElementById('registerPassword').value, document.getElementById('registerUsername').value); });
    }
    updateUI(user, userData) {
        const loginBanner = document.getElementById('loginBanner');
        const sidebarUserInfo = document.getElementById('sidebarUserInfo');
        
        // ใช้ requestAnimationFrame เพื่อให้ UI อัปเดตในเฟรมถัดไป ไม่ขัดจังหวะ Main Thread
        requestAnimationFrame(() => {
            if (user) {
                if (loginBanner) loginBanner.style.display = 'none';
                if (sidebarUserInfo) {
                    const name = userData?.username || user.displayName || 'User';
                    const photo = userData?.photoURL || user.photoURL;
                    
                    // ตรวจสอบก่อนว่าเนื้อหาเปลี่ยนจริงหรือไม่ เพื่อลดการเขียน DOM
                    const newHTML = `<div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden">${photo ? `<img src="${photo}" class="w-full h-full object-cover">` : `<span class="text-white font-bold text-sm">${name.charAt(0).toUpperCase()}</span>`}</div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-800 truncate">${name}</p><p class="text-xs text-green-600 flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-green-500"></span>ออนไลน์</p></div><button onclick="authManager.logout()" class="p-2 rounded-lg hover:bg-gray-200" title="ออกจากระบบ"><i data-lucide="log-out" class="w-4 h-4 text-gray-600"></i></button>`;
                    
                    if (sidebarUserInfo.innerHTML !== newHTML) {
                        sidebarUserInfo.innerHTML = newHTML;
                        if (window.lucide) lucide.createIcons();
                    }
                }
            } else {
                if (loginBanner) loginBanner.style.display = 'block';
                if (sidebarUserInfo) {
                    const guestHTML = `<div class="w-10 h-10 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center"><i data-lucide="user" class="w-5 h-5 text-white"></i></div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-800 truncate">ผู้เยี่ยมชม</p><p class="text-xs text-gray-500">กรุณาเข้าสู่ระบบ</p></div>`;
                    if (sidebarUserInfo.innerHTML !== guestHTML) {
                        sidebarUserInfo.innerHTML = guestHTML;
                        if (window.lucide) lucide.createIcons();
                    }
                }
            }
        });
    }
    showLoginModal() { document.getElementById('loginModal')?.classList.remove('hidden'); document.getElementById('registerModal')?.classList.add('hidden'); }
    closeLoginModal() { document.getElementById('loginModal')?.classList.add('hidden'); }
    showRegisterModal() { document.getElementById('registerModal')?.classList.remove('hidden'); document.getElementById('loginModal')?.classList.add('hidden'); }
    closeRegisterModal() { document.getElementById('registerModal')?.classList.add('hidden'); }
    async login(email, password) { const r = await firebaseService.login(email, password); if (r.success) { this.toast.show('เข้าสู่ระบบสำเร็จ!', 'success'); this.closeLoginModal(); } else this.toast.show(r.error, 'error'); return r; }
    async register(email, password, username) { const r = await firebaseService.register(email, password, username); if (r.success) { this.toast.show('สมัครสมาชิกสำเร็จ!', 'success'); this.closeRegisterModal(); } else this.toast.show(r.error, 'error'); return r; }
    async signInWithGoogle() { const r = await firebaseService.signInWithGoogle(); if (r.success) { this.toast.show('เข้าสู่ระบบด้วย Google สำเร็จ!', 'success'); this.closeLoginModal(); } else this.toast.show(r.error, 'error'); return r; }
    async logout() { const r = await firebaseService.logout(); if (r.success) this.toast.show('ออกจากระบบสำเร็จ', 'info'); else this.toast.show(r.error, 'error'); return r; }
    isLoggedIn() { return firebaseService.isLoggedIn(); }
    getCurrentUser() { return firebaseService.getCurrentUser(); }
    requireLogin(msg = 'กรุณาเข้าสู่ระบบก่อน') { if (!this.isLoggedIn()) { this.toast.show(msg, 'warning'); this.showLoginModal(); return false; } return true; }
}
export const authManager = new AuthManager();
window.authManager = authManager;
