// Draft Room JavaScript - PVP Real-time Drafting
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
    { id: 29, name: "Ishar", role: "support" }, { id: 30, name: "Dirak", role: "mage" },
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
    { id: 63, name: "Nakroth", role: "assassin" }, { id: 64, name: "Thane", role: "assassin" },
    { id: 65, name: "Batman", role: "assassin" }, { id: 66, name: "Kriknak", role: "assassin" },
    { id: 67, name: "Murad", role: "assassin" }, { id: 68, name: "Zephys", role: "assassin" },
    { id: 69, name: "Zuka", role: "assassin" }, { id: 70, name: "Kilian", role: "assassin" },
    { id: 71, name: "Quillen", role: "assassin" }, { id: 72, name: "Nakroth", role: "assassin" },
    { id: 73, name: "Enzo", role: "assassin" }, { id: 74, name: "Dextra", role: "assassin" },
    { id: 75, name: "Sinestrea", role: "assassin" }, { id: 76, name: "Aoi", role: "assassin" },
    { id: 77, name: "Bright", role: "assassin" }, { id: 78, name: "Zata", role: "assassin" },
    { id: 79, name: "Keera", role: "assassin" }, { id: 80, name: "Kaine", role: "assassin" },
    { id: 81, name: "Butterfly", role: "assassin" }, { id: 82, name: "Wukong", role: "assassin" },
    { id: 83, name: "Krixi", role: "mage" }, { id: 84, name: "Aleister", role: "mage" },
    { id: 85, name: "Mganga", role: "mage" }, { id: 86, name: "Gildur", role: "mage" },
    { id: 87, name: "Diao Chan", role: "mage" }, { id: 88, name: "Krixi", role: "mage" },
    { id: 89, name: "Veera", role: "mage" }, { id: 90, name: "Lauriel", role: "mage" },
    { id: 91, name: "Ignis", role: "mage" }, { id: 92, name: "Natalya", role: "mage" },
    { id: 93, name: "Zill", role: "mage" }, { id: 94, name: "Arduin", role: "fighter" },
    { id: 95, name: "Raz", role: "mage" }, { id: 96, name: "Max", role: "tank" },
    { id: 97, name: "Liliana", role: "mage" }, { id: 98, name: "Toro", role: "tank" },
    { id: 99, name: "Tulen", role: "mage" }, { id: 100, name: "Lumburr", role: "tank" },
    { id: 101, name: "Ishar", role: "mage" }, { id: 102, name: "Grakk", role: "tank" },
    { id: 103, name: "Rouie", role: "support" }, { id: 104, name: "Chaugnar", role: "tank" },
    { id: 105, name: "Zip", role: "support" }, { id: 106, name: "Omega", role: "tank" },
    { id: 107, name: "Teeri", role: "support" }, { id: 108, name: "Thane", role: "tank" },
    { id: 109, name: "Krizzix", role: "support" }, { id: 110, name: "Xeniel", role: "tank" },
    { id: 111, name: "Y'bneth", role: "support" }, { id: 112, name: "Arum", role: "tank" },
    { id: 113, name: "Helen", role: "support" }, { id: 114, name: "Mina", role: "tank" },
    { id: 115, name: "Aya", role: "support" }, { id: 116, name: "Skud", role: "fighter" },
    { id: 117, name: "Cresht", role: "support" }, { id: 118, name: "Kil'Groth", role: "fighter" },
    { id: 119, name: "Baldum", role: "tank" }, { id: 120, name: "Errol", role: "fighter" },
    { id: 121, name: "Tachi", role: "fighter" }, { id: 122, name: "Veres", role: "fighter" },
    { id: 123, name: "Amily", role: "fighter" }, { id: 124, name: "Richter", role: "fighter" },
    { id: 125, name: "Qi", role: "fighter" }, { id: 126, name: "Bonnie", role: "fighter" },
    { id: 127, name: "Laville", role: "marksman" }
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
let roomCode = null;
let currentTeam = null;
let isCaptain = false;
let roomData = null;
let currentStep = 0;
let selectedHero = null;
let timerInterval = null;
let timeLeft = 30;
let roomListener = null;
let currentFilter = 'all';

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    roomCode = localStorage.getItem('currentRoomCode');
    currentTeam = localStorage.getItem('currentTeam');
    isCaptain = localStorage.getItem('isCaptain') === 'true';
    
    if (!roomCode) {
        showToast('No room code found!', 'error');
        window.location.href = 'pvp-lobby.html';
        return;
    }
    
    document.getElementById('roomCodeDisplay').textContent = roomCode;
    
    auth.onAuthStateChanged((user) => {
        currentUser = user;
        setupRoomListener();
    });
    
    renderHeroes();
});

