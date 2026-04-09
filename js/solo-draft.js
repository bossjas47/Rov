// ROV Draft Pro - Solo Draft (Practice Mode)

// Heroes Data (127 heroes)
const heroesData = [
    { id: 1, name: "Valhein", role: "marksman", imageFile: "valhein.png" },
    { id: 2, name: "Zanis", role: "fighter", imageFile: "zanis.png" },
    { id: 3, name: "Yorn", role: "marksman", imageFile: "yorn.png" },
    { id: 4, name: "Thane", role: "tank", imageFile: "thane.png" },
    { id: 5, name: "Krixi", role: "mage", imageFile: "krixi.png" },
    { id: 6, name: "Ormarr", role: "fighter", imageFile: "ormarr.png" },
    { id: 7, name: "Zephys", role: "assassin", imageFile: "zephys.png" },
    { id: 8, name: "Lu Bu", role: "fighter", imageFile: "lu_bu.png" },
    { id: 9, name: "Alice", role: "support", imageFile: "alice.png" },
    { id: 10, name: "Mganga", role: "mage", imageFile: "mganga.png" },
    { id: 11, name: "Gildur", role: "tank", imageFile: "gildur.png" },
    { id: 12, name: "Butterfly", role: "assassin", imageFile: "butterfly.png" },
    { id: 13, name: "Taara", role: "tank", imageFile: "taara.png" },
    { id: 14, name: "Veera", role: "mage", imageFile: "veera.png" },
    { id: 15, name: "Azzen'Ka", role: "mage", imageFile: "azzen_ka.png" },
    { id: 16, name: "Mina", role: "tank", imageFile: "mina.png" },
    { id: 17, name: "Toro", role: "tank", imageFile: "toro.png" },
    { id: 18, name: "Violet", role: "marksman", imageFile: "violet.png" },
    { id: 19, name: "Chaugnar", role: "support", imageFile: "chaugnar.png" },
    { id: 20, name: "Kriknak", role: "assassin", imageFile: "kriknak.png" },
    { id: 21, name: "Omega", role: "tank", imageFile: "omega.png" },
    { id: 22, name: "Kahlii", role: "mage", imageFile: "kahlii.png" },
    { id: 23, name: "Skud", role: "fighter", imageFile: "skud.png" },
    { id: 24, name: "Ignis", role: "mage", imageFile: "ignis.png" },
    { id: 25, name: "Airi", role: "assassin", imageFile: "airi.png" },
    { id: 26, name: "Preyta", role: "mage", imageFile: "preyta.png" },
    { id: 27, name: "Slimz", role: "marksman", imageFile: "slimz.png" },
    { id: 28, name: "Arthur", role: "fighter", imageFile: "arthur.png" },
    { id: 29, name: "Jinnar", role: "mage", imageFile: "jinnar.png" },
    { id: 30, name: "Maloch", role: "fighter", imageFile: "maloch.png" },
    { id: 31, name: "Cresht", role: "support", imageFile: "cresht.png" },
    { id: 32, name: "Natalya", role: "mage", imageFile: "natalya.png" },
    { id: 33, name: "Peura", role: "support", imageFile: "peura.png" },
    { id: 34, name: "Lumburr", role: "support", imageFile: "lumburr.png" },
    { id: 35, name: "Aleister", role: "mage", imageFile: "aleister.png" },
    { id: 36, name: "Fennik", role: "marksman", imageFile: "fennik.png" },
    { id: 37, name: "Grakk", role: "support", imageFile: "grakk.png" },
    { id: 38, name: "Nakroth", role: "assassin", imageFile: "nakroth.png" },
    { id: 39, name: "Diao Chan", role: "mage", imageFile: "diao_chan.png" },
    { id: 40, name: "Lauriel", role: "mage", imageFile: "lauriel.png" },
    { id: 41, name: "Zill", role: "assassin", imageFile: "zill.png" },
    { id: 42, name: "Murad", role: "assassin", imageFile: "murad.png" },
    { id: 43, name: "Raz", role: "assassin", imageFile: "raz.png" },
    { id: 44, name: "Zuka", role: "fighter", imageFile: "zuka.png" },
    { id: 45, name: "Tel'Annas", role: "marksman", imageFile: "tel_annas.png" },
    { id: 46, name: "Kil'Groth", role: "fighter", imageFile: "kil_groth.png" },
    { id: 47, name: "Ryoma", role: "assassin", imageFile: "ryoma.png" },
    { id: 48, name: "Superman", role: "fighter", imageFile: "superman.png" },
    { id: 49, name: "Wonder Woman", role: "fighter", imageFile: "wonder_woman.png" },
    { id: 50, name: "Moren", role: "marksman", imageFile: "moren.png" },
    { id: 51, name: "Xeniel", role: "tank", imageFile: "xeniel.png" },
    { id: 52, name: "Lindis", role: "marksman", imageFile: "lindis.png" },
    { id: 53, name: "TeeMee", role: "support", imageFile: "teemee.png" },
    { id: 54, name: "Tulen", role: "mage", imageFile: "tulen.png" },
    { id: 55, name: "Omen", role: "fighter", imageFile: "omen.png" },
    { id: 56, name: "Max", role: "marksman", imageFile: "max.png" },
    { id: 57, name: "Liliana", role: "mage", imageFile: "liliana.png" },
    { id: 58, name: "Wisp", role: "marksman", imageFile: "wisp.png" },
    { id: 59, name: "The Flash", role: "assassin", imageFile: "the_flash.png" },
    { id: 60, name: "Arum", role: "support", imageFile: "arum.png" },
    { id: 61, name: "Rourke", role: "marksman", imageFile: "rourke.png" },
    { id: 62, name: "Marja", role: "mage", imageFile: "marja.png" },
    { id: 63, name: "Baldum", role: "tank", imageFile: "baldum.png" },
    { id: 64, name: "Roxie", role: "tank", imageFile: "roxie.png" },
    { id: 65, name: "Annette", role: "support", imageFile: "annette.png" },
    { id: 66, name: "Amily", role: "fighter", imageFile: "amily.png" },
    { id: 67, name: "Y'bneth", role: "tank", imageFile: "y_bneth.png" },
    { id: 68, name: "Elsu", role: "marksman", imageFile: "elsu.png" },
    { id: 69, name: "Riktor", role: "fighter", imageFile: "riktor.png" },
    { id: 70, name: "Wiro", role: "tank", imageFile: "wiro.png" },
    { id: 71, name: "Quillen", role: "assassin", imageFile: "quillen.png" },
    { id: 72, name: "Florentino", role: "fighter", imageFile: "florentino.png" },
    { id: 73, name: "Sephera", role: "support", imageFile: "sephera.png" },
    { id: 74, name: "D'Arcy", role: "mage", imageFile: "darcy.png" },
    { id: 75, name: "Veres", role: "fighter", imageFile: "veres.png" },
    { id: 76, name: "Hayate", role: "marksman", imageFile: "hayate.png" },
    { id: 77, name: "Capheny", role: "marksman", imageFile: "capheny.png" },
    { id: 78, name: "Errol", role: "fighter", imageFile: "errol.png" },
    { id: 79, name: "Yena", role: "fighter", imageFile: "yena.png" },
    { id: 80, name: "Enzo", role: "assassin", imageFile: "enzo.png" },
    { id: 81, name: "Zip", role: "support", imageFile: "zip.png" },
    { id: 82, name: "Qi", role: "fighter", imageFile: "qi.png" },
    { id: 83, name: "Celica", role: "marksman", imageFile: "celica.png" },
    { id: 84, name: "Volkath", role: "fighter", imageFile: "volkath.png" },
    { id: 85, name: "Krizzix", role: "support", imageFile: "krizzix.png" },
    { id: 86, name: "Eland'orr", role: "marksman", imageFile: "elandorr.png" },
    { id: 87, name: "Ishar", role: "mage", imageFile: "ishar.png" },
    { id: 88, name: "Dirak", role: "mage", imageFile: "dirak.png" },
    { id: 89, name: "Keera", role: "assassin", imageFile: "keera.png" },
    { id: 90, name: "Ata", role: "tank", imageFile: "ata.png" },
    { id: 91, name: "Paine", role: "assassin", imageFile: "paine.png" },
    { id: 92, name: "Laville", role: "marksman", imageFile: "laville.png" },
    { id: 93, name: "Rouie", role: "support", imageFile: "rouie.png" },
    { id: 94, name: "Zata", role: "mage", imageFile: "zata.png" },
    { id: 95, name: "Allain", role: "fighter", imageFile: "allain.png" },
    { id: 96, name: "Thorne", role: "marksman", imageFile: "thorne.png" },
    { id: 97, name: "Sinestrea", role: "assassin", imageFile: "sinestrea.png" },
    { id: 98, name: "Dextra", role: "fighter", imageFile: "dextra.png" },
    { id: 99, name: "Lorion", role: "mage", imageFile: "lorion.png" },
    { id: 100, name: "Bright", role: "assassin", imageFile: "bright.png" },
    { id: 101, name: "Aoi", role: "assassin", imageFile: "aoi.png" },
    { id: 102, name: "Iggy", role: "mage", imageFile: "iggy.png" },
    { id: 103, name: "Tachi", role: "fighter", imageFile: "tachi.png" },
    { id: 104, name: "Aya", role: "support", imageFile: "aya.png" },
    { id: 105, name: "Yue", role: "mage", imageFile: "yue.png" },
    { id: 106, name: "Yan", role: "fighter", imageFile: "yan.png" },
    { id: 107, name: "Helen", role: "support", imageFile: "helen.png" },
    { id: 108, name: "Teeri", role: "marksman", imageFile: "teeri.png" },
    { id: 109, name: "Bonnie", role: "marksman", imageFile: "bonnie.png" },
    { id: 110, name: "Bijan", role: "assassin", imageFile: "bijan.png" },
    { id: 111, name: "Kaine", role: "assassin", imageFile: "kaine.png" },
    { id: 112, name: "Stuart", role: "marksman", imageFile: "stuart.png" },
    { id: 113, name: "Ming", role: "mage", imageFile: "ming.png" },
    { id: 114, name: "Erin", role: "marksman", imageFile: "erin.png" },
    { id: 115, name: "Charlotte", role: "fighter", imageFile: "charlotte.png" },
    { id: 116, name: "Dolia", role: "support", imageFile: "dolia.png" },
    { id: 117, name: "Biron", role: "fighter", imageFile: "biron.png" },
    { id: 118, name: "Bolt Baron", role: "marksman", imageFile: "bolt_baron.png" },
    { id: 119, name: "Billow", role: "assassin", imageFile: "billow.png" },
    { id: 120, name: "Heino", role: "mage", imageFile: "heino.png" },
    { id: 121, name: "Goverra", role: "tank", imageFile: "goverra.png" },
    { id: 122, name: "Edras", role: "marksman", imageFile: "edras.png" },
    { id: 123, name: "Dyadia", role: "mage", imageFile: "dyadia.png" },
    { id: 124, name: "Arduin", role: "tank", imageFile: "arduin.png" },
    { id: 125, name: "Astrid", role: "fighter", imageFile: "astrid.png" },
    { id: 126, name: "Brunhilda", role: "marksman", imageFile: "brunhilda.png" },
    { id: 127, name: "Flowborn", role: "marksman", imageFile: "flowborn.png" }
];

