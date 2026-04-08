import { heroes } from '../data/heroes.js';

// Draft sequence for competitive mode (First Pick vs Second Pick)
// Format: { type: 'ban'|'pick', team: 'blue'|'red', count: number }
const DRAFT_SEQUENCE = [
    // Ban Phase 1
    { type: 'ban', team: 'blue', count: 1 },
    { type: 'ban', team: 'red', count: 1 },
    { type: 'ban', team: 'blue', count: 1 },
    { type: 'ban', team: 'red', count: 1 },
    // Pick Phase 1
    { type: 'pick', team: 'blue', count: 1 },
    { type: 'pick', team: 'red', count: 2 },
    { type: 'pick', team: 'blue', count: 2 },
    { type: 'pick', team: 'red', count: 1 },
    // Ban Phase 2
    { type: 'ban', team: 'red', count: 1 },
    { type: 'ban', team: 'blue', count: 1 },
    { type: 'ban', team: 'red', count: 1 },
    { type: 'ban', team: 'blue', count: 1 },
    // Pick Phase 2
    { type: 'pick', team: 'red', count: 1 },
    { type: 'pick', team: 'blue', count: 2 },
    { type: 'pick', team: 'red', count: 2 },
    { type: 'pick', team: 'blue', count: 1 },
];

export class DraftManager {
    constructor(onUpdate, toast) {
        this.heroes = heroes;
        this.toast = toast;
        this.onUpdate = onUpdate;
        
        // BO Settings
        this.bo = 3;
        this.currentGame = 1;
        this.matchId = null;
        
        // Global banpick - heroes used in previous games
        this.globalBannedHeroes = new Set();
        
        // Current game state
        this.state = {
            blue: { bans: [], picks: [] },
            red: { bans: [], picks: [] },
            currentStep: 0,
            isComplete: false
        };
        
        // Match history
        this.games = [];
        
        this.reset();
    }

    // Initialize new match
    initMatch(bo) {
        this.bo = bo;
        this.currentGame = 1;
        this.matchId = 'match_' + Date.now();
        this.globalBannedHeroes.clear();
        this.games = [];
        this.resetGame();
    }

    // Reset current game
    resetGame() {
        this.state = {
            blue: { bans: [], picks: [] },
            red: { bans: [], picks: [] },
            currentStep: 0,
            isComplete: false
        };
        this.onUpdate();
    }

    // Reset entire match
    reset() {
        this.bo = 3;
        this.currentGame = 1;
        this.matchId = null;
        this.globalBannedHeroes.clear();
        this.games = [];
        this.resetGame();
    }

    // Get current sequence step
    getCurrentStep() {
        if (this.state.currentStep >= DRAFT_SEQUENCE.length) {
            return null;
        }
        return DRAFT_SEQUENCE[this.state.currentStep];
    }

    // Get current team
    getCurrentTeam() {
        const step = this.getCurrentStep();
        return step ? step.team : null;
    }

    // Get current mode (ban/pick)
    getCurrentMode() {
        const step = this.getCurrentStep();
        return step ? step.type : null;
    }

    // Get state
    getState() {
        return {
            ...this.state,
            bo: this.bo,
            currentGame: this.currentGame,
            matchId: this.matchId,
            isMatchComplete: this.isMatchComplete()
        };
    }

    // Check if hero is drafted (banned or picked) in current game
    isHeroDrafted(heroId) {
        const id = heroId.toString();
        return (
            this.state.blue.bans.some(b => b.toString() === id) ||
            this.state.red.bans.some(b => b.toString() === id) ||
            this.state.blue.picks.some(p => p.toString() === id) ||
            this.state.red.picks.some(p => p.toString() === id)
        );
    }

    // Check if hero is globally banned (used in previous games)
    isGlobalBanned(heroId) {
        return this.globalBannedHeroes.has(heroId.toString());
    }

    // Get hero state
    getHeroState(heroId) {
        const id = heroId.toString();
        
        if (this.state.blue.bans.some(b => b.toString() === id)) {
            return { type: 'ban', team: 'blue' };
        }
        if (this.state.red.bans.some(b => b.toString() === id)) {
            return { type: 'ban', team: 'red' };
        }
        if (this.state.blue.picks.some(p => p.toString() === id)) {
            return { type: 'pick', team: 'blue' };
        }
        if (this.state.red.picks.some(p => p.toString() === id)) {
            return { type: 'pick', team: 'red' };
        }
        return null;
    }

