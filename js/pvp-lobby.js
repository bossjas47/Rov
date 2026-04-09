// PVP Lobby JavaScript - Room Management
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
// GLOBAL STATE
// ============================================
let currentUser = null;
let activeRoomsListener = null;

// ============================================
// AUTHENTICATION
// ============================================
auth.onAuthStateChanged((user) => {
    currentUser = user;
    if (user) {
        console.log('User logged in:', user.displayName || user.email);
    } else {
        console.log('User not logged in');
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Generate 6-digit room code
function generateRoomCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-xl backdrop-blur-xl z-50 font-medium transition-all duration-300 transform translate-x-full`;
    
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
    }, 3000);
}

// ============================================
// MODAL FUNCTIONS
// ============================================

function openCreateRoomModal() {
    if (!currentUser) {
        showToast('Please login first!', 'error');
        openLoginModal();
        return;
    }
    document.getElementById('createRoomModal').classList.remove('hidden');
}

function closeCreateRoomModal() {
    document.getElementById('createRoomModal').classList.add('hidden');
}

function openJoinRoomModal() {
    document.getElementById('joinRoomModal').classList.remove('hidden');
    document.getElementById('joinRoomCode').focus();
}

function closeJoinRoomModal() {
    document.getElementById('joinRoomModal').classList.add('hidden');
}

function openLoginModal() {
    document.getElementById('loginModal').classList.remove('hidden');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.add('hidden');
}

// ============================================
// ROOM MANAGEMENT
// ============================================

// Create new room
async function createRoom() {
    if (!currentUser) {
        showToast('Please login first!', 'error');
        return;
    }

    const boSelect = document.getElementById('boSelect');
    const firstPickSelect = document.getElementById('firstPickSelect');
    
    const boFormat = parseInt(boSelect.value);
    const firstPick = firstPickSelect.value;
    
    const roomCode = generateRoomCode();
    
    try {
        const roomData = {
            code: roomCode,
            creatorId: currentUser.uid,
            creatorName: currentUser.displayName || currentUser.email || 'Unknown',
            boFormat: boFormat,
            firstPick: firstPick,
            status: 'waiting',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            blueTeam: {
                captain: firstPick === 'blue' ? currentUser.uid : null,
                captainName: firstPick === 'blue' ? (currentUser.displayName || currentUser.email) : null,
                members: firstPick === 'blue' ? [currentUser.uid] : []
            },
            redTeam: {
                captain: firstPick === 'red' ? currentUser.uid : null,
                captainName: firstPick === 'red' ? (currentUser.displayName || currentUser.email) : null,
                members: firstPick === 'red' ? [currentUser.uid] : []
            },
            spectators: [],
            chat: []
        };
        
        await db.collection('rooms').doc(roomCode).set(roomData);
        
        showToast(`Room ${roomCode} created!`, 'success');
        closeCreateRoomModal();
        
        // Redirect to waiting room
        localStorage.setItem('currentRoomCode', roomCode);
        localStorage.setItem('currentTeam', firstPick);
        localStorage.setItem('isCaptain', 'true');
        window.location.href = 'waiting-room.html';
        
    } catch (error) {
        console.error('Error creating room:', error);
        showToast('Failed to create room!', 'error');
    }
}

// Join room with code
async function joinRoom() {
    const codeInput = document.getElementById('joinRoomCode');
    const teamSelect = document.getElementById('joinTeamSelect');
    const roomCode = codeInput.value.trim();
    
    if (!roomCode || roomCode.length !== 6) {
        showToast('Please enter valid 6-digit code!', 'error');
        return;
    }
    
    try {
        const roomDoc = await db.collection('rooms').doc(roomCode).get();
        
        if (!roomDoc.exists) {
            showToast('Room not found!', 'error');
            return;
        }
        
        const roomData = roomDoc.data();
        
        if (roomData.status === 'drafting') {
            showToast('Draft already started!', 'error');
            return;
        }
        
        if (roomData.status === 'finished') {
            showToast('Room already closed!', 'error');
            return;
        }
        
        const team = teamSelect.value;
        const isSpectator = team === 'spectator';
        
        // Check if slot is available
        if (!isSpectator) {
            const teamData = team === 'blue' ? roomData.blueTeam : roomData.redTeam;
            if (teamData.captain) {
                showToast(`Team ${team.toUpperCase()} already has a captain!`, 'error');
                return;
            }
        }
        
        // Update room with new member
        const updateData = {};
        if (isSpectator) {
            updateData.spectators = firebase.firestore.FieldValue.arrayUnion({
                uid: currentUser ? currentUser.uid : 'guest_' + Date.now(),
                name: currentUser ? (currentUser.displayName || currentUser.email) : 'Guest',
                joinedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            updateData[`${team}Team.captain`] = currentUser ? currentUser.uid : 'guest_' + Date.now();
            updateData[`${team}Team.captainName`] = currentUser ? (currentUser.displayName || currentUser.email) : 'Guest';
            updateData[`${team}Team.members`] = firebase.firestore.FieldValue.arrayUnion(
                currentUser ? currentUser.uid : 'guest_' + Date.now()
            );
        }
        
        await db.collection('rooms').doc(roomCode).update(updateData);
        
        showToast(`Joined room ${roomCode}!`, 'success');
        closeJoinRoomModal();
        
        // Redirect to waiting room
        localStorage.setItem('currentRoomCode', roomCode);
        localStorage.setItem('currentTeam', team);
        localStorage.setItem('isCaptain', (!isSpectator).toString());
        window.location.href = 'waiting-room.html';
        
    } catch (error) {
        console.error('Error joining room:', error);
        showToast('Failed to join room!', 'error');
    }
}

// Load active rooms
function loadActiveRooms() {
    const container = document.getElementById('activeRoomsList');
    
    if (activeRoomsListener) {
        activeRoomsListener();
    }
    
    activeRoomsListener = db.collection('rooms')
        .where('status', 'in', ['waiting', 'drafting'])
        .orderBy('createdAt', 'desc')
        .limit(20)
        .onSnapshot((snapshot) => {
            container.innerHTML = '';
            
            if (snapshot.empty) {
                container.innerHTML = `
                    <div class="text-center py-8 text-white/50">
                        <i class="fas fa-inbox text-4xl mb-3"></i>
                        <p>No active rooms</p>
                    </div>
                `;
                return;
            }
            
            snapshot.forEach((doc) => {
                const room = doc.data();
                const roomCard = createRoomCard(room);
                container.appendChild(roomCard);
            });
        }, (error) => {
            console.error('Error loading rooms:', error);
            container.innerHTML = `
                <div class="text-center py-8 text-red-400">
                    <i class="fas fa-exclamation-circle text-4xl mb-3"></i>
                    <p>Failed to load rooms</p>
                </div>
            `;
        });
}

// Create room card element
function createRoomCard(room) {
    const div = document.createElement('div');
    div.className = 'liquid-glass rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer';
    
    const blueFull = room.blueTeam.captain ? true : false;
    const redFull = room.redTeam.captain ? true : false;
    const statusColor = room.status === 'drafting' ? 'text-yellow-400' : 'text-green-400';
    const statusText = room.status === 'drafting' ? 'Drafting' : 'Waiting';
    
    div.innerHTML = `
        <div class="flex items-center justify-between mb-2">
            <span class="text-lg font-bold text-white">Room ${room.code}</span>
            <span class="text-sm ${statusColor}">${statusText}</span>
        </div>
        <div class="text-sm text-white/70 mb-2">
            <i class="fas fa-user mr-1"></i> ${room.creatorName}
            <span class="mx-2">|</span>
            <i class="fas fa-gamepad mr-1"></i> BO${room.boFormat}
        </div>
        <div class="flex gap-2">
            <span class="px-2 py-1 rounded text-xs ${blueFull ? 'bg-blue-500/50 text-white' : 'bg-white/20 text-white/70'}">
                <i class="fas fa-shield-alt mr-1"></i> Blue ${blueFull ? 'Full' : 'Open'}
            </span>
            <span class="px-2 py-1 rounded text-xs ${redFull ? 'bg-red-500/50 text-white' : 'bg-white/20 text-white/70'}">
                <i class="fas fa-shield-alt mr-1"></i> Red ${redFull ? 'Full' : 'Open'}
            </span>
        </div>
    `;
    
    div.onclick = () => {
        document.getElementById('joinRoomCode').value = room.code;
        openJoinRoomModal();
    };
    
    return div;
}

// ============================================
// AUTH FUNCTIONS
// ============================================

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
        updateUIForLoggedInUser();
    } catch (error) {
        console.error('Login error:', error);
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
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters!', 'error');
        return;
    }
    
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        showToast('Registration successful!', 'success');
        closeLoginModal();
        updateUIForLoggedInUser();
    } catch (error) {
        console.error('Register error:', error);
        showToast(error.message, 'error');
    }
}

async function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        await auth.signInWithPopup(provider);
        showToast('Login successful!', 'success');
        closeLoginModal();
        updateUIForLoggedInUser();
    } catch (error) {
        console.error('Google login error:', error);
        showToast(error.message, 'error');
    }
}

function logout() {
    auth.signOut().then(() => {
        showToast('Logged out!', 'info');
        updateUIForLoggedOutUser();
    });
}

function updateUIForLoggedInUser() {
    const loginBtn = document.getElementById('loginBtn');
    const userDisplay = document.getElementById('userDisplay');
    
    if (loginBtn) loginBtn.classList.add('hidden');
    if (userDisplay) {
        userDisplay.classList.remove('hidden');
        userDisplay.textContent = currentUser.displayName || currentUser.email;
    }
}

function updateUIForLoggedOutUser() {
    const loginBtn = document.getElementById('loginBtn');
    const userDisplay = document.getElementById('userDisplay');
    
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (userDisplay) userDisplay.classList.add('hidden');
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
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Load active rooms
    loadActiveRooms();
    
    // Check auth state
    auth.onAuthStateChanged((user) => {
        currentUser = user;
        if (user) {
            updateUIForLoggedInUser();
        } else {
            updateUIForLoggedOutUser();
        }
    });
    
    // Enter key for join room
    document.getElementById('joinRoomCode')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') joinRoom();
    });
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (activeRoomsListener) {
        activeRoomsListener();
    }
});