// META Heroes (Top 30 from RPL Summer 2026)
const metaHeroIds = [17, 62, 76, 103, 67, 86, 82, 116, 102, 112, 119, 99, 94, 122, 36, 58, 93, 77, 7, 13, 53, 79, 57, 89, 97, 10, 23, 1, 117, 47];

// Draft Sequence (20 steps)
const DRAFT_SEQUENCE = [
    { type: 'ban', team: 'blue' }, { type: 'ban', team: 'red' },
    { type: 'ban', team: 'blue' }, { type: 'ban', team: 'red' },
    { type: 'pick', team: 'blue' }, { type: 'pick', team: 'red' },
    { type: 'pick', team: 'red' }, { type: 'pick', team: 'blue' },
    { type: 'pick', team: 'blue' }, { type: 'pick', team: 'red' },
    { type: 'ban', team: 'red' }, { type: 'ban', team: 'blue' },
    { type: 'ban', team: 'red' }, { type: 'ban', team: 'blue' },
    { type: 'pick', team: 'red' }, { type: 'pick', team: 'blue' },
    { type: 'pick', team: 'blue' }, { type: 'pick', team: 'red' },
    { type: 'pick', team: 'red' }, { type: 'pick', team: 'blue' },
];

// State
let draftState = {
    bo: 3,
    gameNumber: 1,
    currentStep: 0,
    currentTeam: 'blue',
    blue: { bans: [], picks: [] },
    red: { bans: [], picks: [] },
    usedHeroes: [],
    history: []
};

