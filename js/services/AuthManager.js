import { firebaseService } from './FirebaseService.js';
import { ToastManager } from '../components/Toast.js';

export class AuthManager {
    constructor() {
        this.toast = new ToastManager();
        this.onAuthChange = null;
        this.init();
    }

    init() {
        // Listen to auth state changes
        firebaseService.onAuthStateChanged((user, userData) => {
            this.updateUI(user, userData);
            if (this.onAuthChange) {
                this.onAuthChange(user, userData);
            }
        });

        // Setup form listeners
        this.setupFormListeners();
    }

    setupFormListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                await this.login(email, password);
            });
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const username = document.getElementById('registerUsername').value;
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                await this.register(email, password, username);
            });
        }
    }

    updateUI(user, userData) {
        const loginBanner = document.getElementById('loginBanner');
        const sidebarUserInfo = document.getElementById('sidebarUserInfo');

        if (user) {
            // User is logged in
            if (loginBanner) {
                loginBanner.style.display = 'none';
            }

            // Update sidebar user info
            if (sidebarUserInfo) {
                const displayName = userData?.username || user.displayName || 'User';
                const photoURL = userData?.photoURL || user.photoURL;
                
                sidebarUserInfo.innerHTML = `
                    <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden">
                        ${photoURL 
                            ? `<img src="${photoURL}" class="w-full h-full object-cover" alt="${displayName}">`
                            : `<span class="text-white font-bold text-sm">${displayName.charAt(0).toUpperCase()}</span>`
                        }
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-800 truncate">${displayName}</p>
                        <p class="text-xs text-green-600 flex items-center gap-1">
                            <span class="w-2 h-2 rounded-full bg-green-500"></span>
                            ออนไลน์
                        </p>
                    </div>
                    <button onclick="authManager.logout()" class="p-2 rounded-lg hover:bg-gray-200 transition-all" title="ออกจากระบบ">
                        <i data-lucide="log-out" class="w-4 h-4 text-gray-600"></i>
                    </button>
                `;
                
                if (window.lucide) lucide.createIcons();
            }
        } else {
            // User is not logged in
            if (loginBanner) {
                loginBanner.style.display = 'block';
            }

            // Update sidebar user info
            if (sidebarUserInfo) {
                sidebarUserInfo.innerHTML = `
                    <div class="w-10 h-10 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center">
                        <i data-lucide="user" class="w-5 h-5 text-white"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-800 truncate">ผู้เยี่ยมชม</p>
                        <p class="text-xs text-gray-500">กรุณาเข้าสู่ระบบ</p>
                    </div>
                `;
                
                if (window.lucide) lucide.createIcons();
            }
        }
    }

    // Show login modal
    showLoginModal() {
        const modal = document.getElementById('loginModal');
        const registerModal = document.getElementById('registerModal');
        
        if (registerModal) {
            registerModal.classList.add('hidden');
        }
        
        if (modal) {
            modal.classList.remove('hidden');
            modal.querySelector('.bg-white')?.classList.add('modal-enter');
        }
    }

    // Close login modal
    closeLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // Show register modal
    showRegisterModal() {
        const modal = document.getElementById('registerModal');
        const loginModal = document.getElementById('loginModal');
        
        if (loginModal) {
            loginModal.classList.add('hidden');
        }
        
        if (modal) {
            modal.classList.remove('hidden');
            modal.querySelector('.bg-white')?.classList.add('modal-enter');
        }
    }

    // Close register modal
    closeRegisterModal() {
        const modal = document.getElementById('registerModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // Login
    async login(email, password) {
        const result = await firebaseService.login(email, password);
        
        if (result.success) {
            this.toast.show('เข้าสู่ระบบสำเร็จ!', 'success');
            this.closeLoginModal();
        } else {
            this.toast.show(result.error, 'error');
        }
        
        return result;
    }

    // Register
    async register(email, password, username) {
        const result = await firebaseService.register(email, password, username);
        
        if (result.success) {
            this.toast.show('สมัครสมาชิกสำเร็จ!', 'success');
            this.closeRegisterModal();
        } else {
            this.toast.show(result.error, 'error');
        }
        
        return result;
    }

    // Sign in with Google
    async signInWithGoogle() {
        const result = await firebaseService.signInWithGoogle();
        
        if (result.success) {
            this.toast.show('เข้าสู่ระบบด้วย Google สำเร็จ!', 'success');
            this.closeLoginModal();
        } else {
            this.toast.show(result.error, 'error');
        }
        
        return result;
    }

    // Logout
    async logout() {
        const result = await firebaseService.logout();
        
        if (result.success) {
            this.toast.show('ออกจากระบบสำเร็จ', 'info');
        } else {
            this.toast.show(result.error, 'error');
        }
        
        return result;
    }

    // Check if logged in
    isLoggedIn() {
        return firebaseService.isLoggedIn();
    }

    // Get current user
    getCurrentUser() {
        return firebaseService.getCurrentUser();
    }

    // Require login
    requireLogin(message = 'กรุณาเข้าสู่ระบบก่อนใช้งานฟีเจอร์นี้') {
        if (!this.isLoggedIn()) {
            this.toast.show(message, 'warning');
            this.showLoginModal();
            return false;
        }
        return true;
    }
}

// Export singleton instance
export const authManager = new AuthManager();

// Make available globally for onclick handlers
window.authManager = authManager;
