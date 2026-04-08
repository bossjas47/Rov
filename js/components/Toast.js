export class ToastManager {
    constructor() {
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.className = 'fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none';
            document.body.appendChild(this.container);
        }
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast pointer-events-auto min-w-[280px] max-w-[400px] p-4 rounded-xl shadow-xl flex items-start gap-3 ${this.getTypeStyles(type)}`;
        
        const icon = this.getIcon(type);
        
        toast.innerHTML = `
            <div class="flex-shrink-0 mt-0.5">${icon}</div>
            <div class="flex-1">
                <p class="text-sm font-medium">${message}</p>
            </div>
            <button class="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity" onclick="this.parentElement.remove()">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
            <div class="toast-progress absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-xl"></div>
        `;

        this.container.appendChild(toast);

        // Auto remove
        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    ban(heroName, team) {
        const teamColor = team === 'blue' ? 'text-blue-600' : 'text-red-600';
        const teamLabel = team === 'blue' ? 'Blue' : 'Red';
        this.show(`<span class="${teamColor} font-bold">${teamLabel}</span> แบน <span class="font-bold">${heroName}</span>`, 'ban');
    }

    pick(heroName, team) {
        const teamColor = team === 'blue' ? 'text-blue-600' : 'text-red-600';
        const teamLabel = team === 'blue' ? 'Blue' : 'Red';
        this.show(`<span class="${teamColor} font-bold">${teamLabel}</span> เลือก <span class="font-bold">${heroName}</span>`, 'pick');
    }

    success(message) {
        this.show(message, 'success');
    }

    error(message) {
        this.show(message, 'error');
    }

    warning(message) {
        this.show(message, 'warning');
    }

    info(message) {
        this.show(message, 'info');
    }

    getTypeStyles(type) {
        const styles = {
            success: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
            error: 'bg-gradient-to-r from-red-500 to-rose-600 text-white',
            warning: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white',
            info: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white',
            ban: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white',
            pick: 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
        };
        return styles[type] || styles.info;
    }

    getIcon(type) {
        const icons = {
            success: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
            error: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
            warning: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
            info: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
            ban: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>`,
            pick: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`
        };
        return icons[type] || icons.info;
    }
}
