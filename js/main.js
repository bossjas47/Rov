// Main JavaScript - Solo Draft Mode
// Using traditional JS (no ES6 modules) for file:// protocol compatibility

// ============================================
// FIREBASE CONFIGURATION
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyB0jGqS53Q4zF6E1K8vY9L2QcX7R5T3W1Q",
    authDomain: "rov-draft-simulator.firebaseapp.com",
    projectId: "rov-draft-simulator",
    storageBucket: "rov-draft-simulator.firebasestorage.app",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abc123def456ghi789jkl"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();

// ============================================
// HEROES DATA (127 Heroes)
// ============================================
const HEROES = [
    { id: 1, name: "Thane", role: "tank" }, { id: 2, name: "Veera", role: "mage" },
    { id: 3, name: "Lumburr", role: "tank" }, { id: 4, name: "Krixi", role: "mage" },
    { id: 5, name: "Omega", role: "tank" }, { id: 6, name: "Kahlii", role: "mage" },
    { id: 7, name: "Toro", role: "tank" }, { id: 8, name: "Natalya", role: "mage" },
    { id: 9, name: "Grakk", role: "tank" }, { id: 10, name: "Ilumia", role: "mage" },
    { id: 11, name: "Chaugnar", role: "tank" }, { id: 12, name: "Jinnar", role: "mage" },
    { id: 13, name: "Ormarr", role: "tank" }, { id: 14, name: "Preyta", role: "mage" },
    { id: 15, name: "Gildur", role: "tank" }, { id: 16, name: "Lauriel", role: "mage" },
    { id: 17, name: "Xeniel", role: "tank" }, { id: 18, name: "Diao Chan", role: "mage" },
    { id: 19, name: "Alice", role: "support" }, { id: 20, name: "Azzen'Ka", role: "mage" },
    { id: 21, name: "Mganga", role: "support" }, { id: 22, name: "Zill", role: "mage" },
    { id: 23, name: "Peura", role: "support" }, { id: 24, name: "Raz", role: "mage" },
    { id: 25, name: "Payna", role: "support" }, { id: 26, name: "Liliana", role: "mage" },
    { id: 27, name: "Annette", role: "support" }, { id: 28, name: "Ishar", role: "mage" },
    { id: 29, name: "Teeri", role: "support" }, { id: 30, name: "Dirak", role: "mage" },
    { id: 31, name: "Tulen", role: "mage" }, { id: 32, name: "Valhein", role: "marksman" },
    { id: 33, name: "Taara", role: "fighter" }, { id: 34, name: "Yorn", role: "marksman" },
    { id: 35, name: "Zanis", role: "fighter" }, { id: 36, name: "Slimz", role: "marksman" },
    { id: 37, name: "Lu Bu", role: "fighter" }, { id: 38, name: "Violet", role: "marksman" },
    { id: 39, name: "Zephys", role: "fighter" }, { id: 40, name: "Joker", role: "marksman" },
    { id: 41, name: "Ryoma", role: "fighter" }, { id: 42, name: "Tel'Annas", role: "marksman" },
    { id: 43, name: "Wonder Woman", role: "fighter" }, { id: 44, name: "Moren", role: "marksman" },
    { id: 45, name: "Omen", role: "fighter" }, { id: 46, name: "Lindis", role: "marksman" },
    { id: 47, name: "Astrid", role: "fighter" }, { id: 48, name: "Wisp", role: "marksman" },
    { id: 49, name: "Superman", role: "fighter" }, { id: 50, name: "Hayate", role: "marksman" },
    { id: 51, name: "Florentino", role: "fighter" }, { id: 52, name: "Capheny", role: "marksman" },
    { id: 53, name: "Riktor", role: "fighter" }, { id: 54, name: "Elsu", role: "marksman" },
    { id: 55, name: "Yena", role: "fighter" }, { id: 56, name: "Celica", role: "marksman" },
    { id: 57, name: "Briar", role: "fighter" }, { id: 58, name: "Thorne", role: "marksman" },
    { id: 59, name: "Allain", role: "fighter" }, { id: 60, name: "Keera", role: "assassin" },
    { id: 61, name: "Airi", role: "assassin" }, { id: 62, name: "Paine", role: "assassin" },
    { id: 63, name: "Nakroth", role: "assassin" }, { id: 64, name: "Kriknak", role: "assassin" },
    { id: 65, name: "Batman", role: "assassin" }, { id: 66, name: "Murad", role: "assassin" },
    { id: 67, name: "Zuka", role: "assassin" }, { id: 68, name: "Kilian", role: "assassin" },
    { id: 69, name: "Quillen", role: "assassin" }, { id: 70, name: "Enzo", role: "assassin" },
    { id: 71, name: "Dextra", role: "assassin" }, { id: 72, name: "Sinestrea", role: "assassin" },
    { id: 73, name: "Aoi", role: "assassin" }, { id: 74, name: "Bright", role: "assassin" },
    { id: 75, name: "Zata", role: "assassin" }, { id: 76, name: "Kaine", role: "assassin" },
    { id: 77, name: "Butterfly", role: "assassin" }, { id: 78, name: "Wukong", role: "assassin" },
    { id: 79, name: "Aleister", role: "mage" }, { id: 80, name: "Ignis", role: "mage" },
    { id: 81, name: "Arduin", role: "fighter" }, { id: 82, name: "Max", role: "tank" },
    { id: 83, name: "Rouie", role: "support" }, { id: 84, name: "Zip", role: "support" },
    { id: 85, name: "Krizzix", role: "support" }, { id: 86, name: "Y'bneth", role: "support" },
    { id: 87, name: "Helen", role: "support" }, { id: 88, name: "Aya", role: "support" },
    { id: 89, name: "Cresht", role: "support" }, { id: 90, name: "Arum", role: "tank" },
    { id: 91, name: "Mina", role: "tank" }, { id: 92, name: "Skud", role: "fighter" },
    { id: 93, name: "Kil'Groth", role: "fighter" }, { id: 94, name: "Errol", role: "fighter" },
    { id: 95, name: "Tachi", role: "fighter" }, { id: 96, name: "Veres", role: "fighter" },
    { id: 97, name: "Amily", role: "fighter" }, { id: 98, name: "Richter", role: "fighter" },
    { id: 99, name: "Qi", role: "fighter" }, { id: 100, name: "Bonnie", role: "fighter" },
    { id: 101, name: "Laville", role: "marksman" }, { id: 102, name: "Eland'orr", role: "marksman" },
    { id: 103, name: "Bright", role: "mage" }, { id: 104, name: "Dolia", role: "support" },
    { id: 105, name: "Slimz", role: "marksman" }, { id: 106, name: "Iggy", role: "mage" },
    { id: 107, name: "Nakroth", role: "assassin" }, { id: 108, name: "Zill", role: "assassin" },
    { id: 109, name: "Krixi", role: "mage" }, { id: 110, name: "Veera", role: "mage" },
    { id: 111, name: "Lauriel", role: "mage" }, { id: 112, name: "Natalya", role: "mage" },
    { id: 113, name: "Jinnar", role: "mage" }, { id: 114, name: "Preyta", role: "mage" },
    { id: 115, name: "Diao Chan", role: "mage" }, { id: 116, name: "Azzen'Ka", role: "mage" },
    { id: 117, name: "Kahlii", role: "mage" }, { id: 118, name: "Ilumia", role: "mage" },
    { id: 119, name: "Gildur", role: "mage" }, { id: 120, name: "Mganga", role: "mage" },
    { id: 121, name: "Raz", role: "mage" }, { id: 122, name: "Tulen", role: "mage" },
    { id: 123, name: "Liliana", role: "mage" }, { id: 124, name: "Ishar", role: "mage" },
    { id: 125, name: "Dirak", role: "mage" }, { id: 126, name: "Rouie", role: "support" },
    { id: 127, name: "Ata", role: "tank" }
];

