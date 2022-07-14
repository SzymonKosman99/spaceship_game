import {
    DOMElements,
    SpaceshipClass,
    ExplosionClass,
    ElementPosition,
    BulletClass,
} from '../base';

import BulletFactory from './BulletsFactory';

import State from '../State';
import Spaceship from './abstract/Spaceship';

const { blastSound, gameField } = DOMElements;
const { gameState } = State;

class PlayerSpaceship extends Spaceship {
    constructor(
        protected spaceshipClass: SpaceshipClass,
        protected explosionClass: ExplosionClass,
        protected lives: number,
        protected speed: number,
        protected spaceship: HTMLDivElement = document.createElement('div'),
        private isArrowLeftPressed = false,
        private isArrowRightPressed = false,
        private translatePositionX = 0
    ) {
        super();
        gameState.player_lives = this.lives;
        gameState.player_bullets = [];
    }

    public init(): void {
        DOMElements.gameField.appendChild(this.spaceship);
        this.spaceship.classList.add(this.spaceshipClass);
        this.setPosition();
        this.addEvents();
    }

    protected setPosition(): void {
        this.spaceship.style.position = 'absolute';
        this.spaceship.style.left = `${window.innerWidth / 2}px`;
        this.spaceship.style.bottom = `0px`;

        this.translatePositionX = -this.spaceship.offsetWidth / 2;
        this.spaceship.style.transform = `translateX(${this.translatePositionX}px)`;
    }

    protected getPosition(): ElementPosition {
        return {
            edgeLeft: this.spaceship.offsetLeft + this.translatePositionX,
            edgeRight:
                this.spaceship.offsetLeft +
                this.spaceship.offsetWidth +
                this.translatePositionX,
            topEdge: this.spaceship.offsetTop,
        };
    }

    protected movePosition(): number | void {
        const elementPosition = this.getPosition();
        const { edgeLeft, edgeRight } = elementPosition;

        if (this.isArrowLeftPressed && edgeLeft >= 0) {
            this.translatePositionX -= this.speed;
            this.spaceship.style.transform = `translateX(${this.translatePositionX}px)`;
        }
        if (this.isArrowRightPressed && edgeRight <= window.innerWidth) {
            this.translatePositionX += this.speed;
            this.spaceship.style.transform = `translateX(${this.translatePositionX}px)`;
        }
    }

    private checkIsButtonPressed = setInterval(() => {
        requestAnimationFrame(this.movePosition.bind(this));
    }, 10);

    private addEvents(): void {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    private handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowLeft':
                this.isArrowLeftPressed = true;
                break;
            case 'ArrowRight':
                this.isArrowRightPressed = true;
                break;
            case ' ':
                if (!blastSound) {
                    blastSound.pause();
                }
                break;
            default:
                break;
        }
    };

    private handleKeyUp = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowLeft':
                this.isArrowLeftPressed = false;
                break;
            case 'ArrowRight':
                this.isArrowRightPressed = false;
                break;
            case ' ':
                this.shot();
                if (blastSound.paused) {
                    blastSound.load();
                    blastSound.play();
                }
                break;
            default:
                break;
        }
    };

    private shot() {
        const color = State.spaceship_red === 'active' ? '_red' : '_blue';
        const bulletClass = `bullet${color}` as BulletClass;
        BulletFactory.createBullet(
            bulletClass,
            this.explosionClass,
            this.speed,
            this.getPosition()
        );
    }

    public explode(): void {
        clearInterval(this.checkIsButtonPressed);
        this.removeEvents();
        this.spaceship.classList.remove(this.spaceshipClass);
        this.spaceship.classList.add(this.explosionClass);
        setTimeout(() => {
            this.spaceship.remove();
        }, 600);
    }

    public remove(): void {
        clearInterval(this.checkIsButtonPressed);
        this.removeEvents();
        this.spaceship.remove();
    }

    private removeEvents() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    public updateLives(lifeTaken: number): number {
        const colorRed = 'rgb(204, 25, 25)';
        if (gameField) {
            gameField.style.backgroundColor = colorRed;
            setTimeout(() => {
                gameField
                    ? (gameField.style.backgroundColor = 'transparent')
                    : null;
            }, 50);
        }
        return (gameState.player_lives -= lifeTaken);
    }
}

export default PlayerSpaceship;
