import { Security } from './Security.js';


export class DraftManager {
    constructor(onUpdate, heroes, toast) {
        this.heroes = heroes;
        this.toast = toast;
        this.state = {
            blue: { bans: [], picks: [] },
            red: { bans: [], picks: [] },
            currentTeam: 'blue',
            currentMode: 'ban',
            processing: false
        };
        this.onUpdate = onUpdate;
    }

    getState() { return { ...this.state }; }
    getCurrentTeam() { return this.state.currentTeam; }
    getCurrentMode() { return this.state.currentMode; }

    setMode(mode) {
        if (!['ban', 'pick'].includes(mode)) return;
        this.state.currentMode = mode;
        this.onUpdate();
    }

    selectHero(heroId) {
        if (this.state.processing) return false;
        if (!Security.isValidHeroId(heroId, this.heroes)) return false;
        
        const hero = this.heroes.find(h => h.id.toString() === heroId.toString());
        if (!hero) return false;
        
        this.state.processing = true;
        const team = this.state.currentTeam;
        
        if (this.state.currentMode === 'ban') {
            if (this.state[team].bans.length >= 4) {
                this.toast?.show('แบนครบ 4 ตัวแล้ว!', 'info');
                this.state.processing = false;
                return false;
            }
            if (this.isHeroDrafted(heroId)) {
                this.state.processing = false;
                return false;
            }
            this.state[team].bans.push(heroId);
            this.toast?.ban(hero.name, team);
        } else {
            if (this.state[team].picks.length >= 5) {
                this.toast?.show('เลือกครบ 5 ตัวแล้ว!', 'info');
                this.state.processing = false;
                return false;
            }
            if (this.isHeroDrafted(heroId)) {
                this.state.processing = false;
                return false;
            }
            this.state[team].picks.push(heroId);
            this.toast?.pick(hero.name, team);
        }
        
        this.switchTurn();
        this.onUpdate();
        
        setTimeout(() => {
            this.state.processing = false;
        }, 100);
        
        return true;
    }

    removeHero(team, type, index) {
        if (this.state.processing) return;
        if (!Security.isValidTeam(team)) return;
        if (!['ban', 'pick'].includes(type)) return;
        if (index < 0 || index >= this.state[team][type].length) return;
        
        const heroId = this.state[team][type][index];
        const hero = this.heroes.find(h => h.id.toString() === heroId.toString());
        
        this.state[team][type].splice(index, 1);
        this.toast?.show(`ยกเลิก${type === 'ban' ? 'การแบน' : 'การเลือก'} ${hero?.name || ''}`, 'info');
        this.onUpdate();
    }

    isHeroDrafted(heroId) {
        const id = heroId.toString();
        return (
            this.state.blue.bans.some(b => b.toString() === id) ||
            this.state.red.bans.some(b => b.toString() === id) ||
            this.state.blue.picks.some(p => p.toString() === id) ||
            this.state.red.picks.some(p => p.toString() === id)
        );
    }

    isHeroBanned(heroId) {
        const id = heroId.toString();
        return this.state.blue.bans.some(b => b.toString() === id) || 
               this.state.red.bans.some(b => b.toString() === id);
    }

    isHeroPicked(heroId) {
        const id = heroId.toString();
        return this.state.blue.picks.some(p => p.toString() === id) || 
               this.state.red.picks.some(p => p.toString() === id);
    }

    getHeroPicker(heroId) {
        const id = heroId.toString();
        if (this.state.blue.picks.some(p => p.toString() === id)) return 'blue';
        if (this.state.red.picks.some(p => p.toString() === id)) return 'red';
        return null;
    }

    switchTurn() {
        this.state.currentTeam = this.state.currentTeam === 'blue' ? 'red' : 'blue';
    }

    reset() {
        this.state.blue = { bans: [], picks: [] };
        this.state.red = { bans: [], picks: [] };
        this.state.currentTeam = 'blue';
        this.state.currentMode = 'ban';
        this.onUpdate();
    }
}
