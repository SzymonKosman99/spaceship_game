import Bullet from './abstract/Bullet';
import { DOMElements } from '../base';
import Spaceship from './abstract/Spaceship';

import PlayerBullet from './PlayerBullet';

import { SpaceshipClass, ExplosionClass, ElementPosition } from '../base';

class PlayerSpaceship extends Spaceship {
    constructor(
        protected spaceshipClass: SpaceshipClass,
        protected explosionClass: ExplosionClass,
        protected lives: number,
        protected speed: number,
        protected spaceship: HTMLDivElement
    ) {
        super();
    }

    public init(): void {
        DOMElements.gameField.appendChild(this.spaceship);
        this.spaceship.classList.add(this.spaceshipClass);
        this.setPosition();
        this.checkPosition();
    }

    protected setPosition(): void {
        this.spaceship.style.position = 'absolute';
        this.spaceship.style.left = `${
            window.innerWidth / 2 - this.spaceship.clientWidth / 2
        }px`;
        this.spaceship.style.top = `${
            window.innerHeight - this.spaceship.clientHeight
        }px`;
    }

    protected movePosition(): number | void {}

    protected getPosition(): ElementPosition {
        return {
            edgeLeft: 0,
            edgeRight: 0,
            bottomEdge: 0,
        };
    }
    public explode(): void {}

    public remove(): void {}

    private checkPosition() {
        console.log(this.spaceship.clientHeight, this.spaceship.clientWidth);
        requestAnimationFrame(() => {
            this.checkPosition;
        });
    }
}

export default PlayerSpaceship;
