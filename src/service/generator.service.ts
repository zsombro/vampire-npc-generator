import { Complex, Simple, SinglePool } from "../model/SPC"

export function generateSinglePool(): SinglePool {
    return {
        type: "single_pool",
        name: generateName(),
        health: randomInteger(4, 8),
        willpower: randomInteger(2, 10),
        generalDifficulty: Math.floor(Math.random() * 4) + 1,
        expertDifficulty: Math.floor(Math.random() * 4) + 1,
    }
}

export function generateSimple(): Simple {
    return {
        type: "simple",
        name: generateName(),
        health: randomInteger(4, 8),
        willpower: randomInteger(2, 10),
        physical: randomInteger(2, 10),
        mental: randomInteger(2, 10),
        social: randomInteger(2, 10),
    }
}

export function generateComplex(): Complex {
    const physical = {
        strength: randomInteger(1, 5),
        dexterity: randomInteger(1, 5),
        stamina: randomInteger(1, 5),
    }
    const mental = {
        intelligence: randomInteger(1, 5),
        wits: randomInteger(1, 5),
        resolve: randomInteger(1, 5),
    }
    const social = {
        charisma: randomInteger(1, 5),
        manipulation: randomInteger(1, 5),
        composure: randomInteger(1, 5),
    }

    return {
        type: "complex",
        name: generateName(),
        health: physical.stamina + 3,
        willpower: social.composure + mental.resolve,
        physical,
        mental,
        social,
    }
}

function randomInteger(minimum: number, maximum: number): number {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
}

function generateName() {
    return `Kindred #${Math.floor(Math.random() * 100)}`
}
