// ROV Draft Pro - Shared Library (No ES6 Modules)

// ============== HEROES DATA ==============
const heroesData = [
    { id: 1, heroId: "valhein", name: "Valhein", thaiName: "Valhein", role: "marksman", imageFile: "valhein.png" },
    { id: 2, heroId: "zanis", name: "Zanis", thaiName: "Zanis", role: "fighter", imageFile: "zanis.png" },
    { id: 3, heroId: "yorn", name: "Yorn", thaiName: "Yorn", role: "marksman", imageFile: "yorn.png" },
    { id: 4, heroId: "thane", name: "Thane", thaiName: "Thane", role: "tank", imageFile: "thane.png" },
    { id: 5, heroId: "krixi", name: "Krixi", thaiName: "Krixi", role: "mage", imageFile: "krixi.png" },
    { id: 6, heroId: "ormarr", name: "Ormarr", thaiName: "Ormarr", role: "fighter", imageFile: "ormarr.png" },
    { id: 7, heroId: "zephys", name: "Zephys", thaiName: "Zephys", role: "assassin", imageFile: "zephys.png" },
    { id: 8, heroId: "lu_bu", name: "Lu Bu", thaiName: "Lu Bu", role: "fighter", imageFile: "lu_bu.png" },
    { id: 9, heroId: "alice", name: "Alice", thaiName: "Alice", role: "support", imageFile: "alice.png" },
    { id: 10, heroId: "mganga", name: "Mganga", thaiName: "Mganga", role: "mage", imageFile: "mganga.png" },
    { id: 11, heroId: "gildur", name: "Gildur", thaiName: "Gildur", role: "tank", imageFile: "gildur.png" },
    { id: 12, heroId: "butterfly", name: "Butterfly", thaiName: "Butterfly", role: "assassin", imageFile: "butterfly.png" },
    { id: 13, heroId: "taara", name: "Taara", thaiName: "Taara", role: "tank", imageFile: "taara.png" },
    { id: 14, heroId: "veera", name: "Veera", thaiName: "Veera", role: "mage", imageFile: "veera.png" },
    { id: 15, heroId: "azzen_ka", name: "Azzen'Ka", thaiName: "Azzen'Ka", role: "mage", imageFile: "azzen_ka.png" },
    { id: 16, heroId: "mina", name: "Mina", thaiName: "Mina", role: "tank", imageFile: "mina.png" },
    { id: 17, heroId: "toro", name: "Toro", thaiName: "Toro", role: "tank", imageFile: "toro.png" },
    { id: 18, heroId: "violet", name: "Violet", thaiName: "Violet", role: "marksman", imageFile: "violet.png" },
    { id: 19, heroId: "chaugnar", name: "Chaugnar", thaiName: "Chaugnar", role: "support", imageFile: "chaugnar.png" },
    { id: 20, heroId: "kriknak", name: "Kriknak", thaiName: "Kriknak", role: "assassin", imageFile: "kriknak.png" },
    { id: 21, heroId: "omega", name: "Omega", thaiName: "Omega", role: "tank", imageFile: "omega.png" },
    { id: 22, heroId: "kahlii", name: "Kahlii", thaiName: "Kahlii", role: "mage", imageFile: "kahlii.png" },
    { id: 23, heroId: "skud", name: "Skud", thaiName: "Skud", role: "fighter", imageFile: "skud.png" },
    { id: 24, heroId: "ignis", name: "Ignis", thaiName: "Ignis", role: "mage", imageFile: "ignis.png" },
    { id: 25, heroId: "airi", name: "Airi", thaiName: "Airi", role: "assassin", imageFile: "airi.png" },
    { id: 26, heroId: "preyta", name: "Preyta", thaiName: "Preyta", role: "mage", imageFile: "preyta.png" },
    { id: 27, heroId: "slimz", name: "Slimz", thaiName: "Slimz", role: "marksman", imageFile: "slimz.png" },
    { id: 28, heroId: "arthur", name: "Arthur", thaiName: "Arthur", role: "fighter", imageFile: "arthur.png" },
    { id: 29, heroId: "jinnar", name: "Jinnar", thaiName: "Jinnar", role: "mage", imageFile: "jinnar.png" },
    { id: 30, heroId: "maloch", name: "Maloch", thaiName: "Maloch", role: "fighter", imageFile: "maloch.png" },
    { id: 31, heroId: "cresht", name: "Cresht", thaiName: "Cresht", role: "support", imageFile: "cresht.png" },
    { id: 32, heroId: "natalya", name: "Natalya", thaiName: "Natalya", role: "mage", imageFile: "natalya.png" },
    { id: 33, heroId: "peura", name: "Peura", thaiName: "Peura", role: "support", imageFile: "peura.png" },
    { id: 34, heroId: "lumburr", name: "Lumburr", thaiName: "Lumburr", role: "support", imageFile: "lumburr.png" },
    { id: 35, heroId: "aleister", name: "Aleister", thaiName: "Aleister", role: "mage", imageFile: "aleister.png" },
    { id: 36, heroId: "fennik", name: "Fennik", thaiName: "Fennik", role: "marksman", imageFile: "fennik.png" },
    { id: 37, heroId: "grakk", name: "Grakk", thaiName: "Grakk", role: "support", imageFile: "grakk.png" },
    { id: 38, heroId: "nakroth", name: "Nakroth", thaiName: "Nakroth", role: "assassin", imageFile: "nakroth.png" },
    { id: 39, heroId: "diao_chan", name: "Diao Chan", thaiName: "Diao Chan", role: "mage", imageFile: "diao_chan.png" },
    { id: 40, heroId: "lauriel", name: "Lauriel", thaiName: "Lauriel", role: "mage", imageFile: "lauriel.png" },
    { id: 41, heroId: "zill", name: "Zill", thaiName: "Zill", role: "assassin", imageFile: "zill.png" },
    { id: 42, heroId: "murad", name: "Murad", thaiName: "Murad", role: "assassin", imageFile: "murad.png" },
    { id: 43, heroId: "raz", name: "Raz", thaiName: "Raz", role: "assassin", imageFile: "raz.png" },
    { id: 44, heroId: "zuka", name: "Zuka", thaiName: "Zuka", role: "fighter", imageFile: "zuka.png" },
    { id: 45, heroId: "tel_annas", name: "Tel'Annas", thaiName: "Tel'Annas", role: "marksman", imageFile: "tel_annas.png" },
    { id: 46, heroId: "kil_groth", name: "Kil'Groth", thaiName: "Kil'Groth", role: "fighter", imageFile: "kil_groth.png" },
    { id: 47, heroId: "ryoma", name: "Ryoma", thaiName: "Ryoma", role: "assassin", imageFile: "ryoma.png" },
    { id: 48, heroId: "superman", name: "Superman", thaiName: "Superman", role: "fighter", imageFile: "superman.png" },
    { id: 49, heroId: "wonder_woman", name: "Wonder Woman", thaiName: "Wonder Woman", role: "fighter", imageFile: "wonder_woman.png" },
    { id: 50, heroId: "moren", name: "Moren", thaiName: "Moren", role: "marksman", imageFile: "moren.png" },
    { id: 51, heroId: "xeniel", name: "Xeniel", thaiName: "Xeniel", role: "tank", imageFile: "xeniel.png" },
    { id: 52, heroId: "lindis", name: "Lindis", thaiName: "Lindis", role: "marksman", imageFile: "lindis.png" },
    { id: 53, heroId: "teemee", name: "TeeMee", thaiName: "TeeMee", role: "support", imageFile: "teemee.png" },
    { id: 54, heroId: "tulen", name: "Tulen", thaiName: "Tulen", role: "mage", imageFile: "tulen.png" },
    { id: 55, heroId: "omen", name: "Omen", thaiName: "Omen", role: "fighter", imageFile: "omen.png" },
    { id: 56, heroId: "max", name: "Max", thaiName: "Max", role: "marksman", imageFile: "max.png" },
    { id: 57, heroId: "liliana", name: "Liliana", thaiName: "Liliana", role: "mage", imageFile: "liliana.png" },
    { id: 58, heroId: "wisp", name: "Wisp", thaiName: "Wisp", role: "marksman", imageFile: "wisp.png" },
    { id: 59, heroId: "the_flash", name: "The Flash", thaiName: "The Flash", role: "assassin", imageFile: "the_flash.png" },
    { id: 60, heroId: "arum", name: "Arum", thaiName: "Arum", role: "support", imageFile: "arum.png" },
    { id: 61, heroId: "rourke", name: "Rourke", thaiName: "Rourke", role: "marksman", imageFile: "rourke.png" },
    { id: 62, heroId: "marja", name: "Marja", thaiName: "Marja", role: "mage", imageFile: "marja.png" },
    { id: 63, heroId: "baldum", name: "Baldum", thaiName: "Baldum", role: "tank", imageFile: "baldum.png" },
    { id: 64, heroId: "roxie", name: "Roxie", thaiName: "Roxie", role: "tank", imageFile: "roxie.png" },
    { id: 65, heroId: "annette", name: "Annette", thaiName: "Annette", role: "support", imageFile: "annette.png" },
    { id: 66, heroId: "amily", name: "Amily", thaiName: "Amily", role: "fighter", imageFile: "amily.png" },
    { id: 67, heroId: "y_bneth", name: "Y'bneth", thaiName: "Y'bneth", role: "tank", imageFile: "y_bneth.png" },
    { id: 68, heroId: "elsu", name: "Elsu", thaiName: "Elsu", role: "marksman", imageFile: "elsu.png" },
    { id: 69, heroId: "riktor", name: "Riktor", thaiName: "Riktor", role: "fighter", imageFile: "riktor.png" },
    { id: 70, heroId: "wiro", name: "Wiro", thaiName: "Wiro", role: "tank", imageFile: "wiro.png" },
    { id: 71, heroId: "quillen", name: "Quillen", thaiName: "Quillen", role: "assassin", imageFile: "quillen.png" },
    { id: 72, heroId: "florentino", name: "Florentino", thaiName: "Florentino", role: "fighter", imageFile: "florentino.png" },
    { id: 73, heroId: "sephera", name: "Sephera", thaiName: "Sephera", role: "support", imageFile: "sephera.png" },
    { id: 74, heroId: "darcy", name: "D'Arcy", thaiName: "D'Arcy", role: "mage", imageFile: "darcy.png" },
    { id: 75, heroId: "veres", name: "Veres", thaiName: "Veres", role: "fighter", imageFile: "veres.png" },
    { id: 76, heroId: "hayate", name: "Hayate", thaiName: "Hayate", role: "marksman", imageFile: "hayate.png" },
    { id: 77, heroId: "capheny", name: "Capheny", thaiName: "Capheny", role: "marksman", imageFile: "capheny.png" },
    { id: 78, heroId: "errol", name: "Errol", thaiName: "Errol", role: "fighter", imageFile: "errol.png" },
    { id: 79, heroId: "yena", name: "Yena", thaiName: "Yena", role: "fighter", imageFile: "yena.png" },
    { id: 80, heroId: "enzo", name: "Enzo", thaiName: "Enzo", role: "assassin", imageFile: "enzo.png" },
    { id: 81, heroId: "zip", name: "Zip", thaiName: "Zip", role: "support", imageFile: "zip.png" },
    { id: 82, heroId: "qi", name: "Qi", thaiName: "Qi", role: "fighter", imageFile: "qi.png" },
    { id: 83, heroId: "celica", name: "Celica", thaiName: "Celica", role: "marksman", imageFile: "celica.png" },
    { id: 84, heroId: "volkath", name: "Volkath", thaiName: "Volkath", role: "fighter", imageFile: "volkath.png" },
    { id: 85, heroId: "krizzix", name: "Krizzix", thaiName: "Krizzix", role: "support", imageFile: "krizzix.png" },
    { id: 86, heroId: "elandorr", name: "Eland'orr", thaiName: "Eland'orr", role: "marksman", imageFile: "elandorr.png" },
    { id: 87, heroId: "ishar", name: "Ishar", thaiName: "Ishar", role: "mage", imageFile: "ishar.png" },
    { id: 88, heroId: "dirak", name: "Dirak", thaiName: "Dirak", role: "mage", imageFile: "dirak.png" },
    { id: 89, heroId: "keera", name: "Keera", thaiName: "Keera", role: "assassin", imageFile: "keera.png" },
    { id: 90, heroId: "ata", name: "Ata", thaiName: "Ata", role: "tank", imageFile: "ata.png" },
    { id: 91, heroId: "paine", name: "Paine", thaiName: "Paine", role: "assassin", imageFile: "paine.png" },
    { id: 92, heroId: "laville", name: "Laville", thaiName: "Laville", role: "marksman", imageFile: "laville.png" },
    { id: 93, heroId: "rouie", name: "Rouie", thaiName: "Rouie", role: "support", imageFile: "rouie.png" },
    { id: 94, heroId: "zata", name: "Zata", thaiName: "Zata", role: "mage", imageFile: "zata.png" },
    { id: 95, heroId: "allain", name: "Allain", thaiName: "Allain", role: "fighter", imageFile: "allain.png" },
    { id: 96, heroId: "thorne", name: "Thorne", thaiName: "Thorne", role: "marksman", imageFile: "thorne.png" },
    { id: 97, heroId: "sinestrea", name: "Sinestrea", thaiName: "Sinestrea", role: "assassin", imageFile: "sinestrea.png" },
    { id: 98, heroId: "dextra", name: "Dextra", thaiName: "Dextra", role: "fighter", imageFile: "dextra.png" },
    { id: 99, heroId: "lorion", name: "Lorion", thaiName: "Lorion", role: "mage", imageFile: "lorion.png" },
    { id: 100, heroId: "bright", name: "Bright", thaiName: "Bright", role: "assassin", imageFile: "bright.png" },
    { id: 101, heroId: "aoi", name: "Aoi", thaiName: "Aoi", role: "assassin", imageFile: "aoi.png" },
    { id: 102, heroId: "iggy", name: "Iggy", thaiName: "Iggy", role: "mage", imageFile: "iggy.png" },
    { id: 103, heroId: "tachi", name: "Tachi", thaiName: "Tachi", role: "fighter", imageFile: "tachi.png" },
    { id: 104, heroId: "aya", name: "Aya", thaiName: "Aya", role: "support", imageFile: "aya.png" },
    { id: 105, heroId: "yue", name: "Yue", thaiName: "Yue", role: "mage", imageFile: "yue.png" },
    { id: 106, heroId: "yan", name: "Yan", thaiName: "Yan", role: "fighter", imageFile: "yan.png" },
    { id: 107, heroId: "helen", name: "Helen", thaiName: "Helen", role: "support", imageFile: "helen.png" },
    { id: 108, heroId: "teeri", name: "Teeri", thaiName: "Teeri", role: "marksman", imageFile: "teeri.png" },
    { id: 109, heroId: "bonnie", name: "Bonnie", thaiName: "Bonnie", role: "marksman", imageFile: "bonnie.png" },
    { id: 110, heroId: "bijan", name: "Bijan", thaiName: "Bijan", role: "assassin", imageFile: "bijan.png" },
    { id: 111, heroId: "kaine", name: "Kaine", thaiName: "Kaine", role: "assassin", imageFile: "kaine.png" },
    { id: 112, heroId: "stuart", name: "Stuart", thaiName: "Stuart", role: "marksman", imageFile: "stuart.png" },
    { id: 113, heroId: "ming", name: "Ming", thaiName: "Ming", role: "mage", imageFile: "ming.png" },
    { id: 114, heroId: "erin", name: "Erin", thaiName: "Erin", role: "marksman", imageFile: "erin.png" },
    { id: 115, heroId: "charlotte", name: "Charlotte", thaiName: "Charlotte", role: "fighter", imageFile: "charlotte.png" },
    { id: 116, heroId: "dolia", name: "Dolia", thaiName: "Dolia", role: "support", imageFile: "dolia.png" },
    { id: 117, heroId: "biron", name: "Biron", thaiName: "Biron", role: "fighter", imageFile: "biron.png" },
    { id: 118, heroId: "bolt_baron", name: "Bolt Baron", thaiName: "Bolt Baron", role: "marksman", imageFile: "bolt_baron.png" },
    { id: 119, heroId: "billow", name: "Billow", thaiName: "Billow", role: "assassin", imageFile: "billow.png" },
    { id: 120, heroId: "heino", name: "Heino", thaiName: "Heino", role: "mage", imageFile: "heino.png" },
    { id: 121, heroId: "goverra", name: "Goverra", thaiName: "Goverra", role: "tank", imageFile: "goverra.png" },
    { id: 122, heroId: "edras", name: "Edras", thaiName: "Edras", role: "marksman", imageFile: "edras.png" },
    { id: 123, heroId: "dyadia", name: "Dyadia", thaiName: "Dyadia", role: "mage", imageFile: "dyadia.png" },
    { id: 124, heroId: "arduin", name: "Arduin", thaiName: "Arduin", role: "tank", imageFile: "arduin.png" },
    { id: 125, heroId: "astrid", name: "Astrid", thaiName: "Astrid", role: "fighter", imageFile: "astrid.png" },
    { id: 126, heroId: "brunhilda", name: "Brunhilda", thaiName: "Brunhilda", role: "marksman", imageFile: "brunhilda.png" },
    { id: 127, heroId: "flowborn", name: "Flowborn", thaiName: "Flowborn", role: "marksman", imageFile: "flowborn.png" }
];

