// Waiting Room JavaScript - PVP Room Management
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
let roomCode = null;
let currentTeam = null;
let isCaptain = false;
let roomListener = null;
let isRoomCreator = false;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Get room info from localStorage
    roomCode = localStorage.getItem('currentRoomCode');
    currentTeam = localStorage.getItem('currentTeam');
    isCaptain = localStorage.getItem('isCaptain') === 'true';
    
    if (!roomCode) {
        showToast('No room code found!', 'error');
        window.location.href = 'pvp-lobby.html';
        return;
    }
    
    // Display room code
    document.getElementById('roomCodeDisplay').textContent = roomCode;
    
    // Check auth and setup room
    auth.onAuthStateChanged((user) => {
        currentUser = user;
        setupRoomListener();
    });
});

// ============================================
// ROOM LISTENER
// ============================================

function setupRoomListener() {
    roomListener = db.collection('rooms').doc(roomCode)
        .onSnapshot((doc) => {
            if (!doc.exists) {
                showToast('Room has been closed!', 'error');
                window.location.href = 'pvp-lobby.html';
                return;
            }
            
            const roomData = doc.data();
            updateRoomDisplay(roomData);
            
            // Check if draft has started
            if (roomData.status === 'drafting') {
                window.location.href = 'draft-room.html';
                return;
            }
            
            // Check if room is finished
            if (roomData.status === 'finished') {
                showToast('Draft has ended!', 'info');
                window.location.href = 'pvp-lobby.html';
                return;
            }
        }, (error) => {
            console.error('Room listener error:', error);
            showToast('Connection error!', 'error');
        });
}

// ============================================
// UPDATE ROOM DISPLAY
// ============================================

function updateRoomDisplay(roomData) {
    // Update room info
    document.getElementById('boDisplay').textContent = `BO${roomData.boFormat}`;
    document.getElementById('firstPickDisplay').textContent = roomData.firstPick === 'blue' ? 'Blue' : 'Red';
    
    // Check if current user is room creator
    isRoomCreator = roomData.creatorId === (currentUser ? currentUser.uid : null);
    
    // Count players
    let playerCount = 0;
    if (roomData.blueTeam.captain) playerCount++;
    if (roomData.redTeam.captain) playerCount++;
    document.getElementById('playerCount').textContent = `${playerCount}/2`;
    
    // Update Blue Team
    const blueCaptain = document.getElementById('blueCaptain');
    const blueStatus = document.getElementById('blueStatus');
    
    if (roomData.blueTeam.captain) {
        blueCaptain.className = 'slot-filled rounded-2xl p-4 flex items-center gap-4';
        blueCaptain.innerHTML = `
            <div class="w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center">
                <i class="fas fa-user text-2xl"></i>
            </div>
            <div>
                <div class="font-bold text-lg">${roomData.blueTeam.captainName}</div>
                <div class="text-sm text-blue-300">Captain</div>
            </div>
        `;
        blueStatus.textContent = 'Ready';
        blueStatus.className = 'px-3 py-1 rounded-full text-sm bg-green-500/50';
    } else {
        blueCaptain.className = 'slot-empty rounded-2xl p-4 flex items-center gap-4';
        blueCaptain.innerHTML = `
            <div class="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
                <i class="fas fa-user text-2xl text-white/30"></i>
            </div>
            <div>
                <div class="text-white/50">Captain Slot</div>
                <div class="text-sm text-white/30">Waiting for player...</div>
            </div>
        `;
        blueStatus.textContent = 'Waiting...';
        blueStatus.className = 'px-3 py-1 rounded-full text-sm bg-blue-500/50';
    }
    
    // Update Red Team
    const redCaptain = document.getElementById('redCaptain');
    const redStatus = document.getElementById('redStatus');
    
    if (roomData.redTeam.captain) {
        redCaptain.className = 'slot-filled rounded-2xl p-4 flex items-center gap-4';
        redCaptain.innerHTML = `
            <div class="w-16 h-16 rounded-xl bg-red-500 flex items-center justify-center">
                <i class="fas fa-user text-2xl"></i>
            </div>
            <div>
                <div class="font-bold text-lg">${roomData.redTeam.captainName}</div>
                <div class="text-sm text-red-300">Captain</div>
            </div>
        `;
        redStatus.textContent = 'Ready';
        redStatus.className = 'px-3 py-1 rounded-full text-sm bg-green-500/50';
    } else {
        redCaptain.className = 'slot-empty rounded-2xl p-4 flex items-center gap-4';
        redCaptain.innerHTML = `
            <div class="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
                <i class="fas fa-user text-2xl text-white/30"></i>
            </div>
            <div>
                <div class="text-white/50">Captain Slot</div>
                <div class="text-sm text-white/30">Waiting for player...</div>
            </div>
        `;
        redStatus.textContent = 'Waiting...';
        redStatus.className = 'px-3 py-1 rounded-full text-sm bg-red-500/50';
    }
    
    // Show/hide start button
    const startBtn = document.getElementById('startDraftBtn');
    if (isRoomCreator && roomData.blueTeam.captain && roomData.redTeam.captain) {
        startBtn.classList.remove('hidden');
    } else {
        startBtn.classList.add('hidden');
    }
    
    // Update chat
    updateChat(roomData.chat || []);
}

