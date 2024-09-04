// A success means rolling n > 5 on a d10
const successProbability = 0.5;

export function roll(dicePoolSize: number, difficulty: number): boolean {
    return Array.from({ length: dicePoolSize }, () => Math.random())
        .filter(rollResult => rollResult > successProbability)
        .length >= difficulty
}

function binomialCoefficient(n: number, k: number): number {
    if (k > n || n < 0 || k < 0) {
        return 0
    }
    if (k === 0 || n === k) {
        return 1
    }
    return binomialCoefficient(n - 1, k - 1) + binomialCoefficient(n - 1, k)
}

export function chanceAgainstDifficulty(dicePoolSize: number, difficulty: number): number {

    return binomialCoefficient(dicePoolSize, difficulty) *
        Math.pow(successProbability, difficulty) *
        Math.pow(1 - successProbability, dicePoolSize - difficulty)
}

export function changeOfWinningContest(dicePoolSize: number, difficulty: number): number {
    let probability = 0;
    for (let i = difficulty; i <= dicePoolSize; i++) {
        probability += chanceAgainstDifficulty(dicePoolSize, i);
    }
    return probability;
}