import Bullet from './abstract/Bullet';

import {
    DOMElements,
    BulletClass,
    ExplosionClass,
    ElementPosition,
} from '../base';

class PlayerBullet extends Bullet {
    constructor(
        protected bulletClass: BulletClass,
        protected explosionClass: ExplosionClass,
        protected speed: number,
        protected bullet: HTMLDivElement = document.createElement('div'),
        private translatePositionX = 0,
        private translatePositionY = 0
    ) {
        super();
    }

    public init(spaceshipPosition: ElementPosition): void {
        DOMElements.gameField.appendChild(this.bullet);
        this.bullet.setAttribute('class', this.bulletClass);
        this.setPosition({ ...spaceshipPosition });
    }

    protected setPosition(elementPosition: ElementPosition): void {
        const { edgeRight, edgeLeft } = elementPosition;
        const spaceshipHeight = edgeRight - edgeLeft;
        const spaceshipMiddle = spaceshipHeight / 2 + edgeLeft;
        this.bullet.style.position = 'absolute';
        this.bullet.style.bottom = `${spaceshipHeight}px`;
        this.bullet.style.left = `${spaceshipMiddle}px`;
        this.bullet.style.zIndex = '2';
        this.translatePositionX = -this.bullet.offsetWidth / 2;
        this.setTranslatePositions();
    }

    public getPosition(): ElementPosition {
        return {
            edgeLeft: this.bullet.offsetLeft + this.translatePositionX,
            edgeRight:
                this.bullet.offsetLeft +
                this.bullet.offsetWidth +
                this.translatePositionX,
            topEdge: this.bullet.offsetTop + this.translatePositionY,
        };
    }

    public explode(): void {
        clearInterval(this.updateTranslatePositionY);
        this.bullet.classList.remove(this.bulletClass);
        this.bullet.classList.add(this.explosionClass);
        this.translatePositionY -= this.bullet.offsetWidth / 2;
        this.translatePositionX = -this.bullet.offsetWidth / 2;
        this.setTranslatePositions();
        setTimeout(() => {
            this.bullet.remove();
        }, 600);
    }

    private setTranslatePositions() {
        this.bullet.style.transform = `translate(${this.translatePositionX}px,${this.translatePositionY}px)`;
    }

    protected movePosition(): void {
        this.translatePositionY -= this.speed;
        this.setTranslatePositions();
    }

    private updateTranslatePositionY = setInterval(() => {
        requestAnimationFrame(this.movePosition.bind(this));
    }, 10);

    public remove(): void {
        clearInterval(this.updateTranslatePositionY);
        this.bullet.remove();
    }
}

export default PlayerBullet;
