import { Roll } from "./Roll";

export class Round {
    private static readonly MAX_PINS_DOWN: number = 10;

    private rolls: Roll[] = [];
    private bonus: number = 0;

    addRoll(roll: Roll): void {
        this.rolls.push(roll);
    }

    isOver(): boolean {
        return this.hadStrike() || this.rolls.length === 2;
    }

    getRawScore(): number {
        return this.rolls.reduce((acc, roll) => acc + (roll.pins || 0), 0);
    }

    getScore(): number {
        return this.getRawScore() + this.getBonus();
    }

    hadStrike(): boolean {
        return this.rolls.length === 1
            && Round.MAX_PINS_DOWN === (this.rolls[0].pins || 0);
    }

    hadSpare(): boolean {
        return this.rolls.length === 2
            && Round.MAX_PINS_DOWN === this.getRawScore();
    }

    addBonus(bonus: number): void {
        this.bonus = bonus;
    }

    getFirstRoll(): Roll {
        return this.rolls[0];
    }

    getBonus(): number {
        return this.bonus || 0;
    }
}
