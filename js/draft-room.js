// ROV Draft Pro - Draft Room (PVP)

const firebaseConfig = {
    apiKey: "AIzaSyC450kePwL6FdVXUSVli0bEP3DdnQs0qzU",
    authDomain: "psl-esport.firebaseapp.com",
    projectId: "psl-esport",
    storageBucket: "psl-esport.firebasestorage.app",
    messagingSenderId: "225108570173",
    appId: "1:225108570173:web:b6483c02368908f3783a54"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

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
let currentUser = null;
let roomCode = null;
let draftData = null;
let myTeam = null;
let isSpectator = false;
let unsubscribe = null;
let timerInterval = null;
let selectedHeroId = null;
let currentFilter = 'all';

// Get room code
const urlParams = new URLSearchParams(window.location.search);
roomCode = urlParams.get('room');

if (!roomCode) {
    window.location.href = 'index.html';
}

document.getElementById('roomCode').textContent = roomCode;

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

// Auth
auth.onAuthStateChanged(user => {
    currentUser = user;
    if (!user) {
        // Allow spectator mode
        isSpectator = true;
    }
    subscribeToDraft();
});

// Subscribe to draft
function subscribeToDraft() {
    unsubscribe = db.collection('drafts').doc(roomCode).onSnapshot(doc => {
        if (!doc.exists) {
            showToast('Draft not found', 'error');
            setTimeout(() => window.location.href = 'index.html', 2000);
            return;
        }

        draftData = doc.data();

        // Determine my team
        if (!isSpectator) {
            if (draftData.blue.userId === currentUser?.uid) {
                myTeam = 'blue';
            } else if (draftData.red.userId === currentUser?.uid) {
                myTeam = 'red';
            } else {
                isSpectator = true;
            }
        }

        // Update UI
        updateUI();
        renderHeroes();
        updateChat();
        updateSpectators();

        // Start timer if my turn
        if (!isSpectator && draftData.currentTeam === myTeam && draftData.status === 'drafting') {
            startTimer();
        } else {
            stopTimer();
        }

        // Check if draft complete
        if (draftData.status === 'finished') {
            showResult();
        }
    }, error => {
        console.error('Draft error:', error);
        showToast('Error connecting to draft', 'error');
    });
}

function updateUI() {
    // Update player names
    document.getElementById('bluePlayerName').textContent = draftData.blue.name;
    document.getElementById('redPlayerName').textContent = draftData.red.name;

    // Update game info
    document.getElementById('gameNumber').textContent = draftData.gameNumber;
    document.getElementById('boTotal').textContent = draftData.bo;

    // Update turn indicator
    const currentTurn = document.getElementById('currentTurn');
    currentTurn.textContent = draftData.currentTeam.toUpperCase();
    currentTurn.className = `font-bold ml-2 ${draftData.currentTeam === 'blue' ? 'text-blue-400' : 'text-red-400'}`;

    // Show/hide turn indicators
    document.getElementById('blueTurnIndicator').classList.toggle('hidden', draftData.currentTeam !== 'blue' || isSpectator);
    document.getElementById('redTurnIndicator').classList.toggle('hidden', draftData.currentTeam !== 'red' || isSpectator);

    // Highlight active team section
    document.getElementById('blueTeamSection').classList.toggle('ring-2', draftData.currentTeam === 'blue');
    document.getElementById('blueTeamSection').classList.toggle('ring-blue-500', draftData.currentTeam === 'blue');
    document.getElementById('redTeamSection').classList.toggle('ring-2', draftData.currentTeam === 'red');
    document.getElementById('redTeamSection').classList.toggle('ring-red-500', draftData.currentTeam === 'red');

    // Update phase display
    const step = draftData.currentStep;
    let phaseText = '';
    let actionText = '';

    if (step < 4) {
        phaseText = 'BAN PHASE 1';
        actionText = 'Select a hero to BAN';
    } else if (step < 10) {
        phaseText = 'PICK PHASE 1';
        actionText = 'Select a hero to PICK';
    } else if (step < 14) {
        phaseText = 'BAN PHASE 2';
        actionText = 'Select a hero to BAN';
    } else if (step < 20) {
        phaseText = 'PICK PHASE 2';
        actionText = 'Select a hero to PICK';
    } else {
        phaseText = 'DRAFT COMPLETE';
        actionText = 'Waiting for result...';
    }

    document.getElementById('phaseDisplay').textContent = phaseText;
    document.getElementById('actionDisplay').textContent = actionText;

    // Update slots
    updateSlots('blue', draftData.blue);
    updateSlots('red', draftData.red);
}

function updateSlots(team, data) {
    // Update bans
    for (let i = 0; i < 4; i++) {
        const slot = document.querySelector(`#${team}TeamSection .ban-slot[data-slot="ban-${i}"]`);
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
        const slot = document.querySelector(`#${team}TeamSection .pick-slot[data-slot="pick-${i}"]`);
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
    const banText = document.querySelector(`#${team}TeamSection .text-xs:first-of-type`);
    if (banText) banText.textContent = `BANS (${data.bans.length}/4)`;

    const pickText = document.querySelectorAll(`#${team}TeamSection .text-xs`)[1];
    if (pickText) pickText.textContent = `PICKS (${data.picks.length}/5)`;
}

function renderHeroes() {
    const grid = document.getElementById('heroesGrid');
    let filtered = heroesData;

    if (currentFilter === 'meta') {
        filtered = heroesData.filter(h => metaHeroIds.includes(h.id));
    } else if (currentFilter !== 'all') {
        filtered = heroesData.filter(h => h.role === currentFilter);
    }

    grid.innerHTML = filtered.map(hero => {
        const isUsed = draftData.usedHeroes.includes(hero.id);
        const isSelected = selectedHeroId === hero.id;
        const bluePicked = draftData.blue.picks.includes(hero.id);
        const redPicked = draftData.red.picks.includes(hero.id);

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

function selectHero(heroId) {
    if (isSpectator) return;
    if (draftData.currentTeam !== myTeam) return;
    if (draftData.usedHeroes.includes(heroId)) return;

    selectedHeroId = heroId;
    const hero = heroesData.find(h => h.id === heroId);
    document.getElementById('selectedHeroName').textContent = hero.name;
    document.getElementById('confirmPanel').classList.remove('hidden');
    renderHeroes();
}

function cancelSelection() {
    selectedHeroId = null;
    document.getElementById('confirmPanel').classList.add('hidden');
    renderHeroes();
}

async function confirmSelection() {
    if (!selectedHeroId || isSpectator) return;
    if (draftData.currentTeam !== myTeam) return;

    const step = DRAFT_SEQUENCE[draftData.currentStep];
    const teamData = draftData[myTeam];

    // Check if slot available
    const maxSlots = step.type === 'ban' ? 4 : 5;
    const currentSlots = step.type === 'ban' ? teamData.bans.length : teamData.picks.length;
    if (currentSlots >= maxSlots) {
        showToast('All slots filled!', 'error');
        return;
    }

    try {
        const update = {};
        update[`${myTeam}.${step.type}s`] = firebase.firestore.FieldValue.arrayUnion(selectedHeroId);
        update.usedHeroes = firebase.firestore.FieldValue.arrayUnion(selectedHeroId);
        update.currentStep = draftData.currentStep + 1;

        // Switch team
        if (draftData.currentStep + 1 < 20) {
            update.currentTeam = DRAFT_SEQUENCE[draftData.currentStep + 1].team;
        } else {
            update.status = 'finished';
        }

        update.timeLeft = 60;

        await db.collection('drafts').doc(roomCode).update(update);

        selectedHeroId = null;
        document.getElementById('confirmPanel').classList.add('hidden');
        showToast(`${step.type === 'ban' ? 'Banned' : 'Picked'} ${heroesData.find(h => h.id === selectedHeroId)?.name}!`, 'success');
    } catch (error) {
        showToast('Error: ' + error.message, 'error');
    }
}

// Timer
function startTimer() {
    stopTimer();
    let timeLeft = draftData.timeLeft || 60;

    timerInterval = setInterval(async () => {
        timeLeft--;

        document.getElementById('timerDisplay').textContent = timeLeft;
        document.getElementById('timerBar').style.width = `${(timeLeft / 60) * 100}%`;

        if (timeLeft <= 0) {
            // Auto pick/ban random
            const availableHeroes = heroesData.filter(h => !draftData.usedHeroes.includes(h.id));
            if (availableHeroes.length > 0) {
                const randomHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)];
                selectedHeroId = randomHero.id;
                await confirmSelection();
            }
        } else if (timeLeft % 5 === 0) {
            // Update timer in DB every 5 seconds
            await db.collection('drafts').doc(roomCode).update({ timeLeft });
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Chat
async function sendChat() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;

    const userName = isSpectator ? 'Spectator' : (myTeam === 'blue' ? draftData.blue.name : draftData.red.name);

    try {
        await db.collection('drafts').doc(roomCode).update({
            chat: firebase.firestore.FieldValue.arrayUnion({
                user: userName,
                message: message,
                time: Date.now(),
                team: isSpectator ? 'spec' : myTeam
            })
        });
        input.value = '';
    } catch (error) {
        showToast('Error sending message', 'error');
    }
}

function updateChat() {
    const container = document.getElementById('chatMessages');
    if (!draftData.chat || draftData.chat.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">No messages</p>';
        return;
    }

    container.innerHTML = draftData.chat.slice(-20).map(msg => {
        const color = msg.team === 'blue' ? 'text-blue-400' : msg.team === 'red' ? 'text-red-400' : 'text-purple-400';
        return `
            <div class="chat-message">
                <span class="font-medium ${color}">${msg.user}:</span>
                <span class="text-gray-300">${msg.message}</span>
            </div>
        `;
    }).join('');
    container.scrollTop = container.scrollHeight;
}

// Spectators
function updateSpectators() {
    const container = document.getElementById('spectatorsList');
    if (!draftData.spectators || draftData.spectators.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-sm">No spectators</p>';
        return;
    }

    container.innerHTML = draftData.spectators.map(spec => `
        <div class="flex items-center gap-2 text-sm">
            <i data-lucide="eye" class="w-3 h-3 text-purple-400"></i>
            <span class="text-gray-300">${spec.name}</span>
        </div>
    `).join('');

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Result
function showResult() {
    stopTimer();
    const modal = document.getElementById('resultModal');
    modal.classList.remove('hidden');

    // Show next game button if BO3/BO5/BO7
    if (draftData.gameNumber < draftData.bo) {
        document.getElementById('nextGameSection').classList.remove('hidden');
    }
}

async function nextGame() {
    try {
        // Create new game draft
        await db.collection('drafts').doc(roomCode).update({
            gameNumber: draftData.gameNumber + 1,
            currentStep: 0,
            currentTeam: draftData.currentTeam === 'blue' ? 'red' : 'blue', // Alternate first pick
            timeLeft: 60,
            phase: 'ban1',
            'blue.bans': [],
            'blue.picks': [],
            'red.bans': [],
            'red.picks': [],
            status: 'drafting'
        });

        document.getElementById('resultModal').classList.add('hidden');
    } catch (error) {
        showToast('Error starting next game', 'error');
    }
}

function backToLobby() {
    if (unsubscribe) unsubscribe();
    stopTimer();
    window.location.href = 'index.html';
}

// Cleanup
window.addEventListener('beforeunload', () => {
    if (unsubscribe) unsubscribe();
    stopTimer();
});

// Init
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
renderHeroes();
