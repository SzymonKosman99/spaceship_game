export const DOMElements = {
    arrowPrev: document.querySelector<HTMLDivElement>('.slider__prev'),
    arrowNext: document.querySelector<HTMLDivElement>('.slider__next'),
    buttons: Array.from(document.querySelectorAll<HTMLButtonElement>('.btn')),
    clickSound: document.querySelector<HTMLAudioElement>('[data-click]'),
    checkboxs: Array.from(
        document.querySelectorAll<HTMLInputElement>('[data-checkbox]')
    ),
    dots: Array.from(document.querySelectorAll<HTMLSpanElement>('.dot')),
    navButtons: Array.from(
        document.querySelectorAll<HTMLButtonElement>('.btn-nav')
    ),
    products: Array.from(
        document.querySelectorAll<HTMLImageElement>('[data-product] img')
    ),
    slides: Array.from(
        document.querySelectorAll<HTMLDivElement>('.slider__content')
    ),
    spaceshipModel: document.querySelector<HTMLImageElement>(
        '[data-spaceship-model]'
    ),
    settingsLayout: document.querySelector<HTMLDivElement>('.settings'),
    shopLayout: document.querySelector<HTMLDivElement>('.shop'),
};

export type IsActive = 'active' | 'inactive';

export type SpaceshipModel =
    | 'spaceship_small'
    | 'spaceship_medium'
    | 'spaceship_big';

export type SettingsType =
    | 'muted_click'
    | 'muted_background'
    | 'spaceship_red'
    | 'spaceship_model';
