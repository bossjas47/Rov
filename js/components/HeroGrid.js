import { heroes, roleColors, getHeroesByRole, searchHeroes } from '../data/heroes.js';

export class HeroGrid {
    constructor(containerId, draftManager) {
        this.container = document.getElementById(containerId);
        this.draftManager = draftManager;
        this.currentRole = 'all';
        this.searchQuery = '';
        this.render();
    }

    render() {
        if (!this.container) return;

        let filteredHeroes = this.searchQuery 
            ? searchHeroes(this.searchQuery)
            : getHeroesByRole(this.currentRole);

        // Update hero count
        const countEl = document.getElementById('hero-count');
        if (countEl) {
            countEl.textContent = `${filteredHeroes.length} ตัว`;
        }

        this.container.innerHTML = filteredHeroes.map(hero => {
            const state = this.draftManager.getHeroState(hero.id);
            const statusClass = this.getStatusClass(state);
            const statusBadge = this.getStatusBadge(state);
            const isGlobalBanned = this.draftManager.isGlobalBanned(hero.id);
            const globalBanClass = isGlobalBanned ? 'global-banned' : '';
            const globalBanTooltip = isGlobalBanned ? 'ตัวละครนี้ถูกใช้ในเกมก่อนหน้า' : '';

            return `
                <div class="hero-card ${statusClass} ${globalBanClass} relative group" 
                     data-hero-id="${hero.id}"
                     title="${hero.thaiName}${globalBanTooltip ? ' - ' + globalBanTooltip : ''}"
                     onclick="draftApp.selectHero(${hero.id})">
                    <img src="rovhero/${hero.imageFile}" 
                         alt="${hero.name}" 
                         class="w-full aspect-square object-cover rounded-md"
                         loading="lazy">
                    ${statusBadge}
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p class="text-[10px] text-white font-medium truncate">${hero.thaiName}</p>
                    </div>
                    <div class="absolute top-1 left-1 w-2 h-2 rounded-full" style="background-color: ${roleColors[hero.role]}"></div>
                </div>
            `;
        }).join('');
    }

    getStatusClass(state) {
        if (!state) return '';
        if (state.type === 'ban') return 'selected-ban disabled';
        if (state.type === 'pick') {
            return state.team === 'blue' ? 'selected-pick-blue disabled' : 'selected-pick-red disabled';
        }
        return '';
    }

    getStatusBadge(state) {
        if (!state) return '';
        
        let badgeClass = '';
        let icon = '';
        
        if (state.type === 'ban') {
            badgeClass = 'status-ban';
            icon = '✕';
        } else if (state.type === 'pick') {
            badgeClass = state.team === 'blue' ? 'status-pick-blue' : 'status-pick-red';
            icon = '✓';
        }
        
        return `<div class="status-badge ${badgeClass}">${icon}</div>`;
    }

    updateStatus() {
        this.render();
    }

    setRole(role) {
        this.currentRole = role;
        this.render();
    }

    setSearch(query) {
        this.searchQuery = query;
        this.render();
    }
}
