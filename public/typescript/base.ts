export const DOMElements = {
    clickSound: document.querySelector<HTMLAudioElement>('[data-click]'),
    buttons: Array.from(document.querySelectorAll<HTMLButtonElement>('.btn')),
    navButtons: Array.from(
        document.querySelectorAll<HTMLButtonElement>('.btn-nav')
    ),
    checkboxs: Array.from(
        document.querySelectorAll<HTMLInputElement>('[data-checkbox]')
    ),
    arrowPrev: document.querySelector<HTMLDivElement>('.slider__prev'),
    arrowNext: document.querySelector<HTMLDivElement>('.slider__next'),
    slides: Array.from(
        document.querySelectorAll<HTMLDivElement>('.slider__content')
    ),
    dots: Array.from(document.querySelectorAll<HTMLSpanElement>('.dot')),
};

export type SettingsType = 'muted_click' | 'muted_background' | 'spaceship_red';
export type IsActive = 'active' | 'inactive';
