import {
    ElementPosition,
    BulletClass,
    ExplosionClass,
    DOMElements,
} from '../base';

import Bullet from './abstract/Bullet';

export default class EnemyBullet extends Bullet {
    constructor(
        protected bulletClass: BulletClass,
        protected explosionClass: ExplosionClass,
        protected speed: number,
        protected bullet = document.createElement('div'),
        private translatePositionX = 0,
        private translatePositionY = 0
    ) {
        super();
    }

    public init(spaceshipPosition: ElementPosition): void {
        this.bullet.setAttribute('class', this.bulletClass);
        DOMElements.gameField.appendChild(this.bullet);
        this.setPosition(spaceshipPosition);
    }

    protected setPosition(spaceshipPosition: ElementPosition): void {
        const { edgeLeft, edgeRight, bottomEdge } = spaceshipPosition;
        const spaceshipHeight = edgeRight - edgeLeft;
        const spaceshipMiddle = spaceshipHeight / 2 + edgeLeft;
        this.bullet.style.position = 'absolute';
        this.bullet.style.top = `${bottomEdge}px`;
        this.bullet.style.left = `${spaceshipMiddle}px`;
        this.bullet.style.zIndex = '1';
        this.translatePositionX = -this.bullet.offsetWidth / 2;
        this.setTranslatePositions();
    }

    protected movePosition(): void {
        this.translatePositionY += this.speed;
        this.setTranslatePositions();
    }

    public getPosition(): ElementPosition {
        return {
            edgeLeft: this.bullet.offsetLeft + this.translatePositionX,
            edgeRight:
                this.bullet.offsetLeft +
                this.bullet.offsetWidth +
                this.translatePositionX,
            bottomEdge:
                this.bullet.offsetTop +
                this.translatePositionY +
                this.bullet.offsetHeight,
        };
    }

    public explode(): void {
        clearInterval(this.updateTranslatePositionY);
        this.bullet.classList.remove(this.bulletClass);
        this.bullet.classList.add(this.explosionClass);
        this.translatePositionY -= this.bullet.offsetHeight / 4;
        this.translatePositionX = -this.bullet.offsetWidth / 2;
        this.setTranslatePositions();
        setTimeout(() => {
            this.bullet.remove();
        }, 600);
    }

    public remove(): void {
        clearInterval(this.updateTranslatePositionY);
        this.bullet.remove();
    }

    private setTranslatePositions() {
        this.bullet.style.transform = `translate(${this.translatePositionX}px,${this.translatePositionY}px)`;
    }

    private updateTranslatePositionY = setInterval(() => {
        requestAnimationFrame(this.movePosition.bind(this));
    }, 10);
}
