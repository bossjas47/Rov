// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC450kePwL6FdVXUSVli0bEP3DdnQs0qzU",
    authDomain: "psl-esport.firebaseapp.com",
    projectId: "psl-esport",
    storageBucket: "psl-esport.firebasestorage.app",
    messagingSenderId: "225108570173",
    appId: "1:225108570173:web:b6483c02368908f3783a54"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export class FirebaseService {
    constructor() {
        this.auth = auth;
        this.db = db;
        this.currentUser = null;
        this.userData = null;
    }

    // ========== AUTHENTICATION ==========
    
    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is logged in
    isLoggedIn() {
        return !!this.currentUser;
    }

    // Listen to auth state changes
    onAuthStateChanged(callback) {
        this.auth.onAuthStateChanged(async (user) => {
            this.currentUser = user;
            if (user) {
                this.userData = await this.getUserData(user.uid);
            } else {
                this.userData = null;
            }
            callback(user, this.userData);
        });
    }

    // Register with email/password
    async register(email, password, username) {
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // Create user document in Firestore
            await this.db.collection('users').doc(user.uid).set({
                uid: user.uid,
                email: email,
                username: username,
                displayName: username,
                photoURL: null,
                isPublic: true,
                teamName: '',
                bio: '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                stats: {
                    totalDrafts: 0,
                    wins: 0,
                    losses: 0,
                    draws: 0
                }
            });
            
            // Update profile
            await user.updateProfile({
                displayName: username
            });
            
            return { success: true, user };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: this.getAuthErrorMessage(error) };
        }
    }

    // Login with email/password
    async login(email, password) {
        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: this.getAuthErrorMessage(error) };
        }
    }

    // Sign in with Google
    async signInWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await this.auth.signInWithPopup(provider);
            const user = result.user;
            
            // Check if user document exists
            const userDoc = await this.db.collection('users').doc(user.uid).get();
            
            if (!userDoc.exists) {
                // Create new user document
                await this.db.collection('users').doc(user.uid).set({
                    uid: user.uid,
                    email: user.email,
                    username: user.displayName || 'User',
                    displayName: user.displayName || 'User',
                    photoURL: user.photoURL,
                    isPublic: true,
                    teamName: '',
                    bio: '',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    stats: {
                        totalDrafts: 0,
                        wins: 0,
                        losses: 0,
                        draws: 0
                    }
                });
            }
            
            return { success: true, user };
        } catch (error) {
            console.error('Google sign in error:', error);
            return { success: false, error: this.getAuthErrorMessage(error) };
        }
    }

    // Logout
    async logout() {
        try {
            await this.auth.signOut();
            this.currentUser = null;
            this.userData = null;
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get auth error message in Thai
    getAuthErrorMessage(error) {
        const errorMessages = {
            'auth/email-already-in-use': 'อีเมลนี้ถูกใช้งานแล้ว',
            'auth/invalid-email': 'อีเมลไม่ถูกต้อง',
            'auth/weak-password': 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร',
            'auth/user-not-found': 'ไม่พบบัญชีผู้ใช้',
            'auth/wrong-password': 'รหัสผ่านไม่ถูกต้อง',
            'auth/popup-closed-by-user': 'ปิดหน้าต่างล็อกอิน',
            'auth/cancelled-popup-request': 'คำขอถูกยกเลิก',
            'auth/invalid-credential': 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
        };
        return errorMessages[error.code] || error.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่';
    }

    // ========== USER DATA ==========
    
    // Get user data
    async getUserData(uid) {
        try {
            const doc = await this.db.collection('users').doc(uid).get();
            if (doc.exists) {
                return { id: doc.id, ...doc.data() };
            }
            return null;
        } catch (error) {
            console.error('Get user data error:', error);
            return null;
        }
    }

    // Get user data by username (for public profile)
    async getUserByUsername(username) {
        try {
            const snapshot = await this.db.collection('users')
                .where('username', '==', username)
                .where('isPublic', '==', true)
                .limit(1)
                .get();
            
            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                return { id: doc.id, ...doc.data() };
            }
            return null;
        } catch (error) {
            console.error('Get user by username error:', error);
            return null;
        }
    }

    // Update user profile
    async updateUserProfile(uid, data) {
        try {
            await this.db.collection('users').doc(uid).update({
                ...data,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true };
        } catch (error) {
            console.error('Update profile error:', error);
            return { success: false, error: error.message };
        }
    }

    // Update privacy setting
    async updatePrivacy(uid, isPublic) {
        return this.updateUserProfile(uid, { isPublic });
    }

    // ========== DRAFTS ==========
    
    // Save draft
    async saveDraft(draftData) {
        try {
            if (!this.currentUser) {
                return { success: false, error: 'กรุณาเข้าสู่ระบบก่อนบันทึกการดราฟ' };
            }

            const draft = {
                userId: this.currentUser.uid,
                userEmail: this.currentUser.email,
                userName: this.userData?.username || this.currentUser.displayName || 'Unknown',
                ...draftData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await this.db.collection('drafts').add(draft);
            
            // Update user stats
            await this.updateUserDraftStats(draftData.result);
            
            return { success: true, draftId: docRef.id };
        } catch (error) {
            console.error('Save draft error:', error);
            return { success: false, error: error.message };
        }
    }

    // Update user draft stats
    async updateUserDraftStats(result) {
        if (!this.currentUser) return;
        
        const userRef = this.db.collection('users').doc(this.currentUser.uid);
        const updateData = {
            'stats.totalDrafts': firebase.firestore.FieldValue.increment(1),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        if (result === 'win') {
            updateData['stats.wins'] = firebase.firestore.FieldValue.increment(1);
        } else if (result === 'lose') {
            updateData['stats.losses'] = firebase.firestore.FieldValue.increment(1);
        } else if (result === 'draw') {
            updateData['stats.draws'] = firebase.firestore.FieldValue.increment(1);
        }
        
        await userRef.update(updateData);
    }

    // Get user's drafts
    async getUserDrafts(uid, limit = 50) {
        try {
            const snapshot = await this.db.collection('drafts')
                .where('userId', '==', uid)
                .orderBy('createdAt', 'desc')
                .limit(limit)
                .get();
            
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Get user drafts error:', error);
            return [];
        }
    }

    // Get draft by ID
    async getDraftById(draftId) {
        try {
            const doc = await this.db.collection('drafts').doc(draftId).get();
            if (doc.exists) {
                return { id: doc.id, ...doc.data() };
            }
            return null;
        } catch (error) {
            console.error('Get draft error:', error);
            return null;
        }
    }

    // Delete draft
    async deleteDraft(draftId) {
        try {
            if (!this.currentUser) {
                return { success: false, error: 'กรุณาเข้าสู่ระบบ' };
            }
            
            // Verify ownership
            const draft = await this.getDraftById(draftId);
            if (!draft || draft.userId !== this.currentUser.uid) {
                return { success: false, error: 'ไม่มีสิทธิ์ลบรายการนี้' };
            }
            
            await this.db.collection('drafts').doc(draftId).delete();
            return { success: true };
        } catch (error) {
            console.error('Delete draft error:', error);
            return { success: false, error: error.message };
        }
    }

    // ========== ANALYTICS ==========
    
    // Get user analytics
    async getUserAnalytics(uid) {
        try {
            const drafts = await this.getUserDrafts(uid, 1000);
            
            if (drafts.length === 0) {
                return {
                    totalDrafts: 0,
                    wins: 0,
                    losses: 0,
                    draws: 0,
                    winRate: 0,
                    mostPickedHeroes: [],
                    mostBannedHeroes: [],
                    boStats: {},
                    heroWinRates: {}
                };
            }

            const stats = {
                totalDrafts: drafts.length,
                wins: drafts.filter(d => d.result === 'win').length,
                losses: drafts.filter(d => d.result === 'lose').length,
                draws: drafts.filter(d => d.result === 'draw').length,
                practice: drafts.filter(d => d.result === 'practice').length
            };
            
            stats.winRate = stats.totalDrafts > 0 
                ? ((stats.wins / (stats.totalDrafts - stats.practice)) * 100).toFixed(1)
                : 0;

            // Most picked heroes
            const pickCounts = {};
            const heroWinCounts = {};
            
            drafts.forEach(draft => {
                if (draft.games) {
                    draft.games.forEach(game => {
                        if (game.myPicks) {
                            game.myPicks.forEach(heroId => {
                                pickCounts[heroId] = (pickCounts[heroId] || 0) + 1;
                                if (!heroWinCounts[heroId]) {
                                    heroWinCounts[heroId] = { wins: 0, total: 0 };
                                }
                                heroWinCounts[heroId].total++;
                                if (draft.result === 'win') {
                                    heroWinCounts[heroId].wins++;
                                }
                            });
                        }
                    });
                }
            });

            stats.mostPickedHeroes = Object.entries(pickCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10);

            // Most banned heroes
            const banCounts = {};
            drafts.forEach(draft => {
                if (draft.games) {
                    draft.games.forEach(game => {
                        if (game.myBans) {
                            game.myBans.forEach(heroId => {
                                banCounts[heroId] = (banCounts[heroId] || 0) + 1;
                            });
                        }
                    });
                }
            });

            stats.mostBannedHeroes = Object.entries(banCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10);

            // BO stats
            const boStats = {};
            drafts.forEach(draft => {
                const bo = draft.bo || 1;
                if (!boStats[bo]) {
                    boStats[bo] = { total: 0, wins: 0, losses: 0 };
                }
                boStats[bo].total++;
                if (draft.result === 'win') boStats[bo].wins++;
                else if (draft.result === 'lose') boStats[bo].losses++;
            });
            
            Object.keys(boStats).forEach(bo => {
                const s = boStats[bo];
                s.winRate = s.total > 0 ? ((s.wins / s.total) * 100).toFixed(1) : 0;
            });
            stats.boStats = boStats;

            // Hero win rates
            stats.heroWinRates = {};
            Object.entries(heroWinCounts).forEach(([heroId, data]) => {
                stats.heroWinRates[heroId] = {
                    total: data.total,
                    wins: data.wins,
                    winRate: ((data.wins / data.total) * 100).toFixed(1)
                };
            });

            return stats;
        } catch (error) {
            console.error('Get analytics error:', error);
            return null;
        }
    }

    // ========== GLOBAL BANPICK (TEMPORARY) ==========
    
    // Save temporary match data for global banpick
    async saveTempMatch(matchId, matchData) {
        try {
            await this.db.collection('tempMatches').doc(matchId).set({
                ...matchData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // Expire after 24 hours
            });
            return { success: true };
        } catch (error) {
            console.error('Save temp match error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get temporary match data
    async getTempMatch(matchId) {
        try {
            const doc = await this.db.collection('tempMatches').doc(matchId).get();
            if (doc.exists) {
                return { id: doc.id, ...doc.data() };
            }
            return null;
        } catch (error) {
            console.error('Get temp match error:', error);
            return null;
        }
    }

    // Delete temporary match
    async deleteTempMatch(matchId) {
        try {
            await this.db.collection('tempMatches').doc(matchId).delete();
            return { success: true };
        } catch (error) {
            console.error('Delete temp match error:', error);
            return { success: false, error: error.message };
        }
    }
}

// Export singleton instance
export const firebaseService = new FirebaseService();
