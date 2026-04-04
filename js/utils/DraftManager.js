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
        
        const hero = this.heroes.find(h => h.id === heroId);
        if (!hero) return false;
        
        this.state.processing = true;
        const team = this.state.currentTeam;
        
        if (this.state.currentMode === 'ban') {
            if (this.state[team].bans.length >= 3) {
                this.toast?.show('แบนครบ 3 ตัวแล้ว!', 'info');
                this.state.processing = false;
                return false;
            }
            if (this.isHeroDrafted(heroId)) {
                this.state.processing = false;
                return false;
            }
            this.state[team].bans.push(heroId);
            this.toast?.ban(hero.thaiName, team);
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
            this.toast?.pick(hero.thaiName, team);
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
        const hero = this.heroes.find(h => h.id === heroId);
        
        this.state[team][type].splice(index, 1);
        this.toast?.show(`ยกเลิก${type === 'ban' ? 'การแบน' : 'การเลือก'} ${hero?.thaiName || ''}`, 'info');
        this.onUpdate();
    }

    isHeroDrafted(heroId) {
        return (
            this.state.blue.bans.includes(heroId) ||
            this.state.red.bans.includes(heroId) ||
            this.state.blue.picks.includes(heroId) ||
            this.state.red.picks.includes(heroId)
        );
    }

    isHeroBanned(heroId) {
        return this.state.blue.bans.includes(heroId) || this.state.red.bans.includes(heroId);
    }

    isHeroPicked(heroId) {
        return this.state.blue.picks.includes(heroId) || this.state.red.picks.includes(heroId);
    }

    getHeroPicker(heroId) {
        if (this.state.blue.picks.includes(heroId)) return 'blue';
        if (this.state.red.picks.includes(heroId)) return 'red';
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

    async saveDraft(saveDraftToFirebase) {
        if (this.state.blue.picks.length === 0 && this.state.red.picks.length === 0) {
            this.toast?.show('ยังไม่มีการเลือกตัวละคร!', 'error');
            return;
        }
        
        try {
            const draftData = {
                blue: this.state.blue,
                red: this.state.red,
                timestamp: new Date().toISOString()
            };
            await saveDraftToFirebase(draftData);
            this.toast?.show('บันทึกการดราฟท์ลง Firebase เรียบร้อย!', 'success');
        } catch (error) {
            this.toast?.show('เกิดข้อผิดพลาดในการบันทึก!', 'error');
        }
    }
}

