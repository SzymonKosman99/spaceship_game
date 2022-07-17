import Bullet from './game/abstract/Bullet';
import EnemyBullet from './game/EnemyBullet';
import EnemySpaceship from './game/EnemySpaceship';
import PlayerBullet from './game/PlayerBullet';
import PlayerSpaceship from './game/PlayerSpaceship';

export const DOMElements = {
    arrowPrev: document.querySelector<HTMLDivElement>('.slider__prev'),
    arrowNext: document.querySelector<HTMLDivElement>('.slider__next'),
    buttons: Array.from(document.querySelectorAll<HTMLButtonElement>('.btn')),
    blastSound: document.querySelector<HTMLAudioElement>('[data-blast]'),
    backgroundSound: document.querySelector<HTMLAudioElement>('#bgc-sound'),
    clickSound: document.querySelector<HTMLAudioElement>('[data-click]'),
    checkboxs: Array.from(
        document.querySelectorAll<HTMLInputElement>('[data-checkbox]')
    ),
    details: Array.from(
        document.querySelectorAll<HTMLDetailsElement>('details')
    ),
    dots: Array.from(document.querySelectorAll<HTMLSpanElement>('.dot')),
    navButtons: Array.from(
        document.querySelectorAll<HTMLButtonElement>('.btn-nav')
    ),
    gameField: document.querySelector<HTMLDivElement>('.game-field'),
    infoLayout: document.querySelector<HTMLDivElement>('.info'),
    products: Array.from(
        document.querySelectorAll<HTMLImageElement>('[data-product] img')
    ),
    lives_precent: document.querySelector<HTMLDivElement>('.lives_precent'),
    life_bar: document.querySelector<HTMLSpanElement>('.status--player_lives'),
    statusDestroyedEnemies: document.querySelector<HTMLSpanElement>(
        '.status--destroyed_enemies'
    ),
    startLayout: document.querySelector<HTMLDivElement>('.start'),
    slides: Array.from(
        document.querySelectorAll<HTMLDivElement>('.slider__content')
    ),
    spaceshipModel: document.querySelector<HTMLImageElement>(
        '[data-spaceship-model]'
    ),
    settingsLayout: document.querySelector<HTMLDivElement>('.settings'),
    shopLayout: document.querySelector<HTMLDivElement>('.shop'),
    wallet: document.querySelector<HTMLSpanElement>('.wallet'),
};

export type IsActive = 'active' | 'inactive';

export type SpaceshipModel =
    | 'spaceship_small'
    | 'spaceship_medium'
    | 'spaceship_big';

export type SettingsType =
    | 'muted_click'
    | 'muted_background'
    | 'destroyer_missle'
    | 'spaceship_red'
    | 'spaceship_model'
    | 'spaceship_small'
    | 'spaceship_medium'
    | 'spaceship_big'
    | 'space_mine'
    | 'player_money';

export type Product = SpaceshipModel | 'space_mine' | 'destroyer_missle';

//Game field

export type SpaceshipClass =
    | 'spaceship_small_blue'
    | 'spaceship_small_red'
    | 'spaceship_small_blue--rotated'
    | 'spaceship_small_red--rotated'
    | 'spaceship_medium_blue'
    | 'spaceship_medium_red'
    | 'spaceship_medium_blue--rotated'
    | 'spaceship_medium_red--rotated'
    | 'spaceship_big_blue'
    | 'spaceship_big_red'
    | 'spaceship_big_blue--rotated'
    | 'spaceship_big_red--rotated'
    | 'mothership_blue'
    | 'mothership_red';

export type BulletClass =
    | 'bullet_red'
    | 'bullet_blue'
    | 'bullet_blue--rotated'
    | 'bullet_red--rotated';

export type ExplosionClass =
    | 'explosion_small_red'
    | 'explosion_small_blue'
    | 'explosion_big_red'
    | 'explosion_big_blue';

export type ElementPosition = {
    edgeLeft: number;
    edgeRight: number;
    topEdge?: number;
    bottomEdge?: number;
};

export type EnemySmall = {
    spaceshipClass: SpaceshipClass;
    explosionClass: ExplosionClass;
    lives: 1;
    speed: 5;
};

export type EnemyMedium = {
    spaceshipClass: SpaceshipClass;
    explosionClass: ExplosionClass;
    lives: 2;
    speed: 5;
};

export type EnemyBig = {
    spaceshipClass: SpaceshipClass;
    explosionClass: ExplosionClass;
    lives: 3;
    speed: 4;
};
export type Mothership = {
    spaceshipClass: SpaceshipClass;
    explosionClass: ExplosionClass;
    lives: 6;
    speed: 4;
};

export type GameState = {
    player_spaceship: PlayerSpaceship | null;
    player_money: number;
    player_lives: number;
    player_bullets: PlayerBullet[];
    player_mines: unknown;
    max_enemy_number: number;
    enemy_bullets: EnemyBullet[];
    enemy_spaceships: EnemySpaceship[];
    destroyed_enemies: number;
    is_game_won: boolean;
    hittedBy: '' | 'bullet' | 'spaceship';
};
