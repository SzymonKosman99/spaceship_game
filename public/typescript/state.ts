import getCookieValue from './getCookieValue';

export const state = {
    destroyer_missle: getCookieValue('destroyer_missle'),
    spaceship_red: getCookieValue('spaceship_red'),
    spaceship_model: getCookieValue('spaceship_model'),
    space_mine: getCookieValue('space_mine'),
    player_money: getCookieValue('player_money'),
};
