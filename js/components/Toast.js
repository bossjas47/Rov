import { Security } from '../utils/Security.js';

export class ToastManager {
    constructor() {
        this.container = document.getElementById('toast-container');
        this.toasts = [];
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        const id = Date.now();
        
        const colors = {
            ban: 'from-gray-600 to-gray-700',
            pick: 'from-blue-500 to-indigo-600',
            pickRed: 'from-red-500 to-rose-600',
            info: 'from-blue-400 to-blue-500'
        };

        const icons = {
            ban: 'ban',
            pick: 'check-circle',
            pickRed: 'check-circle',
            info: 'info'
        };

        toast.className = `toast relative overflow-hidden rounded-xl shadow-2xl border border-white/30 backdrop-blur-md bg-gradient-to-r ${colors[type]} text-white p-4 min-w-[280px]`;
        toast.innerHTML = `
            <div class="relative z-10 flex items-start gap-3">
                <div class="p-1.5 rounded-lg bg-white/20 flex-shrink-0">
                    <i data-lucide="${icons[type]}" class="w-5 h-5"></i>
                </div>
                <div class="flex-1 pt-0.5">
                    <p class="text-sm font-bold leading-snug">${Security.escapeHtml(message)}</p>
                </div>
                <button onclick="this.closest('.toast').remove()" class="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
            <div class="toast-progress absolute bottom-0 left-0 h-1 bg-white/30"></div>
        `;

        this.container.appendChild(toast);
        
        if (window.lucide) {
            lucide.createIcons({ nodes: [toast] });
        }

        // Auto remove
        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => {
                if (toast.parentNode) toast.remove();
            }, 300);
        }, duration);
    }

    success(message) {
        this.show(message, 'info');
    }

    ban(heroName, team) {
        this.show(`${team === 'blue' ? 'ทีมน้ำเงิน' : 'ทีมแดง'} แบน ${heroName}`, 'ban');
    }

    pick(heroName, team) {
        this.show(`${team === 'blue' ? 'ทีมน้ำเงิน' : 'ทีมแดง'} เลือก ${heroName}`, team === 'blue' ? 'pick' : 'pickRed');
    }
}
