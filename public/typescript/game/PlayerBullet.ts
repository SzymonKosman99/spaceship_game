import Bullet from './abstract/Bullet';
import { BulletClass, ExplosionClass, ElementPosition } from '../base';

class PlayerBullet extends Bullet {
    constructor(
        protected bulletClass: BulletClass,
        protected explosionClass: ExplosionClass,
        protected speed: number,
        protected bullet: HTMLDivElement
    ) {
        super();
    }
    public init(spaceshipPosition: ElementPosition): void {}

    protected setPosition(elementPosition: ElementPosition): void {}

    protected movePosition(): void {}

    public getPosition(): ElementPosition {
        return {
            edgeLeft: 0,
            edgeRight: 0,
            bottomEdge: 0,
        };
    }

    public explode(): void {}

    public remove(): void {}
}

export default PlayerBullet;
