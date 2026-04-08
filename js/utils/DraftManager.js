import { heroes } from '../data/heroes.js';

const DRAFT_SEQUENCE = [
    { type: 'ban', team: 'blue', count: 1 }, { type: 'ban', team: 'red', count: 1 },
    { type: 'ban', team: 'blue', count: 1 }, { type: 'ban', team: 'red', count: 1 },
    { type: 'pick', team: 'blue', count: 1 }, { type: 'pick', team: 'red', count: 2 },
    { type: 'pick', team: 'blue', count: 2 }, { type: 'pick', team: 'red', count: 1 },
    { type: 'ban', team: 'red', count: 1 }, { type: 'ban', team: 'blue', count: 1 },
    { type: 'ban', team: 'red', count: 1 }, { type: 'ban', team: 'blue', count: 1 },
    { type: 'pick', team: 'red', count: 1 }, { type: 'pick', team: 'blue', count: 2 },
    { type: 'pick', team: 'red', count: 2 }, { type: 'pick', team: 'blue', count: 1 },
];

export class DraftManager {
    constructor(onUpdate, toast) {
        this.heroes = heroes;
        this.onUpdate = onUpdate;
        this.toast = toast;
        this.bo = 3;
        this.currentGame = 1;
        this.matchId = null;
        this.globalBannedHeroes = new Set();
        this.state = { blue: { bans: [], picks: [] }, red: { bans: [], picks: [] }, currentStep: 0, isComplete: false };
        this.games = [];
    }
    
    initMatch(bo) {
        this.bo = bo;
        this.currentGame = 1;
        this.matchId = 'match_' + Date.now();
        this.globalBannedHeroes.clear();
        this.games = [];
        this.resetGame();
    }
    
    resetGame() {
        this.state = { blue: { bans: [], picks: [] }, red: { bans: [], picks: [] }, currentStep: 0, isComplete: false };
        this.onUpdate();
    }
    
    reset() {
        this.bo = 3;
        this.currentGame = 1;
        this.matchId = null;
        this.globalBannedHeroes.clear();
        this.games = [];
        this.resetGame();
    }
    
    getCurrentStep() { return this.state.currentStep < DRAFT_SEQUENCE.length ? DRAFT_SEQUENCE[this.state.currentStep] : null; }
    getCurrentTeam() { const step = this.getCurrentStep(); return step ? step.team : null; }
    getCurrentMode() { const step = this.getCurrentStep(); return step ? step.type : null; }
    getState() { return { ...this.state, bo: this.bo, currentGame: this.currentGame, matchId: this.matchId, isMatchComplete: this.isMatchComplete() }; }
    
    isHeroDrafted(heroId) {
        const id = heroId.toString();
        return this.state.blue.bans.some(b => b.toString() === id) || 
               this.state.red.bans.some(b => b.toString() === id) || 
               this.state.blue.picks.some(p => p.toString() === id) || 
               this.state.red.picks.some(p => p.toString() === id);
    }
    
    isGlobalBanned(heroId) { return this.globalBannedHeroes.has(heroId.toString()); }
    
    getHeroState(heroId) {
        const id = heroId.toString();
        if (this.state.blue.bans.some(b => b.toString() === id)) return { type: 'ban', team: 'blue' };
        if (this.state.red.bans.some(b => b.toString() === id)) return { type: 'ban', team: 'red' };
        if (this.state.blue.picks.some(p => p.toString() === id)) return { type: 'pick', team: 'blue' };
        if (this.state.red.picks.some(p => p.toString() === id)) return { type: 'pick', team: 'red' };
        return null;
    }
    
    selectHero(heroId) {
        const step = this.getCurrentStep();
        if (!step) return { success: false, error: 'Draft completed' };
        if (this.isGlobalBanned(heroId)) return { success: false, error: 'ตัวละครนี้ถูกใช้ในเกมก่อนหน้าแล้ว' };
        if (this.isHeroDrafted(heroId)) return { success: false, error: 'ตัวละครนี้ถูกเลือกไปแล้ว' };
        
        const hero = this.heroes.find(h => h.id.toString() === heroId.toString());
        const team = step.team;
        const type = step.type;
        
        this.state[team][type === 'ban' ? 'bans' : 'picks'].push(heroId);
        
        if (type === 'ban') this.toast?.ban(hero?.thaiName || hero?.name || 'Hero', team);
        else this.toast?.pick(hero?.thaiName || hero?.name || 'Hero', team);
        
        this.nextStep();
        return { success: true };
    }
    
    nextStep() {
        this.state.currentStep++;
        if (this.state.currentStep >= DRAFT_SEQUENCE.length) {
            this.state.isComplete = true;
            this.games.push({ gameNumber: this.currentGame, blue: { ...this.state.blue }, red: { ...this.state.red } });
            this.state.blue.picks.forEach(id => this.globalBannedHeroes.add(id.toString()));
            this.state.red.picks.forEach(id => this.globalBannedHeroes.add(id.toString()));
            this.toast?.show(`ดราฟเกมที่ ${this.currentGame} เสร็จสิ้น!`, 'success');
        }
        this.onUpdate();
    }
    
    nextGame() {
        if (this.currentGame < this.bo) {
            this.currentGame++;
            this.resetGame();
            this.toast?.show(`เริ่มดราฟเกมที่ ${this.currentGame}`, 'info');
            return true;
        }
        return false;
    }
    
    isMatchComplete() { return this.currentGame >= this.bo && this.state.isComplete; }
    
    removeHero(team, type, index) {
        const list = this.state[team][type === 'ban' ? 'bans' : 'picks'];
        if (index >= 0 && index < list.length) {
            list.splice(index, 1);
            this.state.currentStep = Math.max(0, this.state.currentStep - 1);
            this.state.isComplete = false;
            this.onUpdate();
        }
    }
    
    getPhaseText() {
        if (!this.getCurrentStep()) return 'ดราฟเสร็จสิ้น';
        const step = this.state.currentStep;
        if (step < 4) return 'Ban Phase 1';
        if (step < 8) return 'Pick Phase 1';
        if (step < 12) return 'Ban Phase 2';
        return 'Pick Phase 2';
    }
    
    getActionHint() { const step = this.getCurrentStep(); return step ? `${step.type === 'ban' ? 'แบน' : 'เลือก'} ${step.count} ตัว` : 'ดราฟเสร็จสิ้น'; }
    getTeamText() { const step = this.getCurrentStep(); return step ? (step.team === 'blue' ? 'First Pick' : 'Second Pick') : '-'; }
    
    getDraftData() {
        return {
            bo: this.bo, matchId: this.matchId,
            games: this.games.map(g => ({ gameNumber: g.gameNumber, myPicks: g.blue.picks, myBans: g.blue.bans, opponentPicks: g.red.picks, opponentBans: g.red.bans })),
            currentGame: this.currentGame, isComplete: this.isMatchComplete()
        };
    }
}
