import Bullet from './abstract/Bullet';
import EnemyBullet from './EnemyBullet';
import PlayerSpaceship from './PlayerSpaceship';
import EnemySpaceship from './EnemySpaceship';
import { DOMElements, ElementPosition } from '../base';

import State from '../State';
import PlayerBullet from './PlayerBullet';
import SpaceMine from './SpaceMine';

const { gameState } = State;

class Result {
    public static checkBulletsPosition(bullets: Bullet[]) {
        bullets.forEach((bullet, index, array) => {
            const { topEdge, bottomEdge } = bullet.getPosition();
            if (topEdge < 0 || bottomEdge > window.innerHeight) {
                bullet.remove();
                array.splice(index, 1);
            }
        });
    }

    public static checkCollision(
        playerSpaceship: PlayerSpaceship,
        enemySpaceships: EnemySpaceship[],
        bullets: EnemyBullet[]
    ) {
        const spaceshipPosition = playerSpaceship.getPosition();

        enemySpaceships.forEach((enemy, enemyIndex, enemiesArray) => {
            const enemyPosition = enemy.getPosition();
            if (Result.colisionCondition(spaceshipPosition, enemyPosition)) {
                enemy.explode();
                enemiesArray.splice(enemyIndex, 1);
                playerSpaceship.updateLives(4);
                gameState.hittedBy = 'spaceship';
                if (gameState.player_lives <= 0) playerSpaceship.explode();
            }
        });

        bullets.forEach((bullet, bulletIndex, bulletsArray) => {
            const bulletPositions = bullet.getPosition();
            if (Result.colisionCondition(spaceshipPosition, bulletPositions)) {
                bullet.explode();
                bulletsArray.splice(bulletIndex, 1);
                playerSpaceship.updateLives(1);
                gameState.hittedBy = 'bullet';
                if (gameState.player_lives <= 0) playerSpaceship.explode();
            }
        });
    }

    public static checkHits(
        items: PlayerBullet[] | SpaceMine[],
        enemies: EnemySpaceship[]
    ) {
        items.forEach((bullet, bulletIndex) => {
            enemies.forEach((spaceship, spaceshipIndex) => {
                const bulletPositions = bullet.getPosition();
                const spaceshipPositions = spaceship.getPosition();

                if (Result.hitCondition(bulletPositions, spaceshipPositions)) {
                    if ('bulletClass' in bullet) {
                        if (bullet.bulletClass !== 'destroyer_missle') {
                            Result.updateElements(items, bullet, bulletIndex);
                            spaceship.updateLives(1);
                        } else spaceship.updateLives(10000);
                    }
                    if ('mineClass' in bullet) {
                        Result.updateElements(items, bullet, bulletIndex);
                        spaceship.updateLives(3);
                    }
                    if (spaceship.getLives() <= 0) {
                        spaceship.explode();
                        enemies.splice(spaceshipIndex, 1);
                        gameState.destroyed_enemies += 1;
                        DOMElements.statusDestroyedEnemies.textContent = `Destroyed enemies ${gameState.destroyed_enemies}`;
                    }
                }
            });
        });
    }

    public static checkSpaceshipsPosition(
        playerSpaceship: PlayerSpaceship,
        spaceships: EnemySpaceship[]
    ) {
        if (
            gameState.max_enemy_number === 0 &&
            gameState.player_lives > 0 &&
            gameState.enemy_spaceships.length === 0
        ) {
            return (gameState.is_game_won = true);
        }
        spaceships.forEach((spaceship, spaceshipIndex, array) => {
            const { bottomEdge, edgeLeft, edgeRight } = spaceship.getPosition();
            const spaceshipHeight = edgeRight - edgeLeft;
            if (bottomEdge - spaceshipHeight >= window.innerHeight) {
                spaceship.remove();
                gameState.hittedBy = '';
                array.splice(spaceshipIndex, 1);
                if (gameState.player_lives > 0) {
                    playerSpaceship.updateLives(1);
                    gameState.player_lives ? null : playerSpaceship.remove();
                }
            }
        });
    }

    private static hitCondition(
        bulletPositions: ElementPosition,
        spaceshipPositions: ElementPosition
    ) {
        if (
            (bulletPositions.topEdge <= spaceshipPositions.bottomEdge &&
                bulletPositions.edgeRight > spaceshipPositions.edgeLeft &&
                bulletPositions.edgeRight < spaceshipPositions.edgeRight) ||
            (bulletPositions.topEdge <= spaceshipPositions.bottomEdge &&
                bulletPositions.edgeLeft < spaceshipPositions.edgeRight &&
                bulletPositions.edgeLeft > spaceshipPositions.edgeLeft)
        )
            return true;
    }

    private static colisionCondition(
        spaceshipPosition: ElementPosition,
        elementPosition: ElementPosition
    ) {
        if (
            (elementPosition.bottomEdge >= spaceshipPosition.topEdge &&
                elementPosition.edgeRight > spaceshipPosition.edgeLeft &&
                elementPosition.edgeRight < spaceshipPosition.edgeRight) ||
            (elementPosition.bottomEdge >= spaceshipPosition.topEdge &&
                elementPosition.edgeLeft < spaceshipPosition.edgeRight &&
                elementPosition.edgeLeft > spaceshipPosition.edgeLeft)
        ) {
            return true;
        }
        return false;
    }

    private static updateElements(
        items: PlayerBullet[] | SpaceMine[],
        item: PlayerBullet | SpaceMine,
        itemIndex: number
    ) {
        item.explode();
        items.splice(itemIndex, 1);
    }
}

export default Result;