// ============================================
// ROOM LISTENER
// ============================================

function setupRoomListener() {
    roomListener = db.collection('rooms').doc(roomCode)
        .onSnapshot((doc) => {
            if (!doc.exists) {
                showToast('Room closed!', 'error');
                window.location.href = 'pvp-lobby.html';
                return;
            }
            
            roomData = doc.data();
            currentStep = roomData.currentStep || 0;
            
            // Update UI
            document.getElementById('boDisplay').textContent = `BO${roomData.boFormat}`;
            document.getElementById('blueCaptainName').textContent = roomData.blueTeam.captainName || 'Waiting...';
            document.getElementById('redCaptainName').textContent = roomData.redTeam.captainName || 'Waiting...';
            
            // Update draft display
            updateDraftDisplay();
            
            // Check if draft complete
            if (currentStep >= DRAFT_SEQUENCE.length) {
                showDraftComplete();
                return;
            }
            
            // Start timer if it's my turn
            const currentAction = DRAFT_SEQUENCE[currentStep];
            const isMyTurn = isCaptain && currentAction.team === currentTeam;
            
            if (isMyTurn && !timerInterval) {
                startTimer();
            } else if (!isMyTurn) {
                stopTimer();
            }
            
            // Update turn indicator
            updateTurnIndicator(currentAction);
            
            // Update chat
            updateChat(roomData.chat || []);
            
        }, (error) => {
            console.error('Room listener error:', error);
        });
}

// ============================================
// UPDATE DRAFT DISPLAY
// ============================================

function updateDraftDisplay() {
    const draft = roomData.draft || { blueBans: [], redBans: [], bluePicks: [], redPicks: [] };
    
    // Update Blue Bans
    for (let i = 0; i < 2; i++) {
        const slot = document.getElementById(`blueBan${i + 1}`);
        const ban = draft.blueBans[i];
        if (ban) {
            const hero = HEROES.find(h => h.id === ban);
            slot.className = 'ban-slot filled aspect-square rounded-lg flex items-center justify-center';
            slot.innerHTML = `<div class="text-center"><div class="text-xs font-bold">${hero ? hero.name : '?'}</div></div>`;
        }
    }
    
    // Update Red Bans
    for (let i = 0; i < 2; i++) {
        const slot = document.getElementById(`redBan${i + 1}`);
        const ban = draft.redBans[i];
        if (ban) {
            const hero = HEROES.find(h => h.id === ban);
            slot.className = 'ban-slot filled aspect-square rounded-lg flex items-center justify-center';
            slot.innerHTML = `<div class="text-center"><div class="text-xs font-bold">${hero ? hero.name : '?'}</div></div>`;
        }
    }
    
    // Update Blue Picks
    for (let i = 0; i < 5; i++) {
        const slot = document.getElementById(`bluePick${i + 1}`);
        const pick = draft.bluePicks[i];
        if (pick) {
            const hero = HEROES.find(h => h.id === pick);
            slot.className = 'pick-slot filled rounded-lg p-2 flex items-center gap-2';
            slot.innerHTML = `
                <div class="w-10 h-10 rounded bg-blue-500 flex items-center justify-center text-xs font-bold">${hero ? hero.name.slice(0, 2) : '?'}</div>
                <span class="text-xs font-medium">${hero ? hero.name : 'Unknown'}</span>
            `;
        }
    }
    
    // Update Red Picks
    for (let i = 0; i < 5; i++) {
        const slot = document.getElementById(`redPick${i + 1}`);
        const pick = draft.redPicks[i];
        if (pick) {
            const hero = HEROES.find(h => h.id === pick);
            slot.className = 'pick-slot filled rounded-lg p-2 flex items-center gap-2';
            slot.innerHTML = `
                <div class="w-10 h-10 rounded bg-red-500 flex items-center justify-center text-xs font-bold">${hero ? hero.name.slice(0, 2) : '?'}</div>
                <span class="text-xs font-medium">${hero ? hero.name : 'Unknown'}</span>
            `;
        }
    }
    
    // Update hero grid to show banned/picked heroes
    updateHeroGridStatus(draft);
}

function updateHeroGridStatus(draft) {
    const allBanned = [...(draft.blueBans || []), ...(draft.redBans || [])];
    const allPicked = [...(draft.bluePicks || []), ...(draft.redPicks || [])];
    const unavailable = [...allBanned, ...allPicked];
    
    document.querySelectorAll('.hero-card').forEach(card => {
        const heroId = parseInt(card.dataset.heroId);
        card.classList.remove('banned', 'picked');
        
        if (allBanned.includes(heroId)) {
            card.classList.add('banned');
        } else if (allPicked.includes(heroId)) {
            card.classList.add('picked');
        }
    });
}

