import { Security } from '../utils/Security.js';
import { heroes } from '../data/heroes.js';

export class HeroGrid {
    constructor(containerId, draftManager) {
        this.container = document.getElementById(containerId);
        this.draftManager = draftManager;
        this.currentRole = 'all';
        this.searchQuery = '';
        
        // Debounced render for search
        this.debouncedRender = this.debounce(() => this.render(), 50);
    }

    debounce(fn, ms) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), ms);
        };
    }

    setRole(role) {
        this.currentRole = role;
        this.render();
    }

    setSearch(query) {
        this.searchQuery = Security.sanitizeInput(query).toLowerCase();
        this.debouncedRender();
    }

    getFilteredHeroes() {
        return heroes.filter(hero => {
            const matchesRole = this.currentRole === 'all' || hero.role === this.currentRole;
            const matchesSearch = 
                hero.name.toLowerCase().includes(this.searchQuery) || 
                hero.thaiName.includes(this.searchQuery);
            return matchesRole && matchesSearch;
        });
    }

    render() {
        // Use requestAnimationFrame for smooth rendering
        requestAnimationFrame(() => {
            const filtered = this.getFilteredHeroes();
            const html = filtered.map(hero => this.createHeroCard(hero)).join('');
            this.container.innerHTML = html;
            
            document.getElementById('hero-count').textContent = `${filtered.length} ตัว`;
            this.attachListeners();
            
            if (window.lucide) lucide.createIcons();
        });
    }

    createHeroCard(hero) {
        const isBanned = this.draftManager.isHeroBanned(hero.id);
        const isPicked = this.draftManager.isHeroPicked(hero.id);
        const picker = this.draftManager.getHeroPicker(hero.id);
        
        let statusBadge = '';
        let extraClass = '';
        
        if (isBanned) {
            statusBadge = `<div class="status-badge status-ban" title="Banned">B</div>`;
            extraClass = 'selected-ban disabled';
        } else if (isPicked) {
            const isBlue = picker === 'blue';
            statusBadge = `<div class="status-badge ${isBlue ? 'status-pick-blue' : 'status-pick-red'}" title="Picked by ${picker}">${isBlue ? 'B' : 'R'}</div>`;
            extraClass = `selected-pick-${picker} disabled`;
        }

        return `
            <div class="hero-card liquid-glass rounded-lg overflow-hidden relative gpu-accelerated ${extraClass}" 
                 data-hero-id="${hero.id}"
                 title="${Security.escapeHtml(hero.thaiName)}">
                <div class="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200">
                    <img src="rovhero/${hero.imageFile}" 
                         alt="${Security.escapeHtml(hero.name)}"
                         class="w-full h-full object-cover"
                         loading="lazy"
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Crect fill=%22%23e2e8f0%22 width=%2260%22 height=%2260%22/%3E%3Ctext x=%2230%22 y=%2235%22 font-size=%2220%22 text-anchor=%22middle%22 fill=%22%2364748b%22%3E${hero.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
                    ${statusBadge}
                </div>
                <div class="p-1.5 bg-white/30">
                    <p class="text-[10px] font-bold text-gray-800 truncate">${Security.escapeHtml(hero.thaiName)}</p>
                </div>
            </div>
        `;
    }

    attachListeners() {
        const cards = this.container.querySelectorAll('.hero-card:not(.disabled)');
        cards.forEach(card => {
            // Throttle clicks to prevent double selection
            let clicking = false;
            card.addEventListener('click', () => {
                if (clicking) return;
                clicking = true;
                
                const heroId = card.dataset.heroId;
                this.draftManager.selectHero(heroId);
                
                setTimeout(() => clicking = false, 300);
            });
        });
    }
}
