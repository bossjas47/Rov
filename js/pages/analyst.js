// Analyst Page JavaScript

class AnalystApp {
    constructor() {
        this.toast = new ToastManager();
        this.analytics = null;
        this.init();
    }
    init() {
        firebaseService.onAuthStateChanged((user, userData) => {
            if (user) { this.showAnalytics(); this.loadAnalytics(); }
            else this.showLoginRequired();
        });
        window.analystApp = this;
        window.app = this;
    }
    toggleSidebar() { 
        window.toggleSidebar();
    }
    showLoginRequired() { document.getElementById('loginRequired')?.classList.remove('hidden'); document.getElementById('analyticsContent')?.classList.add('hidden'); }
    showAnalytics() { document.getElementById('loginRequired')?.classList.add('hidden'); document.getElementById('analyticsContent')?.classList.remove('hidden'); }
    async loadAnalytics() {
        const user = firebaseService.getCurrentUser();
        if (!user) return;
        this.analytics = await firebaseService.getUserAnalytics(user.uid);
        this.renderAnalytics();
    }
    renderAnalytics() {
        if (!this.analytics) return;
        document.getElementById('totalDrafts').textContent = this.analytics.totalDrafts;
        document.getElementById('winRate').textContent = this.analytics.winRate + '%';
        document.getElementById('totalWins').textContent = this.analytics.wins;
        document.getElementById('totalLosses').textContent = this.analytics.losses;
        this.renderBOStats();
        this.renderMostPicked();
        this.renderMostBanned();
        this.renderHeroWinRates();
    }
    renderBOStats() {
        const container = document.getElementById('boStatsContainer');
        if (!container) return;
        const boStats = this.analytics.boStats || {};
        if (Object.keys(boStats).length === 0) { container.innerHTML = '<p class="text-gray-500 text-center py-8 col-span-full">ไม่มีข้อมูล</p>'; return; }
        container.innerHTML = Object.entries(boStats).map(([bo, stats]) => {
            const winRate = stats.winRate || 0;
            const colorClass = winRate >= 60 ? 'text-green-500' : winRate >= 40 ? 'text-yellow-500' : 'text-red-500';
            return `<div class="bg-gray-50 rounded-xl p-4 text-center"><p class="text-lg font-bold text-gray-800 mb-1">BO${bo}</p><p class="text-2xl font-bold ${colorClass}">${winRate}%</p><p class="text-xs text-gray-500">${stats.wins || 0}W / ${stats.losses || 0}L</p><p class="text-xs text-gray-400">${stats.total} เกม</p></div>`;
        }).join('');
    }
    renderMostPicked() {
        const container = document.getElementById('mostPickedContainer');
        if (!container) return;
        const mostPicked = this.analytics.mostPickedHeroes || [];
        if (mostPicked.length === 0) { container.innerHTML = '<p class="text-gray-500 text-center py-8">ไม่มีข้อมูล</p>'; return; }
        container.innerHTML = mostPicked.slice(0, 10).map(([heroId, count], index) => {
            const hero = getHeroById(heroId);
            if (!hero) return '';
            const winRateData = this.analytics.heroWinRates?.[heroId];
            const winRate = winRateData ? winRateData.winRate : 0;
            const winRateClass = winRate >= 60 ? 'text-green-500' : winRate >= 40 ? 'text-yellow-500' : 'text-red-500';
            return `<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><span class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">${index + 1}</span><img src="../rovhero/${hero.imageFile}" alt="${hero.name}" class="w-10 h-10 rounded-lg object-cover"><div class="flex-1"><p class="font-medium text-gray-800">${hero.thaiName}</p><p class="text-xs text-gray-500">${count} ครั้ง</p></div>${winRateData ? `<div class="text-right"><p class="text-sm font-bold ${winRateClass}">${winRate}%</p><p class="text-xs text-gray-400">WR</p></div>` : ''}</div>`;
        }).join('');
    }
    renderMostBanned() {
        const container = document.getElementById('mostBannedContainer');
        if (!container) return;
        const mostBanned = this.analytics.mostBannedHeroes || [];
        if (mostBanned.length === 0) { container.innerHTML = '<p class="text-gray-500 text-center py-8">ไม่มีข้อมูล</p>'; return; }
        container.innerHTML = mostBanned.slice(0, 10).map(([heroId, count], index) => {
            const hero = getHeroById(heroId);
            if (!hero) return '';
            return `<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">${index + 1}</span><img src="../rovhero/${hero.imageFile}" alt="${hero.name}" class="w-10 h-10 rounded-lg object-cover"><div class="flex-1"><p class="font-medium text-gray-800">${hero.thaiName}</p><p class="text-xs text-gray-500">${count} ครั้ง</p></div></div>`;
        }).join('');
    }
    renderHeroWinRates() {
        const container = document.getElementById('heroWinRatesContainer');
        if (!container) return;
        const heroWinRates = this.analytics.heroWinRates || {};
        const sorted = Object.entries(heroWinRates).filter(([_, d]) => d.total >= 3).sort((a, b) => parseFloat(b[1].winRate) - parseFloat(a[1].winRate));
        if (sorted.length === 0) { container.innerHTML = '<p class="text-gray-500 text-center py-8 col-span-full">ไม่มีข้อมูล (ต้องเล่นตัวละครนั้นอย่างน้อย 3 เกม)</p>'; return; }
        container.innerHTML = sorted.map(([heroId, data]) => {
            const hero = getHeroById(heroId);
            if (!hero) return '';
            const winRate = parseFloat(data.winRate);
            const colorClass = winRate >= 60 ? 'from-green-500 to-emerald-600' : winRate >= 50 ? 'from-blue-500 to-indigo-600' : winRate >= 40 ? 'from-yellow-500 to-orange-600' : 'from-red-500 to-rose-600';
            return `<div class="bg-gray-50 rounded-xl p-3 text-center"><img src="../rovhero/${hero.imageFile}" alt="${hero.name}" class="w-12 h-12 rounded-lg object-cover mx-auto mb-2"><p class="text-sm font-medium text-gray-800 truncate">${hero.thaiName}</p><div class="mt-2 inline-block px-3 py-1 rounded-full bg-gradient-to-r ${colorClass} text-white text-sm font-bold">${winRate}%</div><p class="text-xs text-gray-500 mt-1">${data.wins}W / ${data.total}G</p></div>`;
        }).join('');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.analystApp = new AnalystApp();
    window.app = window.analystApp;
});
