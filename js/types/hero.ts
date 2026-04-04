export type HeroRole = 'fighter' | 'tank' | 'mage' | 'assassin' | 'marksman' | 'support' | 'all';

export interface Hero {
    id: string;
    name: string;
    thaiName: string;
    role: HeroRole;
    imageFile: string; // ชื่อไฟล์ .png เช่น "airi.png"
}

export interface DraftState {
    blue: TeamState;
    red: TeamState;
}

export interface TeamState {
    bans: string[]; // hero ids
    picks: string[]; // hero ids
}

export type DraftMode = 'ban' | 'pick';
export type TeamSide = 'blue' | 'red';
