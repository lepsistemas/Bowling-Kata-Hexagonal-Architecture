import { beforeEach, it } from 'node:test';
import assert from 'node:assert';

import { Game } from '../src/Game';
import { Roll } from '../src/Roll';

let game: Game;
beforeEach(() => {
    game = new Game();
});

it('should return 0 for a game with no pins down', () => {
    rollPins(0, 20);
    assert.strictEqual(game.getTotalScore(), 0);
});

it('should return 20 for a regular game with pins down', () => {
    rollPins(1, 20);
    assert.strictEqual(game.getTotalScore(), 20);
});

it('should add the value of the next roll on spare', () => {
    game.roll(new Roll(8));
    game.roll(new Roll(2));
    game.roll(new Roll(3));
    game.roll(new Roll(0));
    rollPins(0, 16);
    assert.strictEqual(game.getTotalScore(), 16);
});

it('should add the value of the next two rolls on strike', () => {
    game.roll(new Roll(10));
    game.roll(new Roll(1));
    game.roll(new Roll(1));
    rollPins(0, 16);
    assert.strictEqual(game.getTotalScore(), 14);
});

it('should score 300 in a perfect game', () => {
    rollPins(10, 12);
    assert.strictEqual(game.getTotalScore(), 300);
});

function rollPins(pins: number, rolls: number): void {
    for (let i = 0; i < rolls; i++) {
        game.roll(new Roll(pins));
    }
}