    // Select hero (ban or pick)
    selectHero(heroId) {
        const step = this.getCurrentStep();
        if (!step) return { success: false, error: 'Draft completed' };

        // Check if hero is globally banned
        if (this.isGlobalBanned(heroId)) {
            return { success: false, error: 'ตัวละครนี้ถูกใช้ในเกมก่อนหน้าแล้ว' };
        }

        // Check if hero is already drafted
        if (this.isHeroDrafted(heroId)) {
            return { success: false, error: 'ตัวละครนี้ถูกเลือกไปแล้ว' };
        }

        const hero = this.heroes.find(h => h.id.toString() === heroId.toString());
        if (!hero) return { success: false, error: 'ไม่พบตัวละคร' };

        const team = step.team;
        const type = step.type;

        // Add to state
        this.state[team][type === 'ban' ? 'bans' : 'picks'].push(heroId);

        // Show toast
        if (type === 'ban') {
            this.toast?.ban(hero.name, team);
        } else {
            this.toast?.pick(hero.name, team);
        }

        // Move to next step
        this.nextStep();

        return { success: true };
    }

    // Move to next step
    nextStep() {
        this.state.currentStep++;

        // Check if draft is complete
        if (this.state.currentStep >= DRAFT_SEQUENCE.length) {
            this.state.isComplete = true;
            this.onDraftComplete();
        }

        this.onUpdate();
    }

    // Called when draft is complete
    onDraftComplete() {
        // Save current game to games array
        this.games.push({
            gameNumber: this.currentGame,
            blue: { ...this.state.blue },
            red: { ...this.state.red }
        });

        // Add picked heroes to global ban
        this.state.blue.picks.forEach(id => this.globalBannedHeroes.add(id.toString()));
        this.state.red.picks.forEach(id => this.globalBannedHeroes.add(id.toString()));

        this.toast?.show(`ดราฟเกมที่ ${this.currentGame} เสร็จสิ้น!`, 'success');
    }

    // Go to next game
    nextGame() {
        if (this.currentGame < this.bo) {
            this.currentGame++;
            this.resetGame();
            this.toast?.show(`เริ่มดราฟเกมที่ ${this.currentGame}`, 'info');
            return true;
        }
        return false;
    }

    // Check if match is complete
    isMatchComplete() {
        return this.currentGame >= this.bo && this.state.isComplete;
    }

    // Remove hero (for undo)
    removeHero(team, type, index) {
        const list = this.state[team][type === 'ban' ? 'bans' : 'picks'];
        if (index >= 0 && index < list.length) {
            const heroId = list[index];
            const hero = this.heroes.find(h => h.id.toString() === heroId.toString());
            
            list.splice(index, 1);
            
            // Adjust current step
            this.state.currentStep = Math.max(0, this.state.currentStep - 1);
            this.state.isComplete = false;
            
            this.toast?.show(`ยกเลิก${type === 'ban' ? 'การแบน' : 'การเลือก'} ${hero?.name || ''}`, 'info');
            this.onUpdate();
        }
    }

    // Get phase text
    getPhaseText() {
        const step = this.getCurrentStep();
        if (!step) return 'ดราฟเสร็จสิ้น';
        
        const isBanPhase1 = this.state.currentStep < 4;
        const isPickPhase1 = this.state.currentStep >= 4 && this.state.currentStep < 8;
        const isBanPhase2 = this.state.currentStep >= 8 && this.state.currentStep < 12;
        const isPickPhase2 = this.state.currentStep >= 12;
        
        if (isBanPhase1) return 'Ban Phase 1';
        if (isPickPhase1) return 'Pick Phase 1';
        if (isBanPhase2) return 'Ban Phase 2';
        if (isPickPhase2) return 'Pick Phase 2';
        return 'Draft';
    }

    // Get action hint
    getActionHint() {
        const step = this.getCurrentStep();
        if (!step) return 'ดราฟเสร็จสิ้น';
        
        const type = step.type === 'ban' ? 'แบน' : 'เลือก';
        return `${type} ${step.count} ตัว`;
    }

    // Get team text
    getTeamText() {
        const step = this.getCurrentStep();
        if (!step) return '-';
        return step.team === 'blue' ? 'First Pick' : 'Second Pick';
    }

    // Get draft data for saving
    getDraftData() {
        return {
            bo: this.bo,
            matchId: this.matchId,
            games: this.games.map(game => ({
                gameNumber: game.gameNumber,
                myPicks: game.blue.picks,
                myBans: game.blue.bans,
                opponentPicks: game.red.picks,
                opponentBans: game.red.bans
            })),
            currentGame: this.currentGame,
            isComplete: this.isMatchComplete()
        };
    }

    // Get sequence for UI indicator
    getSequence() {
        return DRAFT_SEQUENCE.map((step, index) => ({
            ...step,
            index,
            isActive: index === this.state.currentStep,
            isCompleted: index < this.state.currentStep
        }));
    }
}
