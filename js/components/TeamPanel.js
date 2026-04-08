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
        // Create empty slots - 4 slots for bans
        if (this.bansContainer) {
            this.bansContainer.innerHTML = Array(4).fill(0).map((_, i) => `
                <div class="draft-slot liquid-glass rounded-lg aspect-square flex items-center justify-center text-gray-400 text-xs font-bold" data-index="${i}">
                    ${i + 1}
                </div>
            `).join('');
        }

        // Create empty slots - 5 slots for picks
        if (this.picksContainer) {
            this.picksContainer.innerHTML = Array(5).fill(0).map((_, i) => `
                <div class="draft-slot liquid-glass rounded-lg aspect-[4/3] flex items-center justify-center text-gray-400 text-xs font-bold" data-index="${i}">
                    ${i + 1}
                </div>
            `).join('');
        }
    }

    update(state) {
        const teamState = state[this.team];
        
        // Update bans
        if (this.bansContainer) {
            const banSlots = this.bansContainer.querySelectorAll('.draft-slot');
            banSlots.forEach((slot, idx) => {
                const currentHeroId = teamState.bans[idx];
                const isFilled = slot.classList.contains('filled');
                const slotHeroId = slot.dataset.heroId;

                if (currentHeroId !== undefined && currentHeroId !== null) {
                    if (!isFilled || slotHeroId?.toString() !== currentHeroId.toString()) {
                        const hero = heroes.find(h => h.id.toString() === currentHeroId.toString());
                        if (hero) {
                            slot.classList.add('filled');
                            slot.dataset.heroId = currentHeroId;
                            slot.innerHTML = `
                                <img src="rovhero/${hero.imageFile}" class="w-full h-full object-cover rounded-md opacity-60 grayscale" alt="${hero.name}">
                                <div class="remove-btn" onclick="window.draftApp.removeHero('${this.team}', 'bans', ${idx})">×</div>
                            `;
                        }
                    }
                } else if (isFilled) {
                    slot.classList.remove('filled');
                    delete slot.dataset.heroId;
                    slot.innerHTML = `${idx + 1}`;
                }
            });
        }
        
        // Update picks
        if (this.picksContainer) {
            const pickSlots = this.picksContainer.querySelectorAll('.draft-slot');
            pickSlots.forEach((slot, idx) => {
                const currentHeroId = teamState.picks[idx];
                const isFilled = slot.classList.contains('filled');
                const slotHeroId = slot.dataset.heroId;

                if (currentHeroId !== undefined && currentHeroId !== null) {
                    if (!isFilled || slotHeroId?.toString() !== currentHeroId.toString()) {
                        const hero = heroes.find(h => h.id.toString() === currentHeroId.toString());
                        if (hero) {
                            slot.classList.add('filled');
                            slot.dataset.heroId = currentHeroId;
                            slot.innerHTML = `
                                <img src="rovhero/${hero.imageFile}" class="w-full h-full object-cover rounded-md" alt="${hero.name}">
                                <div class="hero-name">${hero.name}</div>
                                <div class="remove-btn" onclick="window.draftApp.removeHero('${this.team}', 'picks', ${idx})">×</div>
                            `;
                        }
                    }
                } else if (isFilled) {
                    slot.classList.remove('filled');
                    delete slot.dataset.heroId;
                    slot.innerHTML = `<span class="text-gray-400 text-xs font-bold">${idx + 1}</span>`;
                }
            });
        }

        // Update counts
        const banCountEl = document.getElementById(`${this.team}-ban-count`);
        const pickCountEl = document.getElementById(`${this.team}-pick-count`);
        
        if (banCountEl) banCountEl.textContent = teamState.bans.length;
        if (pickCountEl) pickCountEl.textContent = teamState.picks.length;
    }
}