const heroes = heroesData;

// META Heroes from RPL Summer 2026 (Top 30 by Pick Rate from Liquipedia)
const metaHeroIds = [17, 62, 76, 103, 67, 86, 82, 116, 102, 112, 119, 99, 94, 122, 36, 58, 93, 77, 7, 13, 53, 79, 57, 89, 97, 10, 23, 1, 117, 47];

const roleColors = {
    meta: '#f59e0b',
    tank: '#3b82f6',
    fighter: '#f97316',
    assassin: '#a855f7',
    mage: '#06b6d4',
    marksman: '#ef4444',
    support: '#22c55e'
};

const roleLabels = {
    meta: 'META',
    all: 'ALL',
    tank: 'TANK',
    fighter: 'FIGHTER',
    assassin: 'ASSASSIN',
    mage: 'MAGE',
    marksman: 'MARKSMAN',
    support: 'SUPPORT'
};

function getHeroById(id) {
    return heroesData.find(h => h.id.toString() === id.toString());
}

function getHeroesByRole(role) {
    if (role === 'all') return heroesData;
    if (role === 'meta') return heroesData.filter(h => metaHeroIds.includes(h.id));
    return heroesData.filter(h => h.role === role);
}

function searchHeroes(query) {
    const q = query.toLowerCase();
    return heroesData.filter(h => 
        h.name.toLowerCase().includes(q) || 
        h.heroId.toLowerCase().includes(q)
    );
}

