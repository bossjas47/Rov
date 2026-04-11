// ROV Draft Pro - Combined JavaScript (No ES6 Modules)

// ============== HEROES DATA ==============
const heroesData = [
    { id: 1, heroId: "valhein", name: "Valhein", thaiName: "วัลเฮน", role: "marksman", imageFile: "valhein.png" },
    { id: 2, heroId: "zanis", name: "Zanis", thaiName: "ซานิส", role: "fighter", imageFile: "zanis.png" },
    { id: 3, heroId: "yorn", name: "Yorn", thaiName: "ยอร์น", role: "marksman", imageFile: "yorn.png" },
    { id: 4, heroId: "thane", name: "Thane", thaiName: "เธน", role: "tank", imageFile: "thane.png" },
    { id: 5, heroId: "krixi", name: "Krixi", thaiName: "คริกซี่", role: "mage", imageFile: "krixi.png" },
    { id: 6, heroId: "ormarr", name: "Ormarr", thaiName: "ออร์มาร์", role: "fighter", imageFile: "ormarr.png" },
    { id: 7, heroId: "zephys", name: "Zephys", thaiName: "เซฟิส", role: "assassin", imageFile: "zephys.png" },
    { id: 8, heroId: "lu_bu", name: "Lu Bu", thaiName: "ลิโป้", role: "fighter", imageFile: "lu_bu.png" },
    { id: 9, heroId: "alice", name: "Alice", thaiName: "อลิซ", role: "support", imageFile: "alice.png" },
    { id: 10, heroId: "mganga", name: "Mganga", thaiName: "เอ็มกังก้า", role: "mage", imageFile: "mganga.png" },
    { id: 11, heroId: "gildur", name: "Gildur", thaiName: "กิลดูร์", role: "tank", imageFile: "gildur.png" },
    { id: 12, heroId: "butterfly", name: "Butterfly", thaiName: "บัตเตอร์ฟลาย", role: "assassin", imageFile: "butterfly.png" },
    { id: 13, heroId: "taara", name: "Taara", thaiName: "ทาร่า", role: "tank", imageFile: "taara.png" },
    { id: 14, heroId: "veera", name: "Veera", thaiName: "วีร่า", role: "mage", imageFile: "veera.png" },
    { id: 15, heroId: "azzen_ka", name: "Azzen'Ka", thaiName: "อัสเซนก้า", role: "mage", imageFile: "azzen_ka.png" },
    { id: 16, heroId: "mina", name: "Mina", thaiName: "มีน่า", role: "tank", imageFile: "mina.png" },
    { id: 17, heroId: "toro", name: "Toro", thaiName: "โทโร่", role: "tank", imageFile: "toro.png" },
    { id: 18, heroId: "violet", name: "Violet", thaiName: "ไวโอเลต", role: "marksman", imageFile: "violet.png" },
    { id: 19, heroId: "chaugnar", name: "Chaugnar", thaiName: "ชอว์นาร์", role: "support", imageFile: "chaugnar.png" },
    { id: 20, heroId: "kriknak", name: "Kriknak", thaiName: "คริกแน็ก", role: "assassin", imageFile: "kriknak.png" },
    { id: 21, heroId: "omega", name: "Omega", thaiName: "โอเมก้า", role: "tank", imageFile: "omega.png" },
    { id: 22, heroId: "kahlii", name: "Kahlii", thaiName: "คาลี่", role: "mage", imageFile: "kahlii.png" },
    { id: 23, heroId: "skud", name: "Skud", thaiName: "สกัด", role: "fighter", imageFile: "skud.png" },
    { id: 24, heroId: "ignis", name: "Ignis", thaiName: "อิกนิส", role: "mage", imageFile: "ignis.png" },
    { id: 25, heroId: "airi", name: "Airi", thaiName: "ไอริ", role: "assassin", imageFile: "airi.png" },
    { id: 26, heroId: "preyta", name: "Preyta", thaiName: "เพรย์ต้า", role: "mage", imageFile: "preyta.png" },
    { id: 27, heroId: "slimz", name: "Slimz", thaiName: "สลิมซ์", role: "marksman", imageFile: "slimz.png" },
    { id: 28, heroId: "arthur", name: "Arthur", thaiName: "อาร์เธอร์", role: "fighter", imageFile: "arthur.png" },
    { id: 29, heroId: "jinnar", name: "Jinnar", thaiName: "จินนาร์", role: "mage", imageFile: "jinnar.png" },
    { id: 30, heroId: "maloch", name: "Maloch", thaiName: "มาล็อค", role: "fighter", imageFile: "maloch.png" },
    { id: 31, heroId: "cresht", name: "Cresht", thaiName: "เครสช์", role: "support", imageFile: "cresht.png" },
    { id: 32, heroId: "natalya", name: "Natalya", thaiName: "นาตาลย่า", role: "mage", imageFile: "natalya.png" },
    { id: 33, heroId: "peura", name: "Peura", thaiName: "พีอูร่า", role: "support", imageFile: "peura.png" },
    { id: 34, heroId: "lumburr", name: "Lumburr", thaiName: "ลัมเบอร์", role: "support", imageFile: "lumburr.png" },
    { id: 35, heroId: "aleister", name: "Aleister", thaiName: "อเลสเตอร์", role: "mage", imageFile: "aleister.png" },
    { id: 36, heroId: "fennik", name: "Fennik", thaiName: "เฟนนิก", role: "marksman", imageFile: "fennik.png" },
    { id: 37, heroId: "grakk", name: "Grakk", thaiName: "แกร็ก", role: "support", imageFile: "grakk.png" },
    { id: 38, heroId: "nakroth", name: "Nakroth", thaiName: "นาครอธ", role: "assassin", imageFile: "nakroth.png" },
    { id: 39, heroId: "diao_chan", name: "Diao Chan", thaiName: "เตียวเสี้ยน", role: "mage", imageFile: "diao_chan.png" },
    { id: 40, heroId: "lauriel", name: "Lauriel", thaiName: "ลอริเอล", role: "mage", imageFile: "lauriel.png" },
    { id: 41, heroId: "zill", name: "Zill", thaiName: "ซิล", role: "assassin", imageFile: "zill.png" },
    { id: 42, heroId: "murad", name: "Murad", thaiName: "มูราด", role: "assassin", imageFile: "murad.png" },
    { id: 43, heroId: "raz", name: "Raz", thaiName: "แรซ", role: "assassin", imageFile: "raz.png" },
    { id: 44, heroId: "zuka", name: "Zuka", thaiName: "ซูก้า", role: "fighter", imageFile: "zuka.png" },
    { id: 45, heroId: "tel_annas", name: "Tel'Annas", thaiName: "เทลอันนัส", role: "marksman", imageFile: "tel_annas.png" },
    { id: 46, heroId: "kil_groth", name: "Kil'Groth", thaiName: "คิลกรอธ", role: "fighter", imageFile: "kil_groth.png" },
    { id: 47, heroId: "ryoma", name: "Ryoma", thaiName: "รโยมะ", role: "assassin", imageFile: "ryoma.png" },
    { id: 48, heroId: "superman", name: "Superman", thaiName: "ซูเปอร์แมน", role: "fighter", imageFile: "superman.png" },
    { id: 49, heroId: "wonder_woman", name: "Wonder Woman", thaiName: "วันเดอร์วูแมน", role: "fighter", imageFile: "wonder_woman.png" },
    { id: 50, heroId: "moren", name: "Moren", thaiName: "มอเรน", role: "marksman", imageFile: "moren.png" },
    { id: 51, heroId: "xeniel", name: "Xeniel", thaiName: "เซนีล", role: "tank", imageFile: "xeniel.png" },
    { id: 52, heroId: "lindis", name: "Lindis", thaiName: "ลินดิส", role: "marksman", imageFile: "lindis.png" },
    { id: 53, heroId: "teemee", name: "TeeMee", thaiName: "ทีมี่", role: "support", imageFile: "teemee.png" },
    { id: 54, heroId: "tulen", name: "Tulen", thaiName: "ทูเลน", role: "mage", imageFile: "tulen.png" },
    { id: 55, heroId: "omen", name: "Omen", thaiName: "โอเมน", role: "fighter", imageFile: "omen.png" },
    { id: 56, heroId: "max", name: "Max", thaiName: "แม็กซ์", role: "marksman", imageFile: "max.png" },
    { id: 57, heroId: "liliana", name: "Liliana", thaiName: "ลิเลียน่า", role: "mage", imageFile: "liliana.png" },
    { id: 58, heroId: "wisp", name: "Wisp", thaiName: "วิสป์", role: "marksman", imageFile: "wisp.png" },
    { id: 59, heroId: "the_flash", name: "The Flash", thaiName: "เดอะแฟลช", role: "assassin", imageFile: "the_flash.png" },
    { id: 60, heroId: "arum", name: "Arum", thaiName: "อารัม", role: "support", imageFile: "arum.png" },
    { id: 61, heroId: "rourke", name: "Rourke", thaiName: "รอร์ค", role: "marksman", imageFile: "rourke.png" },
    { id: 62, heroId: "marja", name: "Marja", thaiName: "มาร์จา", role: "mage", imageFile: "marja.png" },
    { id: 63, heroId: "baldum", name: "Baldum", thaiName: "บัลดุม", role: "tank", imageFile: "baldum.png" },
    { id: 64, heroId: "roxie", name: "Roxie", thaiName: "ร็อกซี่", role: "tank", imageFile: "roxie.png" },
    { id: 65, heroId: "annette", name: "Annette", thaiName: "อันเน็ตต์", role: "support", imageFile: "annette.png" },
    { id: 66, heroId: "amily", name: "Amily", thaiName: "เอมิลี่", role: "fighter", imageFile: "amily.png" },
    { id: 67, heroId: "y_bneth", name: "Y'bneth", thaiName: "วายบีเน็ธ", role: "tank", imageFile: "y_bneth.png" },
    { id: 68, heroId: "elsu", name: "Elsu", thaiName: "เอลซู", role: "marksman", imageFile: "elsu.png" },
    { id: 69, heroId: "riktor", name: "Riktor", thaiName: "ริคเตอร์", role: "fighter", imageFile: "riktor.png" },
    { id: 70, heroId: "wiro", name: "Wiro", thaiName: "วิโร่", role: "tank", imageFile: "wiro.png" },
    { id: 71, heroId: "quillen", name: "Quillen", thaiName: "ควิลเลน", role: "assassin", imageFile: "quillen.png" },
    { id: 72, heroId: "florentino", name: "Florentino", thaiName: "ฟลอเรนติโน่", role: "fighter", imageFile: "florentino.png" },
    { id: 73, heroId: "sephera", name: "Sephera", thaiName: "เซเฟอร่า", role: "support", imageFile: "sephera.png" },
    { id: 74, heroId: "darcy", name: "D'Arcy", thaiName: "ดาร์ซี่", role: "mage", imageFile: "darcy.png" },
    { id: 75, heroId: "veres", name: "Veres", thaiName: "เวเรส", role: "fighter", imageFile: "veres.png" },
    { id: 76, heroId: "hayate", name: "Hayate", thaiName: "ฮายาเตะ", role: "marksman", imageFile: "hayate.png" },
    { id: 77, heroId: "capheny", name: "Capheny", thaiName: "คาเฟนี่", role: "marksman", imageFile: "capheny.png" },
    { id: 78, heroId: "errol", name: "Errol", thaiName: "เออรอล", role: "fighter", imageFile: "errol.png" },
    { id: 79, heroId: "yena", name: "Yena", thaiName: "เยน่า", role: "fighter", imageFile: "yena.png" },
    { id: 80, heroId: "enzo", name: "Enzo", thaiName: "เอ็นโซ่", role: "assassin", imageFile: "enzo.png" },
    { id: 81, heroId: "zip", name: "Zip", thaiName: "ซิป", role: "support", imageFile: "zip.png" },
    { id: 82, heroId: "qi", name: "Qi", thaiName: "คิ", role: "fighter", imageFile: "qi.png" },
    { id: 83, heroId: "celica", name: "Celica", thaiName: "เซลิก้า", role: "marksman", imageFile: "celica.png" },
    { id: 84, heroId: "volkath", name: "Volkath", thaiName: "วอลแคธ", role: "fighter", imageFile: "volkath.png" },
    { id: 85, heroId: "krizzix", name: "Krizzix", thaiName: "คริซซิกซ์", role: "support", imageFile: "krizzix.png" },
    { id: 86, heroId: "elandorr", name: "Eland'orr", thaiName: "เอลันเดอร์", role: "marksman", imageFile: "elandorr.png" },
    { id: 87, heroId: "ishar", name: "Ishar", thaiName: "อิชาร์", role: "mage", imageFile: "ishar.png" },
    { id: 88, heroId: "dirak", name: "Dirak", thaiName: "ดีรัค", role: "mage", imageFile: "dirak.png" },
    { id: 89, heroId: "keera", name: "Keera", thaiName: "คีร่า", role: "assassin", imageFile: "keera.png" },
    { id: 90, heroId: "ata", name: "Ata", thaiName: "อาต้า", role: "tank", imageFile: "ata.png" },
    { id: 91, heroId: "paine", name: "Paine", thaiName: "เพน", role: "assassin", imageFile: "paine.png" },
    { id: 92, heroId: "laville", name: "Laville", thaiName: "ลาวิล", role: "marksman", imageFile: "laville.png" },
    { id: 93, heroId: "rouie", name: "Rouie", thaiName: "รูอี้", role: "support", imageFile: "rouie.png" },
    { id: 94, heroId: "zata", name: "Zata", thaiName: "ซาต้า", role: "mage", imageFile: "zata.png" },
    { id: 95, heroId: "allain", name: "Allain", thaiName: "อัลเลน", role: "fighter", imageFile: "allain.png" },
    { id: 96, heroId: "thorne", name: "Thorne", thaiName: "ธอร์น", role: "marksman", imageFile: "thorne.png" },
    { id: 97, heroId: "sinestrea", name: "Sinestrea", thaiName: "ซิเนสเทรีย", role: "assassin", imageFile: "sinestrea.png" },
    { id: 98, heroId: "dextra", name: "Dextra", thaiName: "เด็กซ์ตร้า", role: "fighter", imageFile: "dextra.png" },
    { id: 99, heroId: "lorion", name: "Lorion", thaiName: "ลอริออน", role: "mage", imageFile: "lorion.png" },
    { id: 100, heroId: "bright", name: "Bright", thaiName: "ไบรท์", role: "assassin", imageFile: "bright.png" },
    { id: 101, heroId: "aoi", name: "Aoi", thaiName: "อาโออิ", role: "assassin", imageFile: "aoi.png" },
    { id: 102, heroId: "iggy", name: "Iggy", thaiName: "อิกกี้", role: "mage", imageFile: "iggy.png" },
    { id: 103, heroId: "tachi", name: "Tachi", thaiName: "ทาชิ", role: "fighter", imageFile: "tachi.png" },
    { id: 104, heroId: "aya", name: "Aya", thaiName: "อาย่า", role: "support", imageFile: "aya.png" },
    { id: 105, heroId: "yue", name: "Yue", thaiName: "เยวี่ย", role: "mage", imageFile: "yue.png" },
    { id: 106, heroId: "yan", name: "Yan", thaiName: "ยี่", role: "fighter", imageFile: "yan.png" },
    { id: 107, heroId: "helen", name: "Helen", thaiName: "เฮเลน", role: "support", imageFile: "helen.png" },
    { id: 108, heroId: "teeri", name: "Teeri", thaiName: "ทีรี่", role: "marksman", imageFile: "teeri.png" },
    { id: 109, heroId: "bonnie", name: "Bonnie", thaiName: "บอนนี่", role: "marksman", imageFile: "bonnie.png" },
    { id: 110, heroId: "bijan", name: "Bijan", thaiName: "บีจาน", role: "assassin", imageFile: "bijan.png" },
    { id: 111, heroId: "kaine", name: "Kaine", thaiName: "เคน", role: "assassin", imageFile: "kaine.png" },
    { id: 112, heroId: "stuart", name: "Stuart", thaiName: "สจ๊วต", role: "marksman", imageFile: "stuart.png" },
    { id: 113, heroId: "ming", name: "Ming", thaiName: "หมิง", role: "mage", imageFile: "ming.png" },
    { id: 114, heroId: "erin", name: "Erin", thaiName: "เอริน", role: "marksman", imageFile: "erin.png" },
    { id: 115, heroId: "charlotte", name: "Charlotte", thaiName: "ชาร์ล็อต", role: "fighter", imageFile: "charlotte.png" },
    { id: 116, heroId: "dolia", name: "Dolia", thaiName: "โดเลีย", role: "support", imageFile: "dolia.png" },
    { id: 117, heroId: "biron", name: "Biron", thaiName: "ไบรอน", role: "fighter", imageFile: "biron.png" },
    { id: 118, heroId: "bolt_baron", name: "Bolt Baron", thaiName: "โบลต์บารอน", role: "marksman", imageFile: "bolt_baron.png" },
    { id: 119, heroId: "billow", name: "Billow", thaiName: "บิลโลว์", role: "assassin", imageFile: "billow.png" },
    { id: 120, heroId: "heino", name: "Heino", thaiName: "ไฮโน่", role: "mage", imageFile: "heino.png" },
    { id: 121, heroId: "goverra", name: "Goverra", thaiName: "โกเวอร์ร่า", role: "tank", imageFile: "goverra.png" },
    { id: 122, heroId: "edras", name: "Edras", thaiName: "เอดราส", role: "marksman", imageFile: "edras.png" },
    { id: 123, heroId: "dyadia", name: "Dyadia", thaiName: "ไดอาเดีย", role: "mage", imageFile: "dyadia.png" },
    { id: 124, heroId: "arduin", name: "Arduin", thaiName: "อาร์ดูอิน", role: "tank", imageFile: "arduin.png" },
    { id: 125, heroId: "astrid", name: "Astrid", thaiName: "แอสตริด", role: "fighter", imageFile: "astrid.png" },
    { id: 126, heroId: "brunhilda", name: "Brunhilda", thaiName: "บรูนฮิลดา", role: "marksman", imageFile: "brunhilda.png" },
    { id: 127, heroId: "flowborn", name: "Flowborn", thaiName: "โฟลว์บอร์น", role: "marksman", imageFile: "flowborn.png" }
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
    all: 'ทั้งหมด',
    tank: 'แทงค์',
    fighter: 'ไฟเตอร์',
    assassin: 'แอสซาซิน',
    mage: 'เมจ',
    marksman: 'แครี่',
    support: 'ซัพพอร์ต'
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
        h.thaiName.includes(query) ||
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

// ============== HERO GRID ==============
class HeroGrid {
    constructor(containerId, draftManager) {
        this.container = document.getElementById(containerId);
        this.draftManager = draftManager;
        this.currentRole = 'all';
        this.searchQuery = '';
        this.render();
    }
    
    render() {
        if (!this.container) return;
        let filtered = this.searchQuery ? searchHeroes(this.searchQuery) : getHeroesByRole(this.currentRole);
        const countEl = document.getElementById('hero-count');
        if (countEl) countEl.textContent = `${filtered.length} ตัว`;
        
        this.container.innerHTML = filtered.map(hero => {
            const state = this.draftManager.getHeroState(hero.id);
            const isSelected = this.draftManager.selectedHeroId === hero.id;
            let statusClass = '';
            let statusBadge = '';
            
            if (state) {
                if (state.type === 'ban') {
                    statusClass = 'selected-ban disabled';
                    statusBadge = '<div class="status-badge status-ban">✕</div>';
                } else if (state.type === 'pick') {
                    statusClass = state.team === 'blue' ? 'selected-pick-blue disabled' : 'selected-pick-red disabled';
                    statusBadge = `<div class="status-badge ${state.team === 'blue' ? 'status-pick-blue' : 'status-pick-red'}">✓</div>`;
                }
            }
            
            // Highlight selected hero
            if (isSelected) {
                statusClass += ' ring-4 ring-yellow-400';
            }
            
            const isGlobal = this.draftManager.isGlobalBanned(hero.id);
            const globalClass = isGlobal ? 'global-banned' : '';
            const tooltip = isGlobal ? ' - ถูกใช้ในเกมก่อน' : '';
            
            const imgSrc = `rovhero/${hero.imageFile}`;
            
            return `
                <div class="hero-card ${statusClass} ${globalClass}" 
                     data-hero-id="${hero.id}"
                     title="${hero.thaiName}${tooltip}"
                     onclick="draftApp.onHeroClick(${hero.id})">
                    <div class="relative w-full aspect-square">
                        <img src="${imgSrc}" 
                             alt="${hero.name}" 
                             class="w-full h-full object-cover rounded-md"
                             loading="lazy"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-md flex items-center justify-center text-white font-bold text-lg" style="display:none;">
                            ${hero.name.charAt(0)}
                        </div>
                    </div>
                    ${statusBadge}
                    ${isSelected ? '<div class="absolute top-1 right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-black">★</div>' : ''}
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1">
                        <p class="text-[10px] text-white font-medium truncate text-center">${hero.thaiName}</p>
                    </div>
                    <div class="absolute top-1 left-1 w-2 h-2 rounded-full" style="background-color: ${roleColors[hero.role]}"></div>
                </div>
            `;
        }).join('');
    }
    
    updateStatus() { this.render(); }
    setRole(role) { this.currentRole = role; this.render(); }
    setSearch(query) { this.searchQuery = query; this.render(); }
}

// ============== TEAM PANEL ==============
class TeamPanel {
    constructor(team, containerId) {
        this.team = team;
        this.container = document.getElementById(containerId);
        this.bansContainer = document.getElementById(`${team}-bans`);
        this.picksContainer = document.getElementById(`${team}-picks`);
        this.renderEmpty();
    }
    
    renderEmpty() {
        if (this.bansContainer) {
            this.bansContainer.innerHTML = Array(4).fill(0).map((_, i) => 
                `<div class="draft-slot rounded-lg aspect-square flex items-center justify-center text-gray-400 text-xs font-bold bg-white/50" data-index="${i}">${i + 1}</div>`
            ).join('');
        }
        if (this.picksContainer) {
            this.picksContainer.innerHTML = Array(5).fill(0).map((_, i) => 
                `<div class="draft-slot rounded-lg aspect-[4/3] flex items-center justify-center text-gray-400 text-xs font-bold bg-white/50" data-index="${i}">${i + 1}</div>`
            ).join('');
        }
    }
    
    update(state) {
        const teamState = state[this.team];
        
        if (this.bansContainer) {
            const banSlots = this.bansContainer.querySelectorAll('.draft-slot');
            banSlots.forEach((slot, idx) => {
                const heroId = teamState.bans[idx];
                if (heroId !== undefined && heroId !== null) {
                    const hero = heroes.find(h => h.id.toString() === heroId.toString());
                    if (hero) {
                        slot.classList.add('filled');
                        slot.dataset.heroId = heroId;
                        slot.innerHTML = `
                            <img src="rovhero/${hero.imageFile}" class="w-full h-full object-cover rounded-md opacity-60 grayscale" alt="${hero.name}" onerror="this.style.display='none'">
                            <div class="remove-btn" onclick="event.stopPropagation(); window.draftApp.removeHero('${this.team}', 'bans', ${idx})">×</div>
                        `;
                    }
                } else if (slot.classList.contains('filled')) {
                    slot.classList.remove('filled');
                    delete slot.dataset.heroId;
                    slot.innerHTML = `${idx + 1}`;
                }
            });
        }
        
        if (this.picksContainer) {
            const pickSlots = this.picksContainer.querySelectorAll('.draft-slot');
            pickSlots.forEach((slot, idx) => {
                const heroId = teamState.picks[idx];
                if (heroId !== undefined && heroId !== null) {
                    const hero = heroes.find(h => h.id.toString() === heroId.toString());
                    if (hero) {
                        slot.classList.add('filled');
                        slot.dataset.heroId = heroId;
                        slot.innerHTML = `
                            <img src="rovhero/${hero.imageFile}" class="w-full h-full object-cover rounded-md" alt="${hero.name}" onerror="this.style.display='none'">
                            <div class="hero-name">${hero.thaiName}</div>
                            <div class="remove-btn" onclick="event.stopPropagation(); window.draftApp.removeHero('${this.team}', 'picks', ${idx})">×</div>
                        `;
                    }
                } else if (slot.classList.contains('filled')) {
                    slot.classList.remove('filled');
                    delete slot.dataset.heroId;
                    slot.innerHTML = `<span class="text-gray-400 text-xs font-bold">${idx + 1}</span>`;
                }
            });
        }
        
        const banCount = document.getElementById(`${this.team}-ban-count`);
        const pickCount = document.getElementById(`${this.team}-pick-count`);
        if (banCount) banCount.textContent = teamState.bans.length;
        if (pickCount) pickCount.textContent = teamState.picks.length;
    }
}

// ============== DRAFT MANAGER ==============
// ลำดับดราฟมาตรฐาน ROV: 4 Bans + 10 Picks (5 ต่อทีม)
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

class DraftManager {
    constructor(onUpdate, toast) {
        this.heroes = heroes;
        this.onUpdate = onUpdate;
        this.toast = toast;
        this.bo = 3;
        this.currentGame = 1;
        this.matchId = null;
        this.globalBannedHeroes = new Set();
        this.state = { blue: { bans: [], picks: [] }, red: { bans: [], picks: [] }, currentStep: 0, isComplete: false };
        this.games = [];
        this.selectedHeroId = null; // สำหรับระบบยืนยัน
    }
    
    initMatch(bo) {
        this.bo = bo;
        this.currentGame = 1;
        this.matchId = 'match_' + Date.now();
        this.globalBannedHeroes.clear();
        this.games = [];
        this.selectedHeroId = null;
        this.resetGame();
    }
    
    resetGame() {
        this.state = { blue: { bans: [], picks: [] }, red: { bans: [], picks: [] }, currentStep: 0, isComplete: false };
        this.selectedHeroId = null;
        this.onUpdate();
    }
    
    reset() {
        this.bo = 3;
        this.currentGame = 1;
        this.matchId = null;
        this.globalBannedHeroes.clear();
        this.games = [];
        this.selectedHeroId = null;
        this.resetGame();
    }
    
    getCurrentStep() { 
        if (this.state.isComplete) return null;
        return this.state.currentStep < DRAFT_SEQUENCE.length ? DRAFT_SEQUENCE[this.state.currentStep] : null; 
    }
    getCurrentTeam() { const step = this.getCurrentStep(); return step ? step.team : null; }
    getCurrentMode() { const step = this.getCurrentStep(); return step ? step.type : null; }
    getState() { return { ...this.state, bo: this.bo, currentGame: this.currentGame, matchId: this.matchId, isMatchComplete: this.isMatchComplete() }; }
    
    isHeroDrafted(heroId) {
        const id = heroId.toString();
        return this.state.blue.bans.some(b => b.toString() === id) || 
               this.state.red.bans.some(b => b.toString() === id) || 
               this.state.blue.picks.some(p => p.toString() === id) || 
               this.state.red.picks.some(p => p.toString() === id);
    }
    
    isGlobalBanned(heroId) { return this.globalBannedHeroes.has(heroId.toString()); }
    
    getHeroState(heroId) {
        const id = heroId.toString();
        if (this.state.blue.bans.some(b => b.toString() === id)) return { type: 'ban', team: 'blue' };
        if (this.state.red.bans.some(b => b.toString() === id)) return { type: 'ban', team: 'red' };
        if (this.state.blue.picks.some(p => p.toString() === id)) return { type: 'pick', team: 'blue' };
        if (this.state.red.picks.some(p => p.toString() === id)) return { type: 'pick', team: 'red' };
        return null;
    }
    
    // เลือกตัวละคร (แค่ highlight ยังไม่ยืนยัน)
    selectHeroForConfirm(heroId) {
        const step = this.getCurrentStep();
        if (!step) return { success: false, error: 'Draft completed' };
        if (this.isGlobalBanned(heroId)) return { success: false, error: 'ตัวละครนี้ถูกใช้ในเกมก่อนหน้าแล้ว' };
        if (this.isHeroDrafted(heroId)) return { success: false, error: 'ตัวละครนี้ถูกเลือกไปแล้ว' };
        
        this.selectedHeroId = heroId;
        return { success: true };
    }
    
    // ยืนยันการดราฟ
    confirmSelection() {
        if (!this.selectedHeroId) return { success: false, error: 'กรุณาเลือกตัวละครก่อน' };
        
        const step = this.getCurrentStep();
        if (!step) return { success: false, error: 'Draft completed' };
        
        const hero = this.heroes.find(h => h.id.toString() === this.selectedHeroId.toString());
        const team = step.team;
        const type = step.type;
        
        // ตรวจสอบจำนวนก่อนเพิ่ม
        const currentCount = this.state[team][type === 'ban' ? 'bans' : 'picks'].length;
        const maxCount = type === 'ban' ? 4 : 5;
        
        if (currentCount >= maxCount) {
            return { success: false, error: `ทีม ${team} มี${type === 'ban' ? 'การแบน' : 'การเลือก'}ครบแล้ว` };
        }
        
        this.state[team][type === 'ban' ? 'bans' : 'picks'].push(this.selectedHeroId);
        
        if (type === 'ban') this.toast?.ban(hero?.thaiName || hero?.name || 'Hero', team);
        else this.toast?.pick(hero?.thaiName || hero?.name || 'Hero', team);
        
        this.selectedHeroId = null;
        this.nextStep();
        return { success: true };
    }
    
    // ยกเลิกการเลือก
    cancelSelection() {
        this.selectedHeroId = null;
        return { success: true };
    }
    
    nextStep() {
        this.state.currentStep++;
        if (this.state.currentStep >= DRAFT_SEQUENCE.length) {
            this.state.isComplete = true;
            this.games.push({ gameNumber: this.currentGame, blue: { ...this.state.blue }, red: { ...this.state.red } });
            this.state.blue.picks.forEach(id => this.globalBannedHeroes.add(id.toString()));
            this.state.red.picks.forEach(id => this.globalBannedHeroes.add(id.toString()));
            this.toast?.show(`ดราฟเกมที่ ${this.currentGame} เสร็จสิ้น!`, 'success');
        }
        this.onUpdate();
    }
    
    nextGame() {
        if (this.currentGame < this.bo) {
            this.currentGame++;
            this.resetGame();
            this.toast?.show(`เริ่มดราฟเกมที่ ${this.currentGame}`, 'info');
            return true;
        }
        return false;
    }
    
    isMatchComplete() { return this.currentGame >= this.bo && this.state.isComplete; }
    
    removeHero(team, type, index) {
        const list = this.state[team][type === 'ban' ? 'bans' : 'picks'];
        if (index >= 0 && index < list.length) {
            list.splice(index, 1);
            this.state.currentStep = Math.max(0, this.state.currentStep - 1);
            this.state.isComplete = false;
            this.selectedHeroId = null;
            this.onUpdate();
        }
    }
    
    getPhaseText() {
        if (this.state.isComplete) return 'ดราฟเสร็จสิ้น';
        const step = this.state.currentStep;
        if (step < 4) return 'Ban Phase 1';
        if (step < 10) return 'Pick Phase 1';
        if (step < 14) return 'Ban Phase 2';
        return 'Pick Phase 2';
    }
    
    getActionHint() { 
        const step = this.getCurrentStep(); 
        if (!step) return 'ดราฟเสร็จสิ้น'; 
        if (this.selectedHeroId) {
            const hero = getHeroById(this.selectedHeroId);
            return `กด "ยืนยัน" เพื่อ${step.type === 'ban' ? 'แบน' : 'เลือก'} ${hero?.thaiName || ''}`;
        }
        return `${step.type === 'ban' ? 'แบน' : 'เลือก'}ตัวละคร (คลิกเพื่อเลือก แล้วกดยืนยัน)`; 
    }
    
    getTeamText() { const step = this.getCurrentStep(); return step ? (step.team === 'blue' ? 'First Pick' : 'Second Pick') : '-'; }
    
    getDraftData() {
        return {
            bo: this.bo, matchId: this.matchId,
            games: this.games.map(g => ({ gameNumber: g.gameNumber, myPicks: g.blue.picks, myBans: g.blue.bans, opponentPicks: g.red.picks, opponentBans: g.red.bans })),
            currentGame: this.currentGame, isComplete: this.isMatchComplete()
        };
    }
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
            console.log('Saving draft:', draftData);
            const draft = { 
                userId: this.currentUser.uid, 
                userEmail: this.currentUser.email, 
                userName: this.userData?.username || 'Unknown', 
                ...draftData, 
                createdAt: firebase.firestore.FieldValue.serverTimestamp(), 
                updatedAt: firebase.firestore.FieldValue.serverTimestamp() 
            };
            const ref = await this.db.collection('drafts').add(draft);
            console.log('Draft saved with ID:', ref.id);
            await this.updateStats(draftData.result);
            return { success: true, draftId: ref.id };
        } catch (e) { 
            console.error('Save draft error:', e);
            return { success: false, error: e.message }; 
        }
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

// ============== MAIN APP ==============
class DraftApp {
    constructor() {
        this.toast = new ToastManager();
        this.draftManager = new DraftManager(() => this.update(), this.toast);
        this.draftManager.heroes = heroes;
        this.heroGrid = new HeroGrid('hero-grid', this.draftManager);
        this.bluePanel = new TeamPanel('blue', 'blue-team-panel');
        this.redPanel = new TeamPanel('red', 'red-team-panel');
        this.timerInterval = null;
        this.timeLeft = 60;
        this.boSelected = false;
        this.init();
    }

    init() {
        // ใช้ requestIdleCallback เพื่อเลื่อนการทำงานที่หนักออกไป ไม่ให้ขวางการโหลดหน้าแรก
        const scheduleInit = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
        
        scheduleInit(() => {
            this.renderRoleFilters();
            this.setupEventListeners();
            this.update();
            // ไม่แสดง BO Modal อัตโนมัติ ต้อง login ก่อน
            window.draftApp = this;
            window.app = this;
        });
    }

    renderRoleFilters() {
        const container = document.getElementById('role-filters');
        if (!container) return;
        container.innerHTML = ['meta', 'all', 'fighter', 'tank', 'mage', 'assassin', 'marksman', 'support'].map(role => 
            `<button onclick="draftApp.setRole('${role}')" class="role-btn px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${role === 'meta' ? 'active' : 'bg-white/40 text-gray-600 hover:bg-white/60'}" data-role="${role}">${roleLabels[role]}</button>`
        ).join('');
    }

    setupEventListeners() {
        let searchTimer;
        document.getElementById('searchHero')?.addEventListener('input', (e) => { 
            clearTimeout(searchTimer); 
            searchTimer = setTimeout(() => this.heroGrid.setSearch(e.target.value), 150); 
        });
        document.getElementById('resetBtn')?.addEventListener('click', () => { 
            if (confirm('ต้องการรีเซ็ตการดราฟทั้งหมด?')) { 
                this.draftManager.reset(); 
                this.boSelected = false; 
                this.stopTimer();
                this.toast.show('รีเซ็ตการดราฟท์เรียบร้อย', 'info'); 
            } 
        });
        document.getElementById('saveDraftForm')?.addEventListener('submit', (e) => this.handleSaveDraft(e));
        
        // ปุ่มยืนยันและยกเลิก
        document.getElementById('confirmBtn')?.addEventListener('click', () => this.confirmSelection());
        document.getElementById('cancelBtn')?.addEventListener('click', () => this.cancelSelection());
    }

    toggleSidebar() {
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
    }

    setBO(bo) {
        // Optimistic UI: ปิด Modal ทันทีที่คลิกเพื่อให้ผู้ใช้รู้สึกว่าระบบตอบสนองแล้ว
        this.closeBOModal();
        
        // บังคับ login ก่อนเริ่มดราฟ
        if (!authManager.isLoggedIn()) {
            this.toast.show('กรุณาเข้าสู่ระบบก่อนเริ่มดราฟ', 'warning');
            authManager.showLoginModal();
            return;
        }
        
        // ใช้ setTimeout เพื่อแยกการประมวลผลหนักๆ ออกจาก UI Thread
        setTimeout(() => {
            this.draftManager.initMatch(bo);
            this.boSelected = true;
            
            const boDisplay = document.getElementById('boDisplay');
            const boText = document.getElementById('boText');
            const gameCounter = document.getElementById('gameCounter');
            const totalGames = document.getElementById('totalGames');
            
            if (boDisplay) boDisplay.classList.remove('hidden');
            if (boText) boText.textContent = `BO${bo}`;
            if (gameCounter) gameCounter.classList.remove('hidden');
            if (totalGames) totalGames.textContent = bo;
            
            this.updateGameCounter();
            this.startTimer();
            this.toast.show(`เริ่มดราฟแบบ BO${bo}`, 'success');
            this.update();
        }, 50);
    }

    showBOModal() {
        // บังคับ login ก่อนแสดง BO Modal
        if (!authManager.isLoggedIn()) {
            this.toast.show('กรุณาเข้าสู่ระบบก่อนเริ่มดราฟ', 'warning');
            authManager.showLoginModal();
            return;
        }
        const modal = document.getElementById('boModal');
        if (modal) modal.classList.remove('hidden');
    }

    closeBOModal() {
        const modal = document.getElementById('boModal');
        if (modal) modal.classList.add('hidden');
    }

    updateGameCounter() {
        const el = document.getElementById('currentGame');
        if (el) el.textContent = this.draftManager.currentGame;
    }

    nextGame() {
        if (this.draftManager.nextGame()) {
            this.updateGameCounter();
            this.resetTimer();
            this.update();
            document.getElementById('nextGameBtn')?.classList.add('hidden');
            document.getElementById('saveDraftBtn')?.classList.add('hidden');
        }
    }

    // เมื่อคลิกที่ตัวละคร
    onHeroClick(heroId) {
        if (!this.boSelected) { 
            this.toast.show('กรุณาเลือกรูปแบบการแข่งขันก่อน', 'warning'); 
            this.showBOModal(); 
            return; 
        }
        
        const step = this.draftManager.getCurrentStep();
        if (!step) {
            this.toast.show('ดราฟเสร็จสิ้นแล้ว', 'info');
            return;
        }
        
        // ตรวจสอบว่าครบ 5 ตัวหรือยัง
        const currentCount = this.draftManager.state[step.team][step.type === 'ban' ? 'bans' : 'picks'].length;
        const maxCount = step.type === 'ban' ? 4 : 5;
        if (currentCount >= maxCount) {
            this.toast.show(`ทีม ${step.team} มี${step.type === 'ban' ? 'การแบน' : 'การเลือก'}ครบแล้ว`, 'warning');
            return;
        }
        
        const result = this.draftManager.selectHeroForConfirm(heroId);
        if (!result.success) {
            this.toast.show(result.error, 'error');
            return;
        }
        
        this.update();
        this.showConfirmButtons();
    }

    // แสดงปุ่มยืนยัน/ยกเลิก
    showConfirmButtons() {
        const confirmPanel = document.getElementById('confirmPanel');
        if (confirmPanel) confirmPanel.classList.remove('hidden');
    }

    hideConfirmButtons() {
        const confirmPanel = document.getElementById('confirmPanel');
        if (confirmPanel) confirmPanel.classList.add('hidden');
    }

    // ยืนยันการเลือก
    confirmSelection() {
        const result = this.draftManager.confirmSelection();
        if (!result.success) {
            this.toast.show(result.error, 'error');
            return;
        }
        this.hideConfirmButtons();
        this.update();
    }

    // ยกเลิกการเลือก
    cancelSelection() {
        this.draftManager.cancelSelection();
        this.hideConfirmButtons();
        this.update();
    }

    removeHero(team, type, index) { 
        this.draftManager.removeHero(team, type, index); 
        this.update(); 
    }

    setRole(role) { 
        this.heroGrid.setRole(role); 
        document.querySelectorAll('.role-btn').forEach(btn => { 
            btn.className = `role-btn px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${btn.dataset.role === role ? 'active' : 'bg-white/40 text-gray-600 hover:bg-white/60'}`; 
        }); 
    }

    update() {
        const state = this.draftManager.getState();
        
        // ใช้ requestIdleCallback ถ้ามี เพื่อให้ทำงานเมื่อเบราว์เซอร์ว่าง
        const scheduleUpdate = window.requestIdleCallback || window.requestAnimationFrame;
        
        scheduleUpdate(() => {
            // อัปเดต Panel เฉพาะเมื่อข้อมูลเปลี่ยนจริง
            this.bluePanel.update(state);
            this.redPanel.update(state);
            this.heroGrid.updateStatus();
            
            const phaseText = document.getElementById('phase-text');
            const teamText = document.getElementById('teamText');
            const actionHint = document.getElementById('actionHint');
            
            const newPhaseText = this.draftManager.getPhaseText();
            if (phaseText && phaseText.textContent !== newPhaseText) phaseText.textContent = newPhaseText;
            
            const newTeamText = this.draftManager.getTeamText();
            if (teamText && teamText.textContent !== newTeamText) teamText.textContent = newTeamText;
            
            const newActionHint = this.draftManager.getActionHint();
            if (actionHint && actionHint.textContent !== newActionHint) actionHint.textContent = newActionHint;
            
            const currentTeam = this.draftManager.getCurrentTeam();
            const indicator = document.getElementById('currentTeamIndicator');
            if (indicator && currentTeam) {
                const newIndicatorClass = `flex items-center gap-3 font-bold text-lg ${currentTeam === 'blue' ? 'text-blue-600' : 'text-red-600'}`;
                if (indicator.className !== newIndicatorClass) indicator.className = newIndicatorClass;
            }
            
            const bluePanel = document.getElementById('blue-team-panel');
            const redPanel = document.getElementById('red-team-panel');
            if (bluePanel && redPanel && currentTeam) {
                const isBlueActive = currentTeam === 'blue';
                const isRedActive = currentTeam === 'red';
                if (bluePanel.classList.contains('team-active') !== isBlueActive) bluePanel.classList.toggle('team-active', isBlueActive);
                if (redPanel.classList.contains('team-active-red') !== isRedActive) redPanel.classList.toggle('team-active-red', isRedActive);
            }
            
            if (state.isComplete) this.onDraftComplete();
        });
    }

    onDraftComplete() {
        this.hideConfirmButtons();
        if (this.draftManager.currentGame < this.draftManager.bo) {
            const nextBtn = document.getElementById('nextGameBtn');
            if (nextBtn) nextBtn.classList.remove('hidden');
        }
        const saveBtn = document.getElementById('saveDraftBtn');
        if (saveBtn) saveBtn.classList.remove('hidden');
    }

    showSaveDraftModal() {
        if (!authManager.isLoggedIn()) { 
            this.toast.show('กรุณาเข้าสู่ระบบก่อนบันทึก', 'warning'); 
            authManager.showLoginModal(); 
            return; 
        }
        const modal = document.getElementById('saveDraftModal');
        if (modal) modal.classList.remove('hidden');
    }

    closeSaveDraftModal() {
        const modal = document.getElementById('saveDraftModal');
        if (modal) modal.classList.add('hidden');
    }

    async handleSaveDraft(e) {
        e.preventDefault();
        
        if (!authManager.isLoggedIn()) {
            this.toast.show('กรุณาเข้าสู่ระบบก่อนบันทึก', 'warning');
            authManager.showLoginModal();
            return;
        }
        
        const matchName = document.getElementById('draftMatchName')?.value;
        const myTeam = document.getElementById('draftMyTeam')?.value;
        const opponentTeam = document.getElementById('draftOpponentTeam')?.value;
        const result = document.getElementById('draftResult')?.value;
        const notes = document.getElementById('draftNotes')?.value;
        
        if (!matchName) {
            this.toast.show('กรุณาใส่ชื่อ Match', 'warning');
            return;
        }
        
        const draftData = { 
            ...this.draftManager.getDraftData(), 
            matchName, myTeam, opponentTeam, result, notes 
        };
        
        console.log('Saving draft data:', draftData);
        const saveResult = await firebaseService.saveDraft(draftData);
        
        if (saveResult.success) { 
            this.toast.show(`บันทึกการดราฟสำเร็จ! (ID: ${saveResult.draftId})`, 'success'); 
            this.closeSaveDraftModal(); 
            e.target.reset(); 
        } else {
            this.toast.show(saveResult.error || 'เกิดข้อผิดพลาด', 'error');
        }
    }

    resetTimer() {
        this.timeLeft = 60;
        const el = document.getElementById('timer');
        if (el) el.textContent = this.timeLeft;
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    startTimer() {
        this.stopTimer();
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            const el = document.getElementById('timer');
            if (this.timeLeft <= 0) { 
                this.toast.show('หมดเวลา!', 'warning'); 
                this.resetTimer(); 
                return; 
            }
            if (el) el.textContent = this.timeLeft;
        }, 1000);
    }
}

// ============== INITIALIZE ==============
document.addEventListener('DOMContentLoaded', function() {
    window.draftApp = new DraftApp();
    window.app = window.draftApp;
    if (window.lucide) lucide.createIcons();
});
