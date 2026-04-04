import { Security } from '../utils/Security.js';
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
        // Create empty slots
        this.bansContainer.innerHTML = Array(3).fill(0).map((_, i) => `
            <div class="draft-slot liquid-glass rounded-lg aspect-square flex items-center justify-center text-gray-400 text-xs font-bold" data-index="${i}">
                ${i + 1}
            </div>
        `).join('');

        this.picksContainer.innerHTML = Array(5).fill(0).map((_, i) => `
            <div class="draft-slot liquid-glass rounded-lg aspect-[4/3] flex items-center justify-center text-gray-400 text-xs font-bold ${i === 4 ? 'col-span-2' : ''}" data-index="${i}">
                ${i + 1}
            </div>
        `).join('');
    }

    update(state) {
        const teamState = state[this.team];
        
        // Update bans
        const banSlots = this.bansContainer.querySelectorAll('.draft-slot');
        banSlots.forEach((slot, idx) => {
            if (teamState.bans[idx]) {
                const hero = heroes.find(h => h.id === teamState.bans[idx]);
                if (hero) {
                    slot.classList.add('filled');
                    slot.innerHTML = `
                        <img src="rovhero/${hero.imageFile}" class="w-full h-full object-cover rounded-md opacity-60 grayscale" alt="">
                        <div class="remove-btn" onclick="window.app.removeHero('${this.team}', 'bans', ${idx})">×</div>
                    `;
                }
            } else {
                slot.classList.remove('filled');
                slot.innerHTML = `${idx + 1}`;
            }
        });
        
        // Update picks
        const pickSlots = this.picksContainer.querySelectorAll('.draft-slot');
        pickSlots.forEach((slot, idx) => {
            if (teamState.picks[idx]) {
                const hero = heroes.find(h => h.id === teamState.picks[idx]);
                if (hero) {
                    slot.classList.add('filled');
                    slot.innerHTML = `
                        <img src="rovhero/${hero.imageFile}" class="w-full h-full object-cover rounded-md" alt="">
                        <div class="hero-name">${Security.escapeHtml(hero.thaiName)}</div>
                        <div class="remove-btn" onclick="window.app.removeHero('${this.team}', 'picks', ${idx})">×</div>
                    `;
                }
            } else {
                slot.classList.remove('filled');
                slot.innerHTML = `<span class="text-gray-400 text-xs font-bold">${idx + 1}</span>`;
            }
        });
    }
}
