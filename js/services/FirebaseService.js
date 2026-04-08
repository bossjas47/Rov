const firebaseConfig = {
    apiKey: "AIzaSyC450kePwL6FdVXUSVli0bEP3DdnQs0qzU",
    authDomain: "psl-esport.firebaseapp.com",
    projectId: "psl-esport",
    storageBucket: "psl-esport.firebasestorage.app",
    messagingSenderId: "225108570173",
    appId: "1:225108570173:web:b6483c02368908f3783a54"
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export class FirebaseService {
    constructor() { this.auth = auth; this.db = db; this.currentUser = null; this.userData = null; }
    getCurrentUser() { return this.currentUser; }
    isLoggedIn() { return !!this.currentUser; }
    onAuthStateChanged(callback) {
        this.auth.onAuthStateChanged(async (user) => {
            this.currentUser = user;
            if (user) this.userData = await this.getUserData(user.uid);
            else this.userData = null;
            callback(user, this.userData);
        });
    }
    async register(email, password, username) {
        try {
            const cred = await this.auth.createUserWithEmailAndPassword(email, password);
            await this.db.collection('users').doc(cred.user.uid).set({
                uid: cred.user.uid, email, username, displayName: username, photoURL: null,
                isPublic: true, teamName: '', bio: '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                stats: { totalDrafts: 0, wins: 0, losses: 0, draws: 0 }
            });
            await cred.user.updateProfile({ displayName: username });
            return { success: true, user: cred.user };
        } catch (e) { return { success: false, error: this.getError(e) }; }
    }
    async login(email, password) {
        try { const cred = await this.auth.signInWithEmailAndPassword(email, password); return { success: true, user: cred.user }; }
        catch (e) { return { success: false, error: this.getError(e) }; }
    }
    async signInWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await this.auth.signInWithPopup(provider);
            const user = result.user;
            const doc = await this.db.collection('users').doc(user.uid).get();
            if (!doc.exists) {
                await this.db.collection('users').doc(user.uid).set({
                    uid: user.uid, email: user.email, username: user.displayName || 'User',
                    displayName: user.displayName || 'User', photoURL: user.photoURL,
                    isPublic: true, teamName: '', bio: '',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    stats: { totalDrafts: 0, wins: 0, losses: 0, draws: 0 }
                });
            }
            return { success: true, user };
        } catch (e) { return { success: false, error: this.getError(e) }; }
    }
    async logout() { try { await this.auth.signOut(); this.currentUser = null; this.userData = null; return { success: true }; } catch (e) { return { success: false, error: e.message }; } }
    getError(e) {
        const msgs = { 'auth/email-already-in-use': 'อีเมลนี้ถูกใช้แล้ว', 'auth/invalid-email': 'อีเมลไม่ถูกต้อง', 'auth/weak-password': 'รหัสผ่านต้องมีอย่างน้อย 6 ตัว', 'auth/user-not-found': 'ไม่พบบัญชี', 'auth/wrong-password': 'รหัสผ่านไม่ถูกต้อง', 'auth/invalid-credential': 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' };
        return msgs[e.code] || e.message || 'เกิดข้อผิดพลาด';
    }
    async getUserData(uid) { const doc = await this.db.collection('users').doc(uid).get(); return doc.exists ? { id: doc.id, ...doc.data() } : null; }
    async updateUserProfile(uid, data) { try { await this.db.collection('users').doc(uid).update({ ...data, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }); return { success: true }; } catch (e) { return { success: false, error: e.message }; } }
    async updatePrivacy(uid, isPublic) { return this.updateUserProfile(uid, { isPublic }); }
    async saveDraft(draftData) {
        if (!this.currentUser) return { success: false, error: 'กรุณาเข้าสู่ระบบก่อนบันทึก' };
        try {
            const draft = { userId: this.currentUser.uid, userEmail: this.currentUser.email, userName: this.userData?.username || 'Unknown', ...draftData, createdAt: firebase.firestore.FieldValue.serverTimestamp(), updatedAt: firebase.firestore.FieldValue.serverTimestamp() };
            const ref = await this.db.collection('drafts').add(draft);
            await this.updateStats(draftData.result);
            return { success: true, draftId: ref.id };
        } catch (e) { return { success: false, error: e.message }; }
    }
    async updateStats(result) {
        if (!this.currentUser) return;
        const ref = this.db.collection('users').doc(this.currentUser.uid);
        const data = { 'stats.totalDrafts': firebase.firestore.FieldValue.increment(1), updatedAt: firebase.firestore.FieldValue.serverTimestamp() };
        if (result === 'win') data['stats.wins'] = firebase.firestore.FieldValue.increment(1);
        else if (result === 'lose') data['stats.losses'] = firebase.firestore.FieldValue.increment(1);
        else if (result === 'draw') data['stats.draws'] = firebase.firestore.FieldValue.increment(1);
        await ref.update(data);
    }
    async getUserDrafts(uid, limit = 50) {
        const snap = await this.db.collection('drafts').where('userId', '==', uid).orderBy('createdAt', 'desc').limit(limit).get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }
    async deleteDraft(draftId) {
        if (!this.currentUser) return { success: false, error: 'กรุณาเข้าสู่ระบบ' };
        const draft = await this.db.collection('drafts').doc(draftId).get();
        if (!draft.exists || draft.data().userId !== this.currentUser.uid) return { success: false, error: 'ไม่มีสิทธิ์ลบ' };
        await this.db.collection('drafts').doc(draftId).delete();
        return { success: true };
    }
    async getUserAnalytics(uid) {
        const drafts = await this.getUserDrafts(uid, 1000);
        if (drafts.length === 0) return { totalDrafts: 0, wins: 0, losses: 0, draws: 0, winRate: 0, mostPickedHeroes: [], mostBannedHeroes: [], boStats: {}, heroWinRates: {} };
        const stats = { totalDrafts: drafts.length, wins: drafts.filter(d => d.result === 'win').length, losses: drafts.filter(d => d.result === 'lose').length, draws: drafts.filter(d => d.result === 'draw').length };
        stats.winRate = stats.totalDrafts > 0 ? ((stats.wins / (stats.totalDrafts - drafts.filter(d => d.result === 'practice').length)) * 100).toFixed(1) : 0;
        const pickCounts = {}, heroWinCounts = {};
        drafts.forEach(d => { if (d.games) d.games.forEach(g => { if (g.myPicks) g.myPicks.forEach(id => { pickCounts[id] = (pickCounts[id] || 0) + 1; if (!heroWinCounts[id]) heroWinCounts[id] = { wins: 0, total: 0 }; heroWinCounts[id].total++; if (d.result === 'win') heroWinCounts[id].wins++; }); }); });
        stats.mostPickedHeroes = Object.entries(pickCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
        const banCounts = {};
        drafts.forEach(d => { if (d.games) d.games.forEach(g => { if (g.myBans) g.myBans.forEach(id => banCounts[id] = (banCounts[id] || 0) + 1); }); });
        stats.mostBannedHeroes = Object.entries(banCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
        const boStats = {};
        drafts.forEach(d => { const bo = d.bo || 1; if (!boStats[bo]) boStats[bo] = { total: 0, wins: 0, losses: 0 }; boStats[bo].total++; if (d.result === 'win') boStats[bo].wins++; else if (d.result === 'lose') boStats[bo].losses++; });
        Object.keys(boStats).forEach(bo => { const s = boStats[bo]; s.winRate = s.total > 0 ? ((s.wins / s.total) * 100).toFixed(1) : 0; });
        stats.boStats = boStats;
        stats.heroWinRates = {};
        Object.entries(heroWinCounts).forEach(([id, d]) => { stats.heroWinRates[id] = { total: d.total, wins: d.wins, winRate: ((d.wins / d.total) * 100).toFixed(1) }; });
        return stats;
    }
}
export const firebaseService = new FirebaseService();
