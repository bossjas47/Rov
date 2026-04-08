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
        const styles = { success: 'from-green-500 to-emerald-600', error: 'from-red-500 to-rose-600', warning: 'from-amber-500 to-orange-600', info: 'from-blue-500 to-indigo-600', ban: 'from-gray-600 to-gray-700', pick: 'from-purple-500 to-pink-600' };
        toast.className = `toast pointer-events-auto min-w-[280px] max-w-[400px] p-4 rounded-xl shadow-xl flex items-start gap-3 bg-gradient-to-r ${styles[type] || styles.info} text-white`;
        toast.innerHTML = `<div class="flex-1"><p class="text-sm font-medium">${message}</p></div><button class="flex-shrink-0 opacity-60 hover:opacity-100" onclick="this.parentElement.remove()">✕</button>`;
        this.container.appendChild(toast);
        setTimeout(() => { toast.classList.add('hiding'); setTimeout(() => toast.remove(), 300); }, duration);
    }
    ban(heroName, team) { const color = team === 'blue' ? 'text-blue-600' : 'text-red-600'; this.show(`<span class="${color} font-bold">${team === 'blue' ? 'Blue' : 'Red'}</span> แบน <b>${heroName}</b>`, 'ban'); }
    pick(heroName, team) { const color = team === 'blue' ? 'text-blue-600' : 'text-red-600'; this.show(`<span class="${color} font-bold">${team === 'blue' ? 'Blue' : 'Red'}</span> เลือก <b>${heroName}</b>`, 'pick'); }
}
