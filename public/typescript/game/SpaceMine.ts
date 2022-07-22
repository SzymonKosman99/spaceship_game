import {
    DOMElements,
    ElementPosition,
    ExplosionClass,
    MineClass,
} from '../base';

export default class SpaceMine {
    constructor(
        private mineClass: MineClass,
        private explosionClass: ExplosionClass,
        private mine: HTMLDivElement = document.createElement('div'),
        private translatePositionX = 0,
        private translatePositionY = 0
    ) {}

    public init() {
        this.mine.setAttribute('class', this.mineClass);
        DOMElements.gameField.appendChild(this.mine);
        this.setPosition();
    }

    private setPosition() {
        this.mine.style.position = 'absolute';
        this.mine.style.top = `${this.randomPosition('y')}px`;
        this.mine.style.left = `${this.randomPosition('x')}px`;
        this.mine.style.transform = `translate(${this.checkPositionX()}px,${this.checkPositionY()}px)`;
    }

    private randomPosition(axis: 'x' | 'y'): number {
        const value = axis === 'x' ? window.innerWidth : window.innerHeight;
        return Math.floor(Math.random() * value);
    }

    private checkPositionX() {
        if (this.mine.offsetLeft > window.innerWidth - this.mine.offsetWidth) {
            return (this.translatePositionX = -this.mine.offsetWidth);
        }
        if (this.mine.offsetLeft < this.mine.offsetWidth) {
            return (this.translatePositionX = this.mine.offsetWidth / 3);
        }
        return this.translatePositionX;
    }

    private checkPositionY() {
        if (
            this.mine.offsetTop >=
            window.innerHeight - this.mine.offsetHeight * 2
        ) {
            return (this.translatePositionY = -this.mine.offsetHeight * 2);
        }
        if (this.mine.offsetTop < this.mine.offsetHeight) {
            return (this.translatePositionY = this.mine.offsetHeight * 2);
        }
        return this.translatePositionY;
    }

    public getPosition(): ElementPosition {
        return {
            edgeLeft: this.mine.offsetLeft + this.translatePositionX,

            edgeRight:
                this.mine.offsetLeft +
                this.mine.offsetWidth +
                this.translatePositionX,

            topEdge: this.mine.offsetTop + this.translatePositionY,
        };
    }

    public async explode() {
        this.mine.style.backgroundPositionX = '-68px';
        this.mine.style.opacity = '1';
        DOMElements.mineExplosion.load();
        DOMElements.mineExplosion.play();
        await this.setExplosion();
        await this.remove();
    }

    private async setExplosion() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.mine.style.backgroundPositionX = '0px';
                this.mine.classList.remove(this.mineClass);
                this.mine.classList.add(this.explosionClass);
                resolve('');
            }, 100);
        });
    }
    private async remove() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.mine.remove();
                resolve('');
            }, 600);
        });
    }
}