// META Hero IDs (Top 30 from RPL Summer 2026)
const META_HERO_IDS = [1, 3, 7, 11, 15, 19, 23, 27, 31, 33, 37, 41, 45, 49, 53, 57, 60, 63, 67, 71, 75, 79, 83, 87, 91, 95, 99, 103, 107, 111];

// ============================================
// DRAFT SEQUENCE (Standard ROV Format)
// ============================================
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
    { type: 'pick', team: 'red' }, { type: 'pick', team: 'blue' }
];

// ============================================
// GLOBAL STATE
// ============================================
let currentUser = null;
let currentStep = 0;
let selectedHero = null;
let timerInterval = null;
let timeLeft = 30;
let currentFilter = 'all';
let boFormat = 1;

let draftState = {
    blueBans: [],
    redBans: [],
    bluePicks: [],
    redPicks: []
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    auth.onAuthStateChanged((user) => {
        currentUser = user;
    });
    
    renderHeroes();
    updateTurnDisplay();
    startTimer();
});

// ============================================
// HERO RENDERING
// ============================================

function renderHeroes() {
    const grid = document.getElementById('heroGrid');
    grid.innerHTML = '';
    
    let heroesToShow = HEROES;
    
    if (currentFilter === 'meta') {
        heroesToShow = HEROES.filter(h => META_HERO_IDS.includes(h.id));
    } else if (currentFilter !== 'all') {
        heroesToShow = HEROES.filter(h => h.role === currentFilter);
    }
    
    heroesToShow.forEach(hero => {
        const card = document.createElement('div');
        card.className = 'hero-card aspect-square rounded-lg bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20';
        card.dataset.heroId = hero.id;
        card.onclick = () => onHeroClick(hero.id);
        
        card.innerHTML = `
            <div class="text-center p-1">
                <div class="text-[10px] font-bold truncate">${hero.name}</div>
                <div class="text-[8px] text-white/50 uppercase">${hero.role}</div>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    document.getElementById('heroCount').textContent = heroesToShow.length;
    updateHeroStatus();
}

function filterHeroes(role) {
    currentFilter = role;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${role}"]`).classList.add('active');
    
    renderHeroes();
}

function searchHeroes(query) {
    const grid = document.getElementById('heroGrid');
    const cards = grid.querySelectorAll('.hero-card');
    
    cards.forEach(card => {
        const heroId = parseInt(card.dataset.heroId);
        const hero = HEROES.find(h => h.id === heroId);
        
        if (hero && hero.name.toLowerCase().includes(query.toLowerCase())) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function updateHeroStatus() {
    const unavailable = [...draftState.blueBans, ...draftState.redBans, ...draftState.bluePicks, ...draftState.redPicks];
    
    document.querySelectorAll('.hero-card').forEach(card => {
        const heroId = parseInt(card.dataset.heroId);
        card.classList.remove('banned', 'picked');
        
        if (draftState.blueBans.includes(heroId) || draftState.redBans.includes(heroId)) {
            card.classList.add('banned');
        } else if (draftState.bluePicks.includes(heroId) || draftState.redPicks.includes(heroId)) {
            card.classList.add('picked');
        }
    });
}

// ============================================
// DRAFT LOGIC
// ============================================

function onHeroClick(heroId) {
    if (currentStep >= DRAFT_SEQUENCE.length) return;
    
    const unavailable = [...draftState.blueBans, ...draftState.redBans, ...draftState.bluePicks, ...draftState.redPicks];
    
    if (unavailable.includes(heroId)) {
        showToast('Hero already banned or picked!', 'error');
        return;
    }
    
    selectedHero = heroId;
    showConfirmModal(heroId);
}

function showConfirmModal(heroId) {
    const hero = HEROES.find(h => h.id === heroId);
    const currentAction = DRAFT_SEQUENCE[currentStep];
    
    document.getElementById('confirmHeroDisplay').innerHTML = `
        <div class="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-3">
            <span class="text-2xl font-bold">${hero.name.slice(0, 2)}</span>
        </div>
        <div class="text-xl font-bold mb-1">${hero.name}</div>
        <div class="text-white/60 capitalize">${currentAction.type} as ${hero.role}</div>
    `;
    
    document.getElementById('confirmModal').classList.remove('hidden');
}

function cancelSelection() {
    selectedHero = null;
    document.getElementById('confirmModal').classList.add('hidden');
}

function confirmSelection() {
    if (!selectedHero || currentStep >= DRAFT_SEQUENCE.length) return;
    
    const currentAction = DRAFT_SEQUENCE[currentStep];
    
    if (currentAction.type === 'ban') {
        if (currentAction.team === 'blue') {
            draftState.blueBans.push(selectedHero);
        } else {
            draftState.redBans.push(selectedHero);
        }
    } else {
        if (currentAction.team === 'blue') {
            draftState.bluePicks.push(selectedHero);
        } else {
            draftState.redPicks.push(selectedHero);
        }
    }
    
    updateDraftDisplay();
    currentStep++;
    
    if (currentStep >= DRAFT_SEQUENCE.length) {
        stopTimer();
        showToast('Draft Complete!', 'success');
    } else {
        resetTimer();
        updateTurnDisplay();
    }
    
    selectedHero = null;
    document.getElementById('confirmModal').classList.add('hidden');
}

function updateDraftDisplay() {
    // Update Blue Bans
    draftState.blueBans.forEach((heroId, index) => {
        const slot = document.getElementById(`blueBan${index + 1}`);
        if (slot) {
            const hero = HEROES.find(h => h.id === heroId);
            slot.className = 'ban-slot filled aspect-square rounded-lg flex items-center justify-center';
            slot.innerHTML = `<span class="text-xs font-bold">${hero ? hero.name : '?'}</span>`;
        }
    });
    
    // Update Red Bans
    draftState.redBans.forEach((heroId, index) => {
        const slot = document.getElementById(`redBan${index + 1}`);
        if (slot) {
            const hero = HEROES.find(h => h.id === heroId);
            slot.className = 'ban-slot filled aspect-square rounded-lg flex items-center justify-center';
            slot.innerHTML = `<span class="text-xs font-bold">${hero ? hero.name : '?'}</span>`;
        }
    });
    
    // Update Blue Picks
    draftState.bluePicks.forEach((heroId, index) => {
        const slot = document.getElementById(`bluePick${index + 1}`);
        if (slot) {
            const hero = HEROES.find(h => h.id === heroId);
            slot.className = 'pick-slot filled rounded-lg p-2 flex items-center gap-2';
            slot.innerHTML = `
                <div class="w-10 h-10 rounded bg-blue-500 flex items-center justify-center text-xs font-bold">${hero ? hero.name.slice(0, 2) : '?'}</div>
                <span class="text-sm font-medium">${hero ? hero.name : 'Unknown'}</span>
            `;
        }
    });
    
    // Update Red Picks
    draftState.redPicks.forEach((heroId, index) => {
        const slot = document.getElementById(`redPick${index + 1}`);
        if (slot) {
            const hero = HEROES.find(h => h.id === heroId);
            slot.className = 'pick-slot filled rounded-lg p-2 flex items-center gap-2';
            slot.innerHTML = `
                <div class="w-10 h-10 rounded bg-red-500 flex items-center justify-center text-xs font-bold">${hero ? hero.name.slice(0, 2) : '?'}</div>
                <span class="text-sm font-medium">${hero ? hero.name : 'Unknown'}</span>
            `;
        }
    });
    
    updateHeroStatus();
}

function updateTurnDisplay() {
    if (currentStep >= DRAFT_SEQUENCE.length) return;
    
    const currentAction = DRAFT_SEQUENCE[currentStep];
    const turnDot = document.getElementById('turnDot');
    const turnText = document.getElementById('turnText');
    
    const teamColor = currentAction.team === 'blue' ? 'bg-blue-500' : 'bg-red-500';
    const teamName = currentAction.team === 'blue' ? 'Blue' : 'Red';
    const actionName = currentAction.type === 'ban' ? 'Ban' : 'Pick';
    
    turnDot.className = `w-3 h-3 rounded-full ${teamColor} pulse-animation`;
    turnText.textContent = `${teamName} Team's Turn to ${actionName}`;
}

// ============================================
// TIMER
// ============================================

function startTimer() {
    timeLeft = 30;
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            autoSelect();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    stopTimer();
    startTimer();
}

function updateTimerDisplay() {
    document.getElementById('timerDisplay').textContent = timeLeft;
}

function autoSelect() {
    const unavailable = [...draftState.blueBans, ...draftState.redBans, ...draftState.bluePicks, ...draftState.redPicks];
    const availableHero = HEROES.find(h => !unavailable.includes(h.id));
    
    if (availableHero) {
        selectedHero = availableHero.id;
        confirmSelection();
    }
}

// ============================================
// CONTROLS
// ============================================

function resetDraft() {
    if (!confirm('Reset the draft?')) return;
    
    stopTimer();
    currentStep = 0;
    draftState = {
        blueBans: [],
        redBans: [],
        bluePicks: [],
        redPicks: []
    };
    
    // Reset UI
    for (let i = 1; i <= 2; i++) {
        const blueBan = document.getElementById(`blueBan${i}`);
        const redBan = document.getElementById(`redBan${i}`);
        blueBan.className = 'ban-slot aspect-square rounded-lg flex items-center justify-center';
        blueBan.innerHTML = '<i class="fas fa-ban text-white/20"></i>';
        redBan.className = 'ban-slot aspect-square rounded-lg flex items-center justify-center';
        redBan.innerHTML = '<i class="fas fa-ban text-white/20"></i>';
    }
    
    for (let i = 1; i <= 5; i++) {
        const bluePick = document.getElementById(`bluePick${i}`);
        const redPick = document.getElementById(`redPick${i}`);
        bluePick.className = 'pick-slot rounded-lg p-2 flex items-center gap-2';
        bluePick.innerHTML = `<div class="w-10 h-10 rounded bg-white/10 flex items-center justify-center text-xs text-white/30">${i}</div><span class="text-sm text-white/50">Pick ${i}</span>`;
        redPick.className = 'pick-slot rounded-lg p-2 flex items-center gap-2';
        redPick.innerHTML = `<div class="w-10 h-10 rounded bg-white/10 flex items-center justify-center text-xs text-white/30">${i}</div><span class="text-sm text-white/50">Pick ${i}</span>`;
    }
    
    renderHeroes();
    updateTurnDisplay();
    startTimer();
    showToast('Draft reset!', 'info');
}

function openBoModal() {
    document.getElementById('boModal').classList.remove('hidden');
}

function closeBoModal() {
    document.getElementById('boModal').classList.add('hidden');
}

function setBoFormat(format) {
    boFormat = format;
    showToast(`Format set to BO${format}`, 'success');
    closeBoModal();
}

function openSaveModal() {
    if (!currentUser) {
        openLoginModal();
        return;
    }
    document.getElementById('saveModal').classList.remove('hidden');
}

function closeSaveModal() {
    document.getElementById('saveModal').classList.add('hidden');
}

async function saveDraft() {
    if (!currentUser) {
        showToast('Please login first!', 'error');
        return;
    }
    
    const draftName = document.getElementById('draftName').value || 'Untitled Draft';
    
    try {
        await db.collection('drafts').add({
            userId: currentUser.uid,
            name: draftName,
            boFormat: boFormat,
            blueBans: draftState.blueBans,
            redBans: draftState.redBans,
            bluePicks: draftState.bluePicks,
            redPicks: draftState.redPicks,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showToast('Draft saved!', 'success');
        closeSaveModal();
    } catch (error) {
        console.error('Error saving draft:', error);
        showToast('Failed to save draft!', 'error');
    }
}

// ============================================
// AUTH FUNCTIONS
// ============================================

function openLoginModal() {
    document.getElementById('loginModal').classList.remove('hidden');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.add('hidden');
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showToast('Please fill all fields!', 'error');
        return;
    }
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        showToast('Login successful!', 'success');
        closeLoginModal();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function register() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showToast('Please fill all fields!', 'error');
        return;
    }
    
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        showToast('Registration successful!', 'success');
        closeLoginModal();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// ============================================
// SIDEBAR
// ============================================

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
}

// ============================================
// UTILITY
// ============================================

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-4 py-2 rounded-lg backdrop-blur-xl z-50 font-medium text-sm transition-all duration-300 transform translate-x-full`;
    
    const colors = {
        success: 'bg-green-500/80 text-white',
        error: 'bg-red-500/80 text-white',
        info: 'bg-blue-500/80 text-white',
        warning: 'bg-yellow-500/80 text-white'
    };
    
    toast.classList.add(...colors[type].split(' '));
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.remove('translate-x-full'), 100);
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}
