export interface V5Roll {
    successes: number;
    messyCritical: boolean;
    bestialFailure: boolean;
}

const simulationCount = 10_000;

function rollDie(): number {
    return Math.floor(Math.random() * 10) + 1;
}

export function rollV5(dicePoolSize: number, hunger: number): V5Roll {
    const poolSize = Math.max(0, Math.floor(dicePoolSize));
    const hungerDice = Math.min(poolSize, Math.max(0, Math.floor(hunger)));
    let successes = 0;
    let tens = 0;
    let hungerTen = false;
    let hungerOne = false;

    for (let index = 0; index < poolSize; index++) {
        const isHungerDie = index < hungerDice;
        const result = rollDie();

        if (result >= 6) {
            successes++;
        }
        if (result === 10) {
            tens++;
            hungerTen ||= isHungerDie;
        }
        if (result === 1 && isHungerDie) {
            hungerOne = true;
        }
    }

    const criticalPairs = Math.floor(tens / 2);
    successes += criticalPairs * 2;

    return {
        successes,
        messyCritical: criticalPairs > 0 && hungerTen,
        bestialFailure: successes === 0 && hungerOne,
    };
}

export function playerWinsContest(player: V5Roll, opponent: V5Roll): boolean {
    return player.successes >= opponent.successes;
}

export function chanceOfWinningContest(
    playerDicePoolSize: number,
    playerHunger: number,
    opponentDicePoolSize: number,
    opponentHunger = 0,
    simulations = simulationCount,
): number {
    let playerWins = 0;

    for (let simulation = 0; simulation < simulations; simulation++) {
        if (playerWinsContest(
            rollV5(playerDicePoolSize, playerHunger),
            rollV5(opponentDicePoolSize, opponentHunger),
        )) {
            playerWins++;
        }
    }

    return playerWins / simulations;
}

export function chanceOfSuccessAgainstDifficulty(
    dicePoolSize: number,
    hunger: number,
    difficulty: number,
    simulations = simulationCount,
): number {
    const opponent = { successes: Math.max(0, Math.floor(difficulty)), messyCritical: false, bestialFailure: false };
    let playerWins = 0;

    for (let simulation = 0; simulation < simulations; simulation++) {
        if (playerWinsContest(rollV5(dicePoolSize, hunger), opponent)) {
            playerWins++;
        }
    }

    return playerWins / simulations;
}