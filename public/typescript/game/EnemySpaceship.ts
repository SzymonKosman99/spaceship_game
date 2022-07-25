import {
    ExplosionClass,
    SpaceshipClass,
    ElementPosition,
    DOMElements,
} from '../base';

import BulletFactory from './BulletsFactory';

import Spaceship from './abstract/Spaceship';
import State from '../State';

class EnemySpaceship extends Spaceship {
    constructor(
        protected spaceshipClass: SpaceshipClass,
        protected explosionClass: ExplosionClass,
        protected lives: number,
        protected speed: number,
        protected spaceship = document.createElement('div'),
        private translatePositionY = 0,
        private translatePositionX = 0
    ) {
        super();
    }
    public init(): void {
        this.spaceship.setAttribute('class', this.spaceshipClass);
        DOMElements.gameField.appendChild(this.spaceship);
        this.setPosition();
        if (
            this.spaceshipClass.includes('small') ||
            this.spaceshipClass.includes('medium')
        ) {
            clearInterval(this.shot);
        }
    }

    protected setPosition(): void {
        this.spaceship.style.position = 'absolute';
        this.spaceship.style.top = '0%';
        this.spaceship.style.left = `${this.randomPosition()}px`;
        this.spaceship.style.transform = `translate(${this.checkPositionX()}px,${
            this.translatePositionY
        }px)`;
    }
    protected movePosition(): number | void {
        this.translatePositionY += this.speed;
        this.spaceship.style.transform = `translate(${this.checkPositionX()}px,${
            this.translatePositionY
        }px)`;
    }

    public getPosition(): ElementPosition {
        return {
            edgeLeft: this.spaceship.offsetLeft + this.translatePositionX,

            edgeRight:
                this.spaceship.offsetLeft +
                this.spaceship.offsetWidth +
                this.translatePositionX,

            bottomEdge:
                this.spaceship.offsetTop +
                this.spaceship.offsetHeight +
                this.translatePositionY,
        };
    }

    public explode(): void {
        clearInterval(this.updateTranslatePositionY);
        clearInterval(this.shot);
        DOMElements.explosionSound.load();
        DOMElements.explosionSound.play();
        this.spaceship.classList.remove(this.spaceshipClass);
        this.spaceship.classList.add(this.explosionClass);
        State.gameState.player_money += 100;
        setTimeout(() => {
            this.spaceship.remove();
        }, 600);
    }

    private randomPosition(): number {
        return Math.floor(Math.random() * window.innerWidth);
    }

    private checkPositionX() {
        if (
            this.spaceship.offsetLeft >
            window.innerWidth - this.spaceship.offsetWidth
        ) {
            return (this.translatePositionX = -this.spaceship.offsetWidth);
        }
        if (this.spaceship.offsetLeft < this.spaceship.offsetWidth) {
            return (this.translatePositionX = this.spaceship.offsetWidth / 6);
        }
        return this.translatePositionX;
    }

    public updateLives(lifeTaken: number): number {
        return (this.lives -= lifeTaken);
    }

    public getLives() {
        return this.lives;
    }

    private updateTranslatePositionY = setInterval(() => {
        requestAnimationFrame(this.movePosition.bind(this));
    }, 50);

    public remove(): void {
        clearInterval(this.shot);
        clearInterval(this.updateTranslatePositionY);
        this.spaceship.remove();
    }

    private shot = setInterval(() => {
        const color = State.spaceship_red === 'active' ? '_blue' : '_red';

        if (
            (this.randomPosition() > window.innerWidth / 2 &&
                this.spaceshipClass === `spaceship_big${color}--rotated`) ||
            this.spaceshipClass === `mothership${color}`
        ) {
            DOMElements.enemyBlast.load();
            DOMElements.enemyBlast.play();
            BulletFactory.createBullet(
                `bullet${color}--rotated`,
                this.explosionClass,
                this.speed / 2,
                this.getPosition()
            );
        }
    }, 1500);
}

export default EnemySpaceship;
