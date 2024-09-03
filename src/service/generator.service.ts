import { Complex, Simple, SinglePool } from "../model/SPC"

export function generateSinglePool(): SinglePool {
    return {
        type: "single_pool",
        name: generateName(),
        health: Math.floor(Math.random() * 100) + 1,
        willpower: Math.floor(Math.random() * 100) + 1,
        generalDifficulty: Math.floor(Math.random() * 4) + 1,
        expertDifficulty: Math.floor(Math.random() * 4) + 1,
    }
}

export function generateSimple(): Simple {
    return {
        type: "simple",
        name: generateName(),
        health: Math.floor(Math.random() * 100) + 1,
        willpower: Math.floor(Math.random() * 100) + 1,
        physical: Math.floor(Math.random() * 100) + 1,
        mental: Math.floor(Math.random() * 100) + 1,
        social: Math.floor(Math.random() * 100) + 1,
    }
}

export function generateComplex(): Complex {
    return {
        type: "complex",
        name: generateName(),
        health: Math.floor(Math.random() * 100) + 1,
        willpower: Math.floor(Math.random() * 100) + 1,
        physical: {
            strength: Math.floor(Math.random() * 100) + 1,
            dexterity: Math.floor(Math.random() * 100) + 1,
            stamina: Math.floor(Math.random() * 100) + 1,
        },
        mental: {
            intelligence: Math.floor(Math.random() * 100) + 1,
            wits: Math.floor(Math.random() * 100) + 1,
            resolve: Math.floor(Math.random() * 100) + 1,
        },
        social: {
            charisma: Math.floor(Math.random() * 100) + 1,
            manipulation: Math.floor(Math.random() * 100) + 1,
            composure: Math.floor(Math.random() * 100) + 1,
        },
    }
}

function generateName() {
    return `Kindred #${Math.floor(Math.random() * 100)}`
}