let selectedHeroId = null;
let currentFilter = 'all';

// Toast
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    const colors = {
        success: 'from-green-500 to-emerald-600',
        error: 'from-red-500 to-rose-600',
        warning: 'from-yellow-500 to-orange-600',
        info: 'from-blue-500 to-indigo-600'
    };
    toast.className = `min-w-[280px] p-4 rounded-xl shadow-xl flex items-center gap-3 bg-gradient-to-r ${colors[type]} text-white`;
    toast.innerHTML = `
        <span class="flex-1">${message}</span>
        <button onclick="this.parentElement.remove()" class="opacity-60 hover:opacity-100">✕</button>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Initialize
function init() {
    renderHeroes();
    updateUI();
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Switch Team
function switchTeam(team) {
    draftState.currentTeam = team;
    
    // Update buttons
    document.getElementById('blueTeamBtn').classList.toggle('active', team === 'blue');
    document.getElementById('blueTeamBtn').classList.toggle('opacity-50', team !== 'blue');
    document.getElementById('redTeamBtn').classList.toggle('active', team === 'red');
    document.getElementById('redTeamBtn').classList.toggle('opacity-50', team !== 'red');
    
    // Update indicators
    document.getElementById('blueTurnIndicator').classList.toggle('hidden', team !== 'blue');
    document.getElementById('redTurnIndicator').classList.toggle('hidden', team !== 'red');
    
    // Update action text
    const step = DRAFT_SEQUENCE[draftState.currentStep];
    if (step) {
        document.getElementById('actionDisplay').textContent = `Select a hero to ${step.type.toUpperCase()} for ${team.toUpperCase()}`;
    }
    
    updateUI();
}

// Change BO
function changeBO() {
    draftState.bo = parseInt(document.getElementById('boSelector').value);
    showToast(`Changed to BO${draftState.bo}`, 'info');
}

// Reset Draft
function resetDraft() {
    if (!confirm('Reset current draft?')) return;
    
    draftState = {
        bo: draftState.bo,
        gameNumber: 1,
        currentStep: 0,
        currentTeam: 'blue',
        blue: { bans: [], picks: [] },
        red: { bans: [], picks: [] },
        usedHeroes: [],
        history: []
    };
    
    selectedHeroId = null;
    document.getElementById('confirmPanel').classList.add('hidden');
    document.getElementById('completeModal').classList.add('hidden');
    
    switchTeam('blue');
    renderHeroes();
    updateUI();
    showToast('Draft reset!', 'success');
}

// Update UI
function updateUI() {
    // Update slots
    updateSlots('blue', draftState.blue);
    updateSlots('red', draftState.red);
    
    // Highlight active team section
    document.getElementById('blueTeamSection').classList.toggle('ring-2', draftState.currentTeam === 'blue');
    document.getElementById('blueTeamSection').classList.toggle('ring-blue-500', draftState.currentTeam === 'blue');
    document.getElementById('redTeamSection').classList.toggle('ring-2', draftState.currentTeam === 'red');
    document.getElementById('redTeamSection').classList.toggle('ring-red-500', draftState.currentTeam === 'red');
    
    // Update phase display
    const step = draftState.currentStep;
    let phaseText = '';
    let actionText = '';
    
    if (step < 4) {
        phaseText = 'BAN PHASE 1';
        actionText = `Select a hero to BAN for ${draftState.currentTeam.toUpperCase()}`;
    } else if (step < 10) {
        phaseText = 'PICK PHASE 1';
        actionText = `Select a hero to PICK for ${draftState.currentTeam.toUpperCase()}`;
    } else if (step < 14) {
        phaseText = 'BAN PHASE 2';
        actionText = `Select a hero to BAN for ${draftState.currentTeam.toUpperCase()}`;
    } else if (step < 20) {
        phaseText = 'PICK PHASE 2';
        actionText = `Select a hero to PICK for ${draftState.currentTeam.toUpperCase()}`;
    } else {
        phaseText = 'DRAFT COMPLETE';
        actionText = 'Draft finished!';
    }
    
    document.getElementById('phaseDisplay').textContent = phaseText;
    document.getElementById('actionDisplay').textContent = actionText;
    
    // Update summary
    updateSummary();
}

function updateSlots(team, data) {
    // Update bans
    for (let i = 0; i < 4; i++) {
        const slot = document.querySelector(`.ban-slot[data-team="${team}"][data-slot="ban-${i}"]`);
        if (data.bans[i]) {
            const hero = heroesData.find(h => h.id === data.bans[i]);
            slot.className = 'ban-slot slot-filled rounded-lg overflow-hidden border-red-500';
            slot.innerHTML = `<img src="rovhero/${hero.imageFile}" class="w-full h-full object-cover opacity-50 grayscale" alt="${hero.name}">`;
        } else {
            slot.className = 'ban-slot slot-empty rounded-lg flex items-center justify-center text-gray-600 font-bold';
            slot.innerHTML = i + 1;
        }
    }
    
    // Update picks
    for (let i = 0; i < 5; i++) {
        const slot = document.querySelector(`.pick-slot[data-team="${team}"][data-slot="pick-${i}"]`);
        if (data.picks[i]) {
            const hero = heroesData.find(h => h.id === data.picks[i]);
            slot.className = `pick-slot slot-filled rounded-lg overflow-hidden border-${team === 'blue' ? 'blue' : 'red'}-500`;
            slot.innerHTML = `<img src="rovhero/${hero.imageFile}" class="w-full h-full object-cover" alt="${hero.name}">`;
        } else {
            slot.className = 'pick-slot slot-empty rounded-lg flex items-center justify-center text-gray-600 font-bold text-sm';
            slot.innerHTML = i + 1;
        }
    }
    
    // Update counts
    const banLabels = document.querySelectorAll(`#${team}TeamSection .text-xs`);
    if (banLabels[0]) banLabels[0].textContent = `BANS (${data.bans.length}/4)`;
    if (banLabels[1]) banLabels[1].textContent = `PICKS (${data.picks.length}/5)`;
}

