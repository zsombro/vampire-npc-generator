export interface SecondaryPlayerCharacter {
    type: "single_pool" | "simple" | "complex";
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

export interface Complex extends SecondaryPlayerCharacter {
    type: "complex";
    physical: {
        strength: number;
        dexterity: number;
        stamina: number;
    },
    mental: {
        intelligence: number;
        wits: number;
        resolve: number;
    },
    social: {
        charisma: number;
        manipulation: number;
        composure: number;
    }
}