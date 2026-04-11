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
        let filtered = this.searchQuery ? searchHeroes(this.searchQuery) : getHeroesByRole(this.currentRole);
        const countEl = document.getElementById('hero-count');
        if (countEl) countEl.textContent = `${filtered.length} ตัว`;
        
        // ล้างข้อมูลเดิมก่อน
        this.container.innerHTML = '';
        
        // Chunked Rendering: แบ่งการวาดทีละ 20 ตัวเพื่อไม่ให้เบราว์เซอร์ค้าง
        const chunkSize = 20;
        let index = 0;
        
        const renderChunk = () => {
            const chunk = filtered.slice(index, index + chunkSize);
            if (chunk.length === 0) return;
            
            const fragment = document.createDocumentFragment();
            const tempDiv = document.createElement('div');
            
            tempDiv.innerHTML = chunk.map(hero => {
                const state = this.draftManager.getHeroState(hero.id);
                let statusClass = '';
                let statusBadge = '';
                
                if (state) {
                    if (state.type === 'ban') {
                        statusClass = 'selected-ban disabled';
                        statusBadge = '<div class="status-badge status-ban">✕</div>';
                    } else if (state.type === 'pick') {
                        statusClass = state.team === 'blue' ? 'selected-pick-blue disabled' : 'selected-pick-red disabled';
                        statusBadge = `<div class="status-badge ${state.team === 'blue' ? 'status-pick-blue' : 'status-pick-red'}">✓</div>`;
                    }
                }
                
                const isGlobal = this.draftManager.isGlobalBanned(hero.id);
                const globalClass = isGlobal ? 'global-banned' : '';
                const tooltip = isGlobal ? ' - ถูกใช้ในเกมก่อน' : '';
                const imgSrc = `rovhero/${hero.imageFile}`;
                
                return `
                    <div class="hero-card ${statusClass} ${globalClass}" 
                         data-hero-id="${hero.id}"
                         title="${hero.thaiName}${tooltip}"
                         onclick="if(!this.classList.contains('disabled')) draftApp.selectHero(${hero.id})">
                        <div class="relative w-full aspect-square bg-gray-200 rounded-md overflow-hidden">
                            <img src="${imgSrc}" 
                                 alt="${hero.name}" 
                                 class="w-full h-full object-cover rounded-md transition-opacity duration-300 opacity-0"
                                 loading="lazy"
                                 onload="this.classList.remove('opacity-0')"
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-md flex items-center justify-center text-white font-bold text-lg" style="display:none;">
                                ${hero.name.charAt(0)}
                            </div>
                        </div>
                        ${statusBadge}
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1">
                            <p class="text-[10px] text-white font-medium truncate text-center">${hero.thaiName}</p>
                        </div>
                        <div class="absolute top-1 left-1 w-2 h-2 rounded-full" style="background-color: ${roleColors[hero.role]}"></div>
                    </div>
                `;
            }).join('');
            
            while (tempDiv.firstChild) {
                fragment.appendChild(tempDiv.firstChild);
            }
            
            this.container.appendChild(fragment);
            index += chunkSize;
            
            if (index < filtered.length) {
                requestAnimationFrame(renderChunk);
            }
        };
        
        requestAnimationFrame(renderChunk);
    }
    
    updateStatus() {
        // แทนที่จะ Render ใหม่ทั้งหมด ให้หาเฉพาะ Card ที่สถานะเปลี่ยน
        const cards = this.container.querySelectorAll('.hero-card');
        cards.forEach(card => {
            const heroId = card.dataset.heroId;
            const state = this.draftManager.getHeroState(heroId);
            const isGlobal = this.draftManager.isGlobalBanned(heroId);
            
            // ตรวจสอบว่าสถานะปัจจุบันตรงกับ UI หรือไม่
            const isCurrentlyDisabled = card.classList.contains('disabled');
            const shouldBeDisabled = !!state || isGlobal;
            
            if (isCurrentlyDisabled !== shouldBeDisabled) {
                // ถ้าสถานะเปลี่ยน ให้ Render ใหม่เฉพาะ Card นี้ หรืออัปเดต Class
                if (state) {
                    if (state.type === 'ban') {
                        card.className = `hero-card selected-ban disabled ${isGlobal ? 'global-banned' : ''}`;
                        // อัปเดต Badge ถ้ายังไม่มี
                        if (!card.querySelector('.status-badge')) {
                            card.insertAdjacentHTML('beforeend', '<div class="status-badge status-ban">✕</div>');
                        }
                    } else if (state.type === 'pick') {
                        const teamClass = state.team === 'blue' ? 'selected-pick-blue' : 'selected-pick-red';
                        card.className = `hero-card ${teamClass} disabled ${isGlobal ? 'global-banned' : ''}`;
                        if (!card.querySelector('.status-badge')) {
                            const badgeClass = state.team === 'blue' ? 'status-pick-blue' : 'status-pick-red';
                            card.insertAdjacentHTML('beforeend', `<div class="status-badge ${badgeClass}">✓</div>`);
                        }
                    }
                } else if (isGlobal) {
                    card.classList.add('global-banned', 'disabled');
                } else {
                    card.className = 'hero-card';
                    const badge = card.querySelector('.status-badge');
                    if (badge) badge.remove();
                }
            }
        });
    }
    setRole(role) { this.currentRole = role; this.render(); }
    setSearch(query) { this.searchQuery = query; this.render(); }
}