function updateSummary() {
    const summary = document.getElementById('draftSummary');
    
    if (draftState.history.length === 0) {
        summary.innerHTML = '<p>No actions yet. Start drafting!</p>';
        return;
    }
    
    summary.innerHTML = draftState.history.map((action, i) => {
        const hero = heroesData.find(h => h.id === action.heroId);
        const teamColor = action.team === 'blue' ? 'text-blue-400' : 'text-red-400';
        return `<div class="mb-1"><span class="text-gray-500">${i + 1}.</span> <span class="${teamColor}">${action.team.toUpperCase()}</span> ${action.type === 'ban' ? 'banned' : 'picked'} <span class="text-white">${hero.name}</span></div>`;
    }).join('');
}

// Render Heroes
function renderHeroes() {
    const grid = document.getElementById('heroesGrid');
    let filtered = heroesData;
    
    if (currentFilter === 'meta') {
        filtered = heroesData.filter(h => metaHeroIds.includes(h.id));
    } else if (currentFilter !== 'all') {
        filtered = heroesData.filter(h => h.role === currentFilter);
    }
    
    grid.innerHTML = filtered.map(hero => {
        const isUsed = draftState.usedHeroes.includes(hero.id);
        const isSelected = selectedHeroId === hero.id;
        const bluePicked = draftState.blue.picks.includes(hero.id);
        const redPicked = draftState.red.picks.includes(hero.id);
        
        let className = 'hero-card relative rounded-lg overflow-hidden';
        if (isUsed) className += ' banned';
        else if (bluePicked) className += ' picked-blue';
        else if (redPicked) className += ' picked-red';
        else if (isSelected) className += ' selected';
        
        return `
            <div class="${className}" onclick="selectHero(${hero.id})" title="${hero.name}">
                <img src="rovhero/${hero.imageFile}" class="w-full aspect-square object-cover" alt="${hero.name}" onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, #667eea, #764ba2)'; this.parentElement.innerHTML='<span class=\\'absolute inset-0 flex items-center justify-center text-white font-bold text-xs\\'>${hero.name.substring(0, 3)}</span>';">
                ${isSelected ? '<div class="absolute inset-0 bg-yellow-500/30 flex items-center justify-center"><i data-lucide="check" class="w-6 h-6 text-yellow-400"></i></div>' : ''}
            </div>
        `;
    }).join('');
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Filter Heroes
function filterHeroes(role) {
    currentFilter = role;
    document.querySelectorAll('.role-filter').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.role === role) {
            btn.classList.add('active');
        }
    });
    renderHeroes();
}

