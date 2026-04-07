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
        
        // Use Event Delegation: Attach listener once to the container
        this.initEventListeners();
    }

    debounce(fn, ms) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), ms);
        };
    }

    initEventListeners() {
        let clicking = false;
        this.container.addEventListener('click', (e) => {
            const card = e.target.closest('.hero-card:not(.disabled)');
            if (!card || clicking) return;
            
            clicking = true;
            const heroId = card.dataset.heroId;
            this.draftManager.selectHero(heroId);
            
            setTimeout(() => clicking = false, 300);
        });
    }

    setRole(role) {
        if (this.currentRole === role) return;
        this.currentRole = role;
        this.render();
    }

    setSearch(query) {
        const sanitized = Security.sanitizeInput(query).toLowerCase();
        if (this.searchQuery === sanitized) return;
        this.searchQuery = sanitized;
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
        // Use DocumentFragment for better performance when rendering many elements
        const filtered = this.getFilteredHeroes();
        const html = filtered.map(hero => this.createHeroCard(hero)).join('');
        
        // Only update innerHTML when necessary (e.g., filtering/searching)
        this.container.innerHTML = html;
        document.getElementById('hero-count').textContent = `${filtered.length} ตัว`;
        
        // Only call lucide if icons are present in the grid (usually not for hero cards)
        // if (window.lucide) lucide.createIcons();
    }

    /**
     * Optimized update: Only update the status of cards without re-rendering the whole grid
     */
    updateStatus() {
        const cards = this.container.querySelectorAll('.hero-card');
        cards.forEach(card => {
            const heroId = card.dataset.heroId;
            const isBanned = this.draftManager.isHeroBanned(heroId);
            const isPicked = this.draftManager.isHeroPicked(heroId);
            const picker = this.draftManager.getHeroPicker(heroId);
            
            // Remove existing status classes
            card.classList.remove('selected-ban', 'selected-pick-blue', 'selected-pick-red', 'disabled');
            
            // Remove existing status badge
            const oldBadge = card.querySelector('.status-badge');
            if (oldBadge) oldBadge.remove();

            if (isBanned) {
                card.classList.add('selected-ban', 'disabled');
                const badge = document.createElement('div');
                badge.className = 'status-badge status-ban';
                badge.title = 'Banned';
                badge.textContent = 'B';
                card.querySelector('.aspect-square').appendChild(badge);
            } else if (isPicked) {
                const isBlue = picker === 'blue';
                card.classList.add(`selected-pick-${picker}`, 'disabled');
                const badge = document.createElement('div');
                badge.className = `status-badge ${isBlue ? 'status-pick-blue' : 'status-pick-red'}`;
                badge.title = `Picked by ${picker}`;
                badge.textContent = isBlue ? 'B' : 'R';
                card.querySelector('.aspect-square').appendChild(badge);
            }
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
            <div class="hero-card rounded-lg overflow-hidden relative gpu-accelerated ${extraClass}" 
                 data-hero-id="${hero.id}"
                 title="${Security.escapeHtml(hero.name)}">
                <div class="aspect-square relative bg-gray-100" style="aspect-ratio: 1/1;">
                    <img src="rovhero/${hero.imageFile}" 
                         alt="${Security.escapeHtml(hero.name)}"
                         class="w-full h-full object-cover"
                         loading="lazy"
                         width="80" height="80"
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Crect fill=%22%23e2e8f0%22 width=%2260%22 height=%2260%22/%3E%3Ctext x=%2230%22 y=%2235%22 font-size=%2220%22 text-anchor=%22middle%22 fill=%22%2364748b%22%3E${hero.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
                    ${statusBadge}
                </div>
                <div class="p-1 bg-white">
                    <p class="text-[9px] font-bold text-gray-800 truncate text-center">${Security.escapeHtml(hero.name)}</p>
                </div>
            </div>
        `;
    }
}
