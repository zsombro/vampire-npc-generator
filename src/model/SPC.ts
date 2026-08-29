export interface SecondaryPlayerCharacter {
    type: "single_pool" | "simple";
    name: string;
    health: number;
    willpower: number;
}

export interface SinglePool extends SecondaryPlayerCharacter {
    type: "single_pool";
    generalDifficulty: number;
    expertDifficulty: number;
}

export interface Simple extends SecondaryPlayerCharacter {
    type: "simple";
    physical: number;
    mental: number;
    social: number;
}