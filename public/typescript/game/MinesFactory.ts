import { MineClass } from '../base';
import State from '../State';
import SpaceMine from './SpaceMine';

const { gameState, spaceship_red } = State;

export default class MinesFactory {
    private static color: '_red' | '_blue' =
        spaceship_red === 'active' ? '_red' : '_blue';

    public static createMines() {
        const mineClass: MineClass = `space_mine${MinesFactory.color}`;

        for (let i = 0; i < gameState.space_mines_number; i++) {
            const mine = new SpaceMine(
                mineClass,
                `explosion_small${MinesFactory.color}`
            );
            mine.init();
            gameState.player_mines.push(mine);
        }
    }
}
