// ROV Draft Pro - Lobby System

// Firebase Config
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
let selectedBO = 3;

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
    toast.className = `min-w-[280px] p-4 rounded-xl shadow-xl flex items-center gap-3 bg-gradient-to-r ${colors[type]} text-white animate-slideIn`;
    toast.innerHTML = `
        <span class="flex-1">${message}</span>
        <button onclick="this.parentElement.remove()" class="opacity-60 hover:opacity-100">✕</button>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Auth State
auth.onAuthStateChanged(user => {
    currentUser = user;
    updateUserSection();
    if (user) {
        loadActiveRooms();
    }
});

function updateUserSection() {
    const section = document.getElementById('userSection');
    if (currentUser) {
        const name = currentUser.displayName || currentUser.email?.split('@')[0] || 'User';
        section.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-gray-300">${name}</span>
                <button onclick="logout()" class="btn-secondary px-4 py-2 rounded-lg text-sm">Logout</button>
            </div>
        `;
    } else {
        section.innerHTML = `
            <button onclick="showLoginModal()" class="btn-primary px-4 py-2 rounded-lg font-medium text-sm">Login</button>
        `;
    }
}

// Modals
function showModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

function showLoginModal() {
    closeModal('registerModal');
    showModal('loginModal');
}

function showRegisterModal() {
    closeModal('loginModal');
    showModal('registerModal');
}

function showCreateRoomModal() {
    if (!currentUser) {
        showToast('Please login first', 'warning');
        showLoginModal();
        return;
    }
    showModal('createRoomModal');
}

// BO Selection
function selectBO(bo) {
    selectedBO = bo;
    document.querySelectorAll('.bo-btn').forEach(btn => {
        const btnBO = parseInt(btn.dataset.bo);
        if (btnBO === bo) {
            btn.className = 'bo-btn py-2 rounded-lg bg-blue-500 border border-blue-400';
        } else {
            btn.className = 'bo-btn py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20';
        }
    });
}

// Create Room
async function createRoom(e) {
    e.preventDefault();
    if (!currentUser) {
        showToast('Please login first', 'warning');
        return;
    }

    const firstPick = document.getElementById('firstPick').value;
    const roomCode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        await db.collection('rooms').doc(roomCode).set({
            roomCode: roomCode,
            hostId: currentUser.uid,
            hostName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Host',
            guestId: null,
            guestName: null,
            status: 'waiting',
            settings: {
                bo: selectedBO,
                firstPick: firstPick
            },
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            chat: []
        });

        showToast('Room created!', 'success');
        window.location.href = `waiting-room.html?room=${roomCode}`;
    } catch (error) {
        showToast('Error creating room: ' + error.message, 'error');
    }
}

// Join Room
async function joinRoom() {
    if (!currentUser) {
        showToast('Please login first', 'warning');
        showLoginModal();
        return;
    }

    const code = document.getElementById('joinCode').value.trim();
    if (!code || code.length !== 6) {
        showToast('Please enter 6-digit room code', 'warning');
        return;
    }

    try {
        const roomDoc = await db.collection('rooms').doc(code).get();
        if (!roomDoc.exists) {
            showToast('Room not found', 'error');
            return;
        }

        const room = roomDoc.data();
        if (room.status !== 'waiting') {
            showToast('Room is full or already started', 'error');
            return;
        }

        if (room.hostId === currentUser.uid) {
            window.location.href = `waiting-room.html?room=${code}`;
            return;
        }

        // Join as guest
        await db.collection('rooms').doc(code).update({
            guestId: currentUser.uid,
            guestName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Guest',
            status: 'ready'
        });

        showToast('Joined room!', 'success');
        window.location.href = `waiting-room.html?room=${code}`;
    } catch (error) {
        showToast('Error joining room: ' + error.message, 'error');
    }
}

// Start Solo Draft
function startSoloDraft() {
    // Solo draft doesn't require login
    window.location.href = 'solo-draft.html';
}

// Load Active Rooms
async function loadActiveRooms() {
    try {
        const snapshot = await db.collection('rooms')
            .where('status', 'in', ['waiting', 'ready'])
            .orderBy('createdAt', 'desc')
            .limit(10)
            .get();

        const container = document.getElementById('roomsList');
        if (snapshot.empty) {
            container.innerHTML = '<p class="text-gray-500 text-center py-8">No active rooms</p>';
            return;
        }

        container.innerHTML = snapshot.docs.map(doc => {
            const room = doc.data();
            const playerCount = room.guestId ? 2 : 1;
            return `
                <div class="room-card glass rounded-xl p-4 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <span class="font-bold text-blue-400">#${room.roomCode}</span>
                        </div>
                        <div>
                            <p class="font-medium">${room.hostName}'s Room</p>
                            <p class="text-sm text-gray-400">BO${room.settings.bo} • ${playerCount}/2 Players</p>
                        </div>
                    </div>
                    <button onclick="quickJoin('${room.roomCode}')" class="btn-primary px-4 py-2 rounded-lg text-sm" ${playerCount >= 2 ? 'disabled' : ''}>
                        ${playerCount >= 2 ? 'Full' : 'Join'}
                    </button>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading rooms:', error);
    }
}

async function quickJoin(roomCode) {
    if (!currentUser) {
        showToast('Please login first', 'warning');
        showLoginModal();
        return;
    }
    document.getElementById('joinCode').value = roomCode;
    await joinRoom();
}

function refreshRooms() {
    loadActiveRooms();
    showToast('Refreshed', 'info');
}

// Auth Functions
async function login(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        closeModal('loginModal');
        showToast('Logged in!', 'success');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function register(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        const cred = await auth.createUserWithEmailAndPassword(email, password);
        await cred.user.updateProfile({ displayName: username });
        await db.collection('users').doc(cred.user.uid).set({
            uid: cred.user.uid,
            username: username,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        closeModal('registerModal');
        showToast('Registered!', 'success');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function loginWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
        closeModal('loginModal');
        showToast('Logged in with Google!', 'success');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function logout() {
    await auth.signOut();
    showToast('Logged out', 'info');
}

// Init
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
