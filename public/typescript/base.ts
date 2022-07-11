export const DOMElements = {
    arrowPrev: document.querySelector<HTMLDivElement>('.slider__prev'),
    arrowNext: document.querySelector<HTMLDivElement>('.slider__next'),
    buttons: Array.from(document.querySelectorAll<HTMLButtonElement>('.btn')),
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
