import { ExplosionClass, SpaceshipClass } from '../base';

import EnemySpaceship from './EnemySpaceship';
import State from '../State';
import PlayerSpaceship from './PlayerSpaceship';

const { spaceship_red, spaceship_model } = State;

class SpaceshipsFactory {
    public static createPlayerSpaceship() {
        const color = spaceship_red === 'active' ? '_red' : '_blue';
        const model = spaceship_model;
        const spaceshipClass = (model + color) as SpaceshipClass;

        const explosionClass = SpaceshipsFactory.getExplosionClass(
            spaceshipClass,
            color
        );

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

        const mySpaceship = new PlayerSpaceship(
            spaceshipClass,
            explosionClass,
            lives,
            speed
        );
        mySpaceship.init();
    }

    public static createEnemySpaceship() {
        const color = spaceship_red === 'active' ? '_blue' : '_red';
        const model = SpaceshipsFactory.drawModel();
        const rotated = model !== 'mothership' ? '--rotated' : '';
        const spaceshipClass = (model + color + rotated) as SpaceshipClass;
        const explosionClass = SpaceshipsFactory.getExplosionClass(
            spaceshipClass,
            color
        );

        const lives =
            spaceshipClass === `mothership${color}`
                ? 6
                : spaceshipClass === `spaceship_big${color}`
                ? 3
                : spaceshipClass === `spaceship_medium${color}`
                ? 2
                : spaceshipClass === `spaceship_small${color}`
                ? 1
                : 1;

        const speed =
            spaceshipClass === `mothership${color}`
                ? 4
                : spaceshipClass === `spaceship_big${color}`
                ? 4
                : spaceshipClass === `spaceship_medium${color}`
                ? 5
                : spaceshipClass === `spaceship_small${color}`
                ? 5
                : 5;

        const newEnemy = new EnemySpaceship(
            spaceshipClass,
            explosionClass,
            lives,
            speed
        );
        newEnemy.init();
        return newEnemy;
    }

    private static drawModel() {
        const random = Math.floor(Math.random() * 12);
        if (random === 1) return 'mothership';
        if (random <= 4) return `spaceship_small`;
        if (random >= 5 && random <= 7) return `spaceship_medium`;
        if (random >= 8 && random <= 10) return `spaceship_big`;
        else return 'mothership';
    }

    private static getExplosionClass(
        spaceshipClass: SpaceshipClass,
        color: '_red' | '_blue'
    ): ExplosionClass {
        return (
            spaceshipClass === `mothership${color}` ||
            spaceshipClass === `spaceship_big${color}`
                ? `explosion_big${color}`
                : `explosion_small${color}`
        ) as ExplosionClass;
    }
}

export default SpaceshipsFactory;
