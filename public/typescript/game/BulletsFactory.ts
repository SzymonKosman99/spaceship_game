import { BulletClass, ElementPosition, ExplosionClass } from '../base';

import EnemyBullet from './EnemyBullet';
import State from '../State';
import PlayerBullet from './PlayerBullet';

class BulletFactory {
    public static createBullet(
        bulletClass: BulletClass,
        explosionClass: ExplosionClass,
        speed: number,
        spaceshipPosition: ElementPosition
    ) {
        if (bulletClass.includes('--rotated')) {
            const bullet = new EnemyBullet(bulletClass, explosionClass, speed);
            bullet.init(spaceshipPosition);
            State.gameState.enemy_bullets.push(bullet);
        } else {
            const bullet = new PlayerBullet(bulletClass, explosionClass, speed);
            bullet.init(spaceshipPosition);
            State.gameState.player_bullets.push(bullet);
        }
    }
}

export default BulletFactory;
