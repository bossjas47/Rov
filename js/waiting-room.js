// ROV Draft Pro - Waiting Room

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

// State
let currentUser = null;
let roomCode = null;
let roomData = null;
let isHost = false;
let unsubscribe = null;

// Get room code from URL
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
        window.location.href = 'index.html';
        return;
    }
    subscribeToRoom();
});

// Subscribe to room updates
function subscribeToRoom() {
    unsubscribe = db.collection('rooms').doc(roomCode).onSnapshot(doc => {
        if (!doc.exists) {
            showToast('Room closed', 'error');
            setTimeout(() => window.location.href = 'index.html', 2000);
            return;
        }

        roomData = doc.data();
        isHost = roomData.hostId === currentUser.uid;

        updateUI();

        // Check if draft started
        if (roomData.status === 'drafting') {
            window.location.href = `draft-room.html?room=${roomCode}`;
        }
    }, error => {
        console.error('Room error:', error);
        showToast('Error connecting to room', 'error');
    });
}

function updateUI() {
    // Host info
    document.getElementById('hostName').textContent = roomData.hostName;
    document.getElementById('firstPickDisplay').textContent = roomData.settings.firstPick;
    document.getElementById('settingsBO').textContent = roomData.settings.bo;
    document.getElementById('boDisplay').textContent = 'BO' + roomData.settings.bo;
    document.getElementById('settingsFirstPick').textContent = roomData.settings.firstPick + ' First Pick';

    const hostStatus = document.getElementById('hostStatus');
    hostStatus.innerHTML = '<span class="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">Ready</span>';

    // Guest info
    const guestName = document.getElementById('guestName');
    const guestStatus = document.getElementById('guestStatus');
    const guestCard = document.getElementById('guestCard');

    if (roomData.guestId) {
        guestName.textContent = roomData.guestName;
        guestStatus.innerHTML = '<span class="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">Ready</span>';
        guestCard.classList.remove('player-waiting');
        guestCard.classList.add('player-ready');

        // Show start button for host
        if (isHost) {
            document.getElementById('startSection').classList.remove('hidden');
            document.getElementById('waitingSection').classList.add('hidden');
        } else {
            document.getElementById('startSection').classList.add('hidden');
            document.getElementById('waitingSection').classList.remove('hidden');
            document.getElementById('waitingSection').innerHTML = '<span class="text-green-400 flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>Waiting for host to start...</span>';
        }
    } else {
        guestName.textContent = 'Waiting...';
        guestStatus.innerHTML = '<span class="px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 text-sm font-medium">Empty</span>';
        guestCard.classList.add('player-waiting');
        guestCard.classList.remove('player-ready');
        document.getElementById('startSection').classList.add('hidden');
        document.getElementById('waitingSection').classList.remove('hidden');
        document.getElementById('waitingSection').innerHTML = '<span class="text-gray-400 flex items-center gap-2"><span class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>Waiting for opponent...</span>';
    }

    // Update chat
    updateChat();
}

function updateChat() {
    const container = document.getElementById('chatMessages');
    if (!roomData.chat || roomData.chat.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center text-sm py-8">No messages yet</p>';
        return;
    }

    container.innerHTML = roomData.chat.map(msg => `
        <div class="chat-message">
            <span class="font-medium text-blue-400">${msg.user}:</span>
            <span class="text-gray-300">${msg.message}</span>
        </div>
    `).join('');
    container.scrollTop = container.scrollHeight;
}

// Actions
async function startDraft() {
    if (!isHost || !roomData.guestId) return;

    try {
        // Determine first pick
        let firstPickTeam = 'blue';
        if (roomData.settings.firstPick === 'random') {
            firstPickTeam = Math.random() < 0.5 ? 'blue' : 'red';
        } else if (roomData.settings.firstPick === 'host') {
            firstPickTeam = 'blue';
        } else {
            firstPickTeam = 'red';
        }

        // Create draft document
        await db.collection('drafts').doc(roomCode).set({
            roomCode: roomCode,
            gameNumber: 1,
            bo: roomData.settings.bo,
            currentStep: 0,
            currentTeam: firstPickTeam,
            timeLeft: 60,
            phase: 'ban1',
            blue: {
                userId: roomData.hostId,
                name: roomData.hostName,
                bans: [],
                picks: []
            },
            red: {
                userId: roomData.guestId,
                name: roomData.guestName,
                bans: [],
                picks: []
            },
            usedHeroes: [],
            chat: [],
            spectators: [],
            status: 'drafting',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Update room status
        await db.collection('rooms').doc(roomCode).update({
            status: 'drafting'
        });

    } catch (error) {
        showToast('Error starting draft: ' + error.message, 'error');
    }
}

async function sendChat() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;

    const userName = isHost ? roomData.hostName : roomData.guestName;

    try {
        await db.collection('rooms').doc(roomCode).update({
            chat: firebase.firestore.FieldValue.arrayUnion({
                user: userName,
                message: message,
                time: Date.now()
            })
        });
        input.value = '';
    } catch (error) {
        showToast('Error sending message', 'error');
    }
}

async function leaveRoom() {
    if (unsubscribe) unsubscribe();

    try {
        if (isHost) {
            // Host leaving = close room
            await db.collection('rooms').doc(roomCode).delete();
        } else {
            // Guest leaving = reset guest
            await db.collection('rooms').doc(roomCode).update({
                guestId: null,
                guestName: null,
                status: 'waiting'
            });
        }
    } catch (error) {
        console.error('Error leaving room:', error);
    }

    window.location.href = 'index.html';
}

function copyRoomCode() {
    navigator.clipboard.writeText(roomCode);
    showToast('Room code copied!', 'success');
}

function copyRoomLink() {
    const link = `${window.location.origin}/waiting-room.html?room=${roomCode}`;
    navigator.clipboard.writeText(link);
    showToast('Room link copied!', 'success');
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (unsubscribe) unsubscribe();
});

// Init
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