// ============================================
// TURN INDICATOR
// ============================================

function updateTurnIndicator(action) {
    const turnDot = document.getElementById('turnDot');
    const turnText = document.getElementById('turnText');
    
    const teamColor = action.team === 'blue' ? 'bg-blue-500' : 'bg-red-500';
    const teamName = action.team === 'blue' ? 'Blue' : 'Red';
    const actionName = action.type === 'ban' ? 'Ban' : 'Pick';
    
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
            stopTimer();
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

function updateTimerDisplay() {
    document.getElementById('timerDisplay').textContent = timeLeft;
    const percentage = (timeLeft / 30) * 100;
    document.getElementById('timerBar').style.width = `${percentage}%`;
}

function autoSelect() {
    // Auto select first available hero
    const draft = roomData.draft || { blueBans: [], redBans: [], bluePicks: [], redPicks: [] };
    const unavailable = [...draft.blueBans, ...draft.redBans, ...draft.bluePicks, ...draft.redPicks];
    
    const availableHero = HEROES.find(h => !unavailable.includes(h.id));
    if (availableHero) {
        selectHero(availableHero.id);
        confirmSelection();
    }
}

// ============================================
// HERO SELECTION
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
                <div class="text-xs font-bold truncate">${hero.name}</div>
                <div class="text-[10px] text-white/50 uppercase">${hero.role}</div>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    document.getElementById('heroCount').textContent = heroesToShow.length;
}

function filterHeroes(role) {
    currentFilter = role;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-blue-500/50');
        btn.classList.add('bg-white/10');
    });
    document.querySelector(`[data-filter="${role}"]`).classList.add('active', 'bg-blue-500/50');
    document.querySelector(`[data-filter="${role}"]`).classList.remove('bg-white/10');
    
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

