import { SpaceshipClass, ExplosionClass, ElementPosition } from '../../base';
import Bullet from './Bullet';

export default abstract class Spaceship {
    protected abstract spaceshipClass: SpaceshipClass;
    protected abstract explosionClass: ExplosionClass;

    protected abstract lives: number;
    protected abstract speed: number;
    protected abstract spaceship: HTMLDivElement;

    public abstract init(): void;
    protected abstract setPosition(): void;
    protected abstract movePosition(): void | number;
    protected abstract getPosition(): ElementPosition;
    public abstract explode(): void;
    public abstract remove(): void;
}
