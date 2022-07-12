import { BulletClass, ExplosionClass, ElementPosition } from '../../base';

export default abstract class Bullet {
    protected abstract bulletClass: BulletClass;
    protected abstract explosionClass: ExplosionClass;

    protected abstract speed: number;
    protected abstract bullet: HTMLDivElement;

    public abstract init(spaceshipPosition: ElementPosition): void;
    protected abstract setPosition(elementPosition: ElementPosition): void;
    protected abstract movePosition(): void;
    public abstract getPosition(): ElementPosition;
    public abstract explode(): void;
    public abstract remove(): void;
}