function onHeroClick(heroId) {
    const currentAction = DRAFT_SEQUENCE[currentStep];
    const isMyTurn = isCaptain && currentAction.team === currentTeam;
    
    if (!isMyTurn) {
        showToast('Not your turn!', 'error');
        return;
    }
    
    const draft = roomData.draft || { blueBans: [], redBans: [], bluePicks: [], redPicks: [] };
    const unavailable = [...draft.blueBans, ...draft.redBans, ...draft.bluePicks, ...draft.redPicks];
    
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
        <div class="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
            <span class="text-3xl font-bold">${hero.name.slice(0, 2)}</span>
        </div>
        <div class="text-2xl font-bold mb-2">${hero.name}</div>
        <div class="text-white/60 capitalize">${currentAction.type} as ${hero.role}</div>
    `;
    
    document.getElementById('confirmModal').classList.remove('hidden');
}

function cancelSelection() {
    selectedHero = null;
    document.getElementById('confirmModal').classList.add('hidden');
}

async function confirmSelection() {
    if (!selectedHero) return;
    
    const currentAction = DRAFT_SEQUENCE[currentStep];
    const draft = roomData.draft || { blueBans: [], redBans: [], bluePicks: [], redPicks: [] };
    
    // Update draft data
    if (currentAction.type === 'ban') {
        const banKey = currentAction.team === 'blue' ? 'blueBans' : 'redBans';
        if (!draft[banKey]) draft[banKey] = [];
        draft[banKey].push(selectedHero);
    } else {
        const pickKey = currentAction.team === 'blue' ? 'bluePicks' : 'redPicks';
        if (!draft[pickKey]) draft[pickKey] = [];
        draft[pickKey].push(selectedHero);
    }
    
    try {
        await db.collection('rooms').doc(roomCode).update({
            draft: draft,
            currentStep: currentStep + 1
        });
        
        // Add chat message
        const hero = HEROES.find(h => h.id === selectedHero);
        const chatMessage = {
            type: 'system',
            text: `${currentAction.team.toUpperCase()} ${currentAction.type.toUpperCase()}: ${hero.name}`,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        await db.collection('rooms').doc(roomCode).update({
            chat: firebase.firestore.FieldValue.arrayUnion(chatMessage)
        });
        
        selectedHero = null;
        document.getElementById('confirmModal').classList.add('hidden');
        
    } catch (error) {
        console.error('Error updating draft:', error);
        showToast('Failed to select hero!', 'error');
    }
}

// ============================================
// CHAT FUNCTIONS
// ============================================

function toggleChat() {
    const chatPanel = document.getElementById('chatPanel');
    chatPanel.classList.toggle('translate-x-full');
}

function updateChat(messages) {
    const chatContainer = document.getElementById('chatMessages');
    
    if (messages.length === 0) return;
    
    chatContainer.innerHTML = '';
    messages.slice(-50).forEach((msg) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message';
        
        const isSystem = msg.type === 'system';
        const isMe = msg.uid === (currentUser ? currentUser.uid : null);
        
        if (isSystem) {
            msgDiv.innerHTML = `
                <div class="text-center py-1">
                    <span class="text-xs text-yellow-400/80 font-medium">${msg.text}</span>
                </div>
            `;
        } else {
            msgDiv.innerHTML = `
                <div class="flex ${isMe ? 'justify-end' : 'justify-start'}">
                    <div class="max-w-[85%] ${isMe ? 'bg-blue-500/40' : 'bg-white/10'} rounded-xl px-3 py-2">
                        <div class="text-[10px] text-white/50 mb-0.5">${msg.name}</div>
                        <div class="text-xs">${escapeHtml(msg.text)}</div>
                    </div>
                </div>
            `;
        }
        
        chatContainer.appendChild(msgDiv);
    });
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    
    if (!text) return;
    
    const message = {
        uid: currentUser ? currentUser.uid : 'guest_' + Date.now(),
        name: currentUser ? (currentUser.displayName || currentUser.email) : 'Guest',
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
        await db.collection('rooms').doc(roomCode).update({
            chat: firebase.firestore.FieldValue.arrayUnion(message)
        });
        input.value = '';
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// ============================================
// DRAFT COMPLETE
// ============================================

function showDraftComplete() {
    stopTimer();
    
    const draft = roomData.draft || { bluePicks: [], redPicks: [] };
    
    // Show final picks
    const blueContainer = document.getElementById('finalBluePicks');
    const redContainer = document.getElementById('finalRedPicks');
    
    blueContainer.innerHTML = '';
    redContainer.innerHTML = '';
    
    draft.bluePicks.forEach(pickId => {
        const hero = HEROES.find(h => h.id === pickId);
        if (hero) {
            blueContainer.innerHTML += `
                <div class="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-xs font-bold" title="${hero.name}">
                    ${hero.name.slice(0, 2)}
                </div>
            `;
        }
    });
    
    draft.redPicks.forEach(pickId => {
        const hero = HEROES.find(h => h.id === pickId);
        if (hero) {
            redContainer.innerHTML += `
                <div class="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center text-xs font-bold" title="${hero.name}">
                    ${hero.name.slice(0, 2)}
                </div>
            `;
        }
    });
    
    document.getElementById('completeModal').classList.remove('hidden');
}

async function saveDraft() {
    if (!currentUser) {
        showToast('Please login to save draft!', 'error');
        return;
    }
    
    const draft = roomData.draft || { bluePicks: [], redPicks: [], blueBans: [], redBans: [] };
    
    try {
        await db.collection('drafts').add({
            userId: currentUser.uid,
            roomCode: roomCode,
            blueTeam: {
                captain: roomData.blueTeam.captainName,
                bans: draft.blueBans || [],
                picks: draft.bluePicks || []
            },
            redTeam: {
                captain: roomData.redTeam.captainName,
                bans: draft.redBans || [],
                picks: draft.redPicks || []
            },
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showToast('Draft saved!', 'success');
    } catch (error) {
        console.error('Error saving draft:', error);
        showToast('Failed to save draft!', 'error');
    }
}

function backToLobby() {
    localStorage.removeItem('currentRoomCode');
    localStorage.removeItem('currentTeam');
    localStorage.removeItem('isCaptain');
    window.location.href = 'pvp-lobby.html';
}

// ============================================
// LEAVE DRAFT
// ============================================

async function leaveDraft() {
    if (!confirm('Are you sure you want to leave?')) return;
    
    stopTimer();
    
    try {
        await db.collection('rooms').doc(roomCode).update({
            status: 'finished'
        });
        
        localStorage.removeItem('currentRoomCode');
        localStorage.removeItem('currentTeam');
        localStorage.removeItem('isCaptain');
        
        window.location.href = 'pvp-lobby.html';
    } catch (error) {
        console.error('Error leaving draft:', error);
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

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

// ============================================
// SIDEBAR NAVIGATION
// ============================================

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
}

// ============================================
// CLEANUP
// ============================================

window.addEventListener('beforeunload', () => {
    stopTimer();
    if (roomListener) {
        roomListener();
    }
});
