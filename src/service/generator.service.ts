import { Simple, SinglePool } from "../model/SPC"

interface StatRange {
    minimum: number;
    maximum: number;
}

interface ThreatProfile {
    health: StatRange;
    willpower: StatRange;
    generalDifficulty: StatRange;
    expertDifficulty: StatRange;
    simplePool: StatRange;
}

const threatProfiles: Record<number, ThreatProfile> = {
    1: {
        health: { minimum: 4, maximum: 5 },
        willpower: { minimum: 2, maximum: 4 },
        generalDifficulty: { minimum: 1, maximum: 2 },
        expertDifficulty: { minimum: 2, maximum: 3 },
        simplePool: { minimum: 2, maximum: 4 },
    },
    2: {
        health: { minimum: 5, maximum: 6 },
        willpower: { minimum: 4, maximum: 6 },
        generalDifficulty: { minimum: 2, maximum: 3 },
        expertDifficulty: { minimum: 3, maximum: 4 },
        simplePool: { minimum: 4, maximum: 6 },
    },
    3: {
        health: { minimum: 6, maximum: 8 },
        willpower: { minimum: 6, maximum: 10 },
        generalDifficulty: { minimum: 3, maximum: 4 },
        expertDifficulty: { minimum: 4, maximum: 5 },
        simplePool: { minimum: 6, maximum: 8 },
    },
}

export function generateSinglePool(threatLevel: number): SinglePool {
    const profile = threatProfileFor(threatLevel)

    return {
        type: "single_pool",
        name: generateName(),
        health: randomFromRange(profile.health),
        willpower: randomFromRange(profile.willpower),
        generalDifficulty: randomFromRange(profile.generalDifficulty),
        expertDifficulty: randomFromRange(profile.expertDifficulty),
    }
}

export function generateSimple(threatLevel: number): Simple {
    const profile = threatProfileFor(threatLevel)

    return {
        type: "simple",
        name: generateName(),
        health: randomFromRange(profile.health),
        willpower: randomFromRange(profile.willpower),
        physical: randomFromRange(profile.simplePool),
        mental: randomFromRange(profile.simplePool),
        social: randomFromRange(profile.simplePool),
    }
}

function threatProfileFor(threatLevel: number): ThreatProfile {
    return threatProfiles[threatLevel] ?? threatProfiles[2]
}

function randomFromRange(range: StatRange): number {
    return randomInteger(range.minimum, range.maximum)
}

function randomInteger(minimum: number, maximum: number): number {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
}

function generateName() {
    return `Kindred #${Math.floor(Math.random() * 100)}`
}