// ============== TOAST MANAGER ==============
class ToastManager {
    constructor() {
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.className = 'fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none';
            document.body.appendChild(this.container);
        }
    }
    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        const styles = { success: 'from-green-500 to-emerald-600', error: 'from-red-500 to-rose-600', warning: 'from-amber-500 to-orange-600', info: 'from-blue-500 to-indigo-600', ban: 'from-gray-600 to-gray-700', pick: 'from-purple-500 to-pink-600' };
        toast.className = `toast pointer-events-auto min-w-[280px] max-w-[400px] p-4 rounded-xl shadow-xl flex items-start gap-3 bg-gradient-to-r ${styles[type] || styles.info} text-white`;
        toast.innerHTML = `<div class="flex-1"><p class="text-sm font-medium">${message}</p></div><button class="flex-shrink-0 opacity-60 hover:opacity-100" onclick="this.parentElement.remove()">✕</button>`;
        this.container.appendChild(toast);
        setTimeout(() => { toast.classList.add('hiding'); setTimeout(() => toast.remove(), 300); }, duration);
    }
    ban(heroName, team) { const color = team === 'blue' ? 'text-blue-600' : 'text-red-600'; this.show(`<span class="${color} font-bold">${team === 'blue' ? 'Blue' : 'Red'}</span> แบน <b>${heroName}</b>`, 'ban'); }
    pick(heroName, team) { const color = team === 'blue' ? 'text-blue-600' : 'text-red-600'; this.show(`<span class="${color} font-bold">${team === 'blue' ? 'Blue' : 'Red'}</span> เลือก <b>${heroName}</b>`, 'pick'); }
}

