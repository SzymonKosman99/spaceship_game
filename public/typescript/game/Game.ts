import { ExplosionClass, SpaceshipClass } from '../base';
import State from '../State';
import PlayerSpaceship from './PlayerSpaceship';

class Game {
    public start() {
        const { spaceship_red, spaceship_model } = State;
        const color = spaceship_red === 'active' ? '_red' : '_blue';
        const model = spaceship_model;

        const spaceshipClass = (model + color) as SpaceshipClass;

        const explosionClass = (
            model === 'spaceship_big'
                ? `explosion_big${color}`
                : `explosion_small${color}`
        ) as ExplosionClass;

        const lives =
            spaceship_model === 'spaceship_big'
                ? 10
                : spaceship_model === 'spaceship_medium'
                ? 5
                : 3;

        const speed =
            spaceship_model === 'spaceship_big'
                ? 5
                : spaceship_model === 'spaceship_medium'
                ? 5.5
                : 5;

        const div = document.createElement('div');

        const mySpaceship = new PlayerSpaceship(
            spaceshipClass,
            explosionClass,
            lives,
            speed,
            div
        );
        mySpaceship.init();
    }
}

export default Game;