// Select Hero
function selectHero(heroId) {
    if (draftState.currentStep >= 20) return;
    if (draftState.usedHeroes.includes(heroId)) return;
    
    selectedHeroId = heroId;
    const hero = heroesData.find(h => h.id === heroId);
    document.getElementById('selectedHeroName').textContent = hero.name;
    document.getElementById('confirmPanel').classList.remove('hidden');
    renderHeroes();
}

// Cancel Selection
function cancelSelection() {
    selectedHeroId = null;
    document.getElementById('confirmPanel').classList.add('hidden');
    renderHeroes();
}

// Confirm Selection
function confirmSelection() {
    if (!selectedHeroId) return;
    if (draftState.currentStep >= 20) return;
    
    const step = DRAFT_SEQUENCE[draftState.currentStep];
    const team = draftState.currentTeam;
    const teamData = draftState[team];
    
    // Check if slot available
    const maxSlots = step.type === 'ban' ? 4 : 5;
    const currentSlots = step.type === 'ban' ? teamData.bans.length : teamData.picks.length;
    if (currentSlots >= maxSlots) {
        showToast('All slots filled!', 'error');
        return;
    }
    
    // Add to draft
    teamData[step.type === 'ban' ? 'bans' : 'picks'].push(selectedHeroId);
    draftState.usedHeroes.push(selectedHeroId);
    
    // Add to history
    draftState.history.push({
        step: draftState.currentStep,
        team: team,
        type: step.type,
        heroId: selectedHeroId
    });
    
    // Move to next step
    draftState.currentStep++;
    
    // Auto switch team for next action
    if (draftState.currentStep < 20) {
        const nextStep = DRAFT_SEQUENCE[draftState.currentStep];
        switchTeam(nextStep.team);
    } else {
        // Draft complete
        showComplete();
    }
    
    selectedHeroId = null;
    document.getElementById('confirmPanel').classList.add('hidden');
    
    const hero = heroesData.find(h => h.id === selectedHeroId);
    showToast(`${step.type === 'ban' ? 'Banned' : 'Picked'} ${hero.name}!`, 'success');
    
    renderHeroes();
    updateUI();
}

// Show Complete Modal
function showComplete() {
    document.getElementById('completeModal').classList.remove('hidden');
    
    // Show next game button if BO3/BO5/BO7
    if (draftState.gameNumber < draftState.bo) {
        document.getElementById('nextGameSection').classList.remove('hidden');
    } else {
        document.getElementById('nextGameSection').classList.add('hidden');
    }
}

// Next Game
function nextGame() {
    draftState.gameNumber++;
    draftState.currentStep = 0;
    draftState.blue = { bans: [], picks: [] };
    draftState.red = { bans: [], picks: [] };
    draftState.usedHeroes = [];
    draftState.history = [];
    
    selectedHeroId = null;
    document.getElementById('confirmPanel').classList.add('hidden');
    document.getElementById('completeModal').classList.add('hidden');
    
    switchTeam('blue');
    renderHeroes();
    updateUI();
    showToast(`Game ${draftState.gameNumber} started!`, 'success');
}

// Back to Lobby
function backToLobby() {
    window.location.href = 'index.html';
}

// Init on load
document.addEventListener('DOMContentLoaded', init);