// ============================================
// CHAT FUNCTIONS
// ============================================

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
                    <span class="text-xs text-white/50 italic">${msg.text}</span>
                </div>
            `;
        } else {
            msgDiv.innerHTML = `
                <div class="flex ${isMe ? 'justify-end' : 'justify-start'}">
                    <div class="max-w-[80%] ${isMe ? 'bg-blue-500/50' : 'bg-white/10'} rounded-2xl px-4 py-2">
                        <div class="text-xs text-white/60 mb-1">${msg.name}</div>
                        <div class="text-sm">${escapeHtml(msg.text)}</div>
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
        showToast('Failed to send message!', 'error');
    }
}

// ============================================
// ROOM ACTIONS
// ============================================

async function startDraft() {
    if (!isRoomCreator) {
        showToast('Only room creator can start!', 'error');
        return;
    }
    
    try {
        await db.collection('rooms').doc(roomCode).update({
            status: 'drafting',
            startedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showToast('Starting draft...', 'success');
        window.location.href = 'draft-room.html';
    } catch (error) {
        console.error('Error starting draft:', error);
        showToast('Failed to start draft!', 'error');
    }
}

async function leaveRoom() {
    if (!confirm('Are you sure you want to leave this room?')) return;
    
    try {
        const roomDoc = await db.collection('rooms').doc(roomCode).get();
        const roomData = roomDoc.data();
        
        const userId = currentUser ? currentUser.uid : 'guest_' + Date.now();
        
        // Remove user from their team
        const updateData = {};
        
        if (roomData.blueTeam.captain === userId) {
            updateData['blueTeam.captain'] = null;
            updateData['blueTeam.captainName'] = null;
            updateData['blueTeam.members'] = [];
        } else if (roomData.redTeam.captain === userId) {
            updateData['redTeam.captain'] = null;
            updateData['redTeam.captainName'] = null;
            updateData['redTeam.members'] = [];
        }
        
        // Add leave message to chat
        const leaveMessage = {
            type: 'system',
            text: `${currentUser ? (currentUser.displayName || currentUser.email) : 'Guest'} left the room`,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };
        updateData.chat = firebase.firestore.FieldValue.arrayUnion(leaveMessage);
        
        await db.collection('rooms').doc(roomCode).update(updateData);
        
        // Clear localStorage
        localStorage.removeItem('currentRoomCode');
        localStorage.removeItem('currentTeam');
        localStorage.removeItem('isCaptain');
        
        showToast('Left room!', 'info');
        window.location.href = 'pvp-lobby.html';
        
    } catch (error) {
        console.error('Error leaving room:', error);
        showToast('Failed to leave room!', 'error');
    }
}

function copyRoomCode() {
    navigator.clipboard.writeText(roomCode).then(() => {
        showToast('Room code copied!', 'success');
    }).catch(() => {
        showToast('Failed to copy!', 'error');
    });
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
    if (roomListener) {
        roomListener();
    }
});
