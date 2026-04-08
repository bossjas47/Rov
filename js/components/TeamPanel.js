import { heroes } from '../data/heroes.js';

export class TeamPanel {
    constructor(team, containerId) {
        this.team = team;
        this.container = document.getElementById(containerId);
        this.bansContainer = document.getElementById(`${team}-bans`);
        this.picksContainer = document.getElementById(`${team}-picks`);
        this.renderEmpty();
    }
    
    renderEmpty() {
        if (this.bansContainer) {
            this.bansContainer.innerHTML = Array(4).fill(0).map((_, i) => 
                `<div class="draft-slot rounded-lg aspect-square flex items-center justify-center text-gray-400 text-xs font-bold bg-white/50" data-index="${i}">${i + 1}</div>`
            ).join('');
        }
        if (this.picksContainer) {
            this.picksContainer.innerHTML = Array(5).fill(0).map((_, i) => 
                `<div class="draft-slot rounded-lg aspect-[4/3] flex items-center justify-center text-gray-400 text-xs font-bold bg-white/50" data-index="${i}">${i + 1}</div>`
            ).join('');
        }
    }
    
    update(state) {
        const teamState = state[this.team];
        
        if (this.bansContainer) {
            const banSlots = this.bansContainer.querySelectorAll('.draft-slot');
            banSlots.forEach((slot, idx) => {
                const heroId = teamState.bans[idx];
                if (heroId !== undefined && heroId !== null) {
                    const hero = heroes.find(h => h.id.toString() === heroId.toString());
                    if (hero) {
                        slot.classList.add('filled');
                        slot.dataset.heroId = heroId;
                        slot.innerHTML = `
                            <img src="rovhero/${hero.imageFile}" class="w-full h-full object-cover rounded-md opacity-60 grayscale" alt="${hero.name}" onerror="this.style.display='none'">
                            <div class="remove-btn" onclick="event.stopPropagation(); window.draftApp.removeHero('${this.team}', 'bans', ${idx})">×</div>
                        `;
                    }
                } else if (slot.classList.contains('filled')) {
                    slot.classList.remove('filled');
                    delete slot.dataset.heroId;
                    slot.innerHTML = `${idx + 1}`;
                }
            });
        }
        
        if (this.picksContainer) {
            const pickSlots = this.picksContainer.querySelectorAll('.draft-slot');
            pickSlots.forEach((slot, idx) => {
                const heroId = teamState.picks[idx];
                if (heroId !== undefined && heroId !== null) {
                    const hero = heroes.find(h => h.id.toString() === heroId.toString());
                    if (hero) {
                        slot.classList.add('filled');
                        slot.dataset.heroId = heroId;
                        slot.innerHTML = `
                            <img src="rovhero/${hero.imageFile}" class="w-full h-full object-cover rounded-md" alt="${hero.name}" onerror="this.style.display='none'">
                            <div class="hero-name">${hero.thaiName}</div>
                            <div class="remove-btn" onclick="event.stopPropagation(); window.draftApp.removeHero('${this.team}', 'picks', ${idx})">×</div>
                        `;
                    }
                } else if (slot.classList.contains('filled')) {
                    slot.classList.remove('filled');
                    delete slot.dataset.heroId;
                    slot.innerHTML = `<span class="text-gray-400 text-xs font-bold">${idx + 1}</span>`;
                }
            });
        }
        
        const banCount = document.getElementById(`${this.team}-ban-count`);
        const pickCount = document.getElementById(`${this.team}-pick-count`);
        if (banCount) banCount.textContent = teamState.bans.length;
        if (pickCount) pickCount.textContent = teamState.picks.length;
    }
}
