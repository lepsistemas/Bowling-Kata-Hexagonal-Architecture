export class Game {

    private rolls: number[];

    constructor() {
        this.rolls = [];
    }

    roll(pins: number): void {
        this.rolls.push(pins);
    }

    score(): number {
        let total = 0;
        let rollIndex = 0;
        for(let frame = 0; frame < 10; frame++) {
            if (this.isStrike(rollIndex)) {
                total += 10 + this.calculateStrikeBonus(rollIndex);
                rollIndex += 1;
                continue;
            }
            total += this.calculateFrame(rollIndex);
            if (this.isSpare(rollIndex)) {
                total += this.calculateSpareBonus(rollIndex);
            }
            rollIndex += 2;
        }
        return total;
    }

    calculateFrame(rollIndex: number): number {
        return this.rolls[rollIndex] + this.rolls[rollIndex + 1];
    }

    isStrike(rollIndex: number): boolean {
        return this.rolls[rollIndex] === 10;
    }

    calculateStrikeBonus(rollIndex: number): number {
        return this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
    }

    isSpare(rollIndex: number): boolean {
        return this.rolls[rollIndex] + this.rolls[rollIndex + 1] === 10;
    }

    calculateSpareBonus(rollIndex: number): number {
        return this.rolls[rollIndex + 2];
    }
}
