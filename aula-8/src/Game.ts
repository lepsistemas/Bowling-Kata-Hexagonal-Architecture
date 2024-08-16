import { Round } from "./Round";
import { Roll } from "./Roll";

export class Game {

    private static readonly MAX_FRAMES_IN_GAME: number = 10;

    private rounds: Round[] = [];
    private currentRoundIndex: number = 0;

    roll(roll: Roll): void {
        if (this.currentRoundIndex < Game.MAX_FRAMES_IN_GAME) {
            const round = this.getCurrentRound();
            this.dealWithoutBonus(roll, round);
            this.dealWithStrike();
            this.dealWithSpare();
            if (round.isOver() && !this.isLastRound()) {
                this.currentRoundIndex++;
            }
        }
    }

    getTotalScore(): number {
        if (this.rounds.length < Game.MAX_FRAMES_IN_GAME) {
            throw new Error("Game is incomplete.");
        }
        return this.rounds.reduce((score, round) => score + round.getScore(), 0);
    }

    private dealWithoutBonus(roll: Roll, round: Round): void {
        round.addRoll(roll);
        this.rounds[this.currentRoundIndex] = round;
    }

    private dealWithSpare(): void {
        if (this.currentRoundIndex > 0) {
            const round = this.rounds[this.currentRoundIndex];
            const previousRound = this.rounds[this.currentRoundIndex - 1];
            if (previousRound.hadSpare()) {
                previousRound.addBonus(round.getFirstRoll().pins);
            }
        }
    }

    private dealWithStrike(): void {
        if (this.currentRoundIndex > 1) {
            for (let roundIndex = this.currentRoundIndex; roundIndex > (this.currentRoundIndex - 1); roundIndex--) {
                this.dealWithBeforePreviousStrike(roundIndex);
                this.dealWithPreviousStrike(roundIndex);
            }
        }
    }

    private dealWithPreviousStrike(roundIndex: number): void {
        const round = this.rounds[roundIndex];
        const previousRound = this.rounds[roundIndex - 1];
        if (previousRound.hadStrike()) {
            if (round.isOver()) {
                previousRound.addBonus(round.getRawScore());
            }
        }
    }

    private dealWithBeforePreviousStrike(roundIndex: number): void {
        const round = this.rounds[roundIndex];
        const previousRound = this.rounds[roundIndex - 1];
        const beforePreviousRound = this.rounds[roundIndex - 2];

        if (beforePreviousRound.hadStrike()) {
            if (previousRound.hadStrike()) {
                beforePreviousRound.addBonus(previousRound.getRawScore() + round.getFirstRoll().pins);
            } else {
                beforePreviousRound.addBonus(previousRound.getRawScore());
            }
        }
    }

    private getCurrentRound(): Round {
        let currentRound = this.rounds[this.currentRoundIndex];
        if (!currentRound) {
            return new Round();
        }
        if (!this.isLastRound() && currentRound.isOver()) {
            return new Round();
        }
        return currentRound;
    }

    private isLastRound(): boolean {
        return (this.currentRoundIndex + 1) === Game.MAX_FRAMES_IN_GAME;
    }
}