// ============== FIREBASE SERVICE ==============
const firebaseConfig = {
    apiKey: "AIzaSyC450kePwL6FdVXUSVli0bEP3DdnQs0qzU",
    authDomain: "psl-esport.firebaseapp.com",
    projectId: "psl-esport",
    storageBucket: "psl-esport.firebasestorage.app",
    messagingSenderId: "225108570173",
    appId: "1:225108570173:web:b6483c02368908f3783a54"
};

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = typeof firebase !== 'undefined' ? firebase.auth() : null;
const db = typeof firebase !== 'undefined' ? firebase.firestore() : null;

class FirebaseService {
    constructor() { 
        this.auth = auth; 
        this.db = db; 
        this.currentUser = null; 
        this.userData = null; 
    }
    getCurrentUser() { return this.currentUser; }
    isLoggedIn() { return !!this.currentUser; }
    onAuthStateChanged(callback) {
        if (!this.auth) return;
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
    async getUserDrafts(uid, limitCount = 50) {
        const snap = await this.db.collection('drafts').where('userId', '==', uid).orderBy('createdAt', 'desc').limit(limitCount).get();
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

const firebaseService = new FirebaseService();

// ============== AUTH MANAGER ==============
class AuthManager {
    constructor() {
        this.toast = new ToastManager();
        this.onAuthChange = null;
        this.init();
    }
    init() {
        firebaseService.onAuthStateChanged((user, userData) => {
            this.updateUI(user, userData);
            if (this.onAuthChange) this.onAuthChange(user, userData);
        });
    }
    updateUI(user, userData) {
        const loginBanner = document.getElementById('loginBanner');
        const sidebarUserInfo = document.getElementById('sidebarUserInfo');
        if (user) {
            if (loginBanner) loginBanner.style.display = 'none';
            if (sidebarUserInfo) {
                const name = userData?.username || user.displayName || 'User';
                const photo = userData?.photoURL || user.photoURL;
                sidebarUserInfo.innerHTML = `<div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden">${photo ? `<img src="${photo}" class="w-full h-full object-cover">` : `<span class="text-white font-bold text-sm">${name.charAt(0).toUpperCase()}</span>`}</div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-800 truncate">${name}</p><p class="text-xs text-green-600 flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-green-500"></span>ออนไลน์</p></div><button onclick="authManager.logout()" class="p-2 rounded-lg hover:bg-gray-200" title="ออกจากระบบ"><i data-lucide="log-out" class="w-4 h-4 text-gray-600"></i></button>`;
                if (window.lucide) lucide.createIcons();
            }
        } else {
            if (loginBanner) loginBanner.style.display = 'block';
            if (sidebarUserInfo) { 
                sidebarUserInfo.innerHTML = `<div class="w-10 h-10 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center"><i data-lucide="user" class="w-5 h-5 text-white"></i></div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-800 truncate">ผู้เยี่ยมชม</p><p class="text-xs text-gray-500">กรุณาเข้าสู่ระบบ</p></div>`; 
                if (window.lucide) lucide.createIcons(); 
            }
        }
    }
    showLoginModal() { document.getElementById('loginModal')?.classList.remove('hidden'); document.getElementById('registerModal')?.classList.add('hidden'); }
    closeLoginModal() { document.getElementById('loginModal')?.classList.add('hidden'); }
    showRegisterModal() { document.getElementById('registerModal')?.classList.remove('hidden'); document.getElementById('loginModal')?.classList.add('hidden'); }
    closeRegisterModal() { document.getElementById('registerModal')?.classList.add('hidden'); }
    async login(email, password) { const r = await firebaseService.login(email, password); if (r.success) { this.toast.show('เข้าสู่ระบบสำเร็จ!', 'success'); this.closeLoginModal(); } else this.toast.show(r.error, 'error'); return r; }
    async register(email, password, username) { const r = await firebaseService.register(email, password, username); if (r.success) { this.toast.show('สมัครสมาชิกสำเร็จ!', 'success'); this.closeRegisterModal(); } else this.toast.show(r.error, 'error'); return r; }
    async signInWithGoogle() { const r = await firebaseService.signInWithGoogle(); if (r.success) { this.toast.show('เข้าสู่ระบบด้วย Google สำเร็จ!', 'success'); this.closeLoginModal(); } else this.toast.show(r.error, 'error'); return r; }
    async logout() { const r = await firebaseService.logout(); if (r.success) this.toast.show('ออกจากระบบสำเร็จ', 'info'); else this.toast.show(r.error, 'error'); return r; }
    isLoggedIn() { return firebaseService.isLoggedIn(); }
    getCurrentUser() { return firebaseService.getCurrentUser(); }
    requireLogin(msg = 'กรุณาเข้าสู่ระบบก่อน') { if (!this.isLoggedIn()) { this.toast.show(msg, 'warning'); this.showLoginModal(); return false; } return true; }
}

const authManager = new AuthManager();
window.authManager = authManager;

// ============== SIDEBAR TOGGLE ==============
window.toggleSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) {
        const isOpen = sidebar.classList.contains('open');
        if (isOpen) {
            sidebar.classList.remove('open');
            sidebar.style.transform = 'translateX(-100%)';
        } else {
            sidebar.classList.add('open');
            sidebar.style.transform = 'translateX(0)';
        }
    }
    if (overlay) overlay.classList.toggle('hidden');
};
