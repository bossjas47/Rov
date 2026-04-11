// ROV Heroes Data - 127 Heroes
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

const roleColors = {
    tank: '#3b82f6',
    fighter: '#f97316',
    assassin: '#a855f7',
    mage: '#06b6d4',
    marksman: '#ef4444',
    support: '#22c55e'
};

const roleLabels = {
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
    return role === 'all' ? heroesData : heroesData.filter(h => h.role === role);
}

function searchHeroes(query) {
    const q = query.toLowerCase();
    return heroesData.filter(h => 
        h.name.toLowerCase().includes(q) || 
        h.thaiName.includes(query) ||
        h.heroId.toLowerCase().includes(q)
    );
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { heroes: heroesData, roleColors, roleLabels, getHeroById, getHeroesByRole, searchHeroes };
}

export const heroes = heroesData;
export { roleColors, roleLabels, getHeroById, getHeroesByRole, searchHeroes };
