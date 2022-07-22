import { IsActive, SpaceshipModel, SettingsType, GameState } from './base';

class State {
    private static getCookieValue = (name: string) => {
        let cookieValue: string | undefined = undefined;
        const allcookies = document.cookie;
        const array = allcookies.split(';');
        array.forEach((cookie) => {
            if (cookie.includes(name)) {
                const index = cookie.indexOf('=');
                const string = cookie.slice(index + 1);
                cookieValue = string;
            }
        });
        return cookieValue;
    };

    static muted_click = State.getCookieValue('muted_click') as IsActive;
    static muted_background = State.getCookieValue(
        'muted_background'
    ) as IsActive;
    static destroyer_missle = State.getCookieValue(
        'destroyer_missle'
    ) as IsActive;
    static spaceship_red = State.getCookieValue('spaceship_red') as IsActive;
    static spaceship_model = State.getCookieValue(
        'spaceship_model'
    ) as SpaceshipModel;

    static spaceship_small = State.getCookieValue(
        'spaceship_small'
    ) as IsActive;
    static spaceship_big = State.getCookieValue('spaceship_big') as IsActive;
    static spaceship_medium = State.getCookieValue(
        'spaceship_medium'
    ) as IsActive;
    static space_mine = State.getCookieValue('space_mine') as IsActive;
    static player_money: Number = parseInt(
        State.getCookieValue('player_money'),
        10
    );

    static gameState = {
        player_spaceship: null,
        player_money: 0,
        player_lives: 0,
        player_bullets: [],
        player_mines: [],
        space_mines_number: 4,
        max_enemy_number: Number(State.getCookieValue('max_enemy_number')),
        enemy_bullets: [],
        enemy_spaceships: [],
        destroyer_missle: State.destroyer_missle,
        destroyed_enemies: 0,
        is_game_won: false,
        hittedBy: '',
    } as GameState;

    public static async setState(
        cookieName: SettingsType,
        value: IsActive | SpaceshipModel | number,
        endpoint: string
    ) {
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cookieName,
                value,
            }),
        });
        const data = await response.json();
        if (data.message === 'updated successfully') {
            Object.defineProperty(State, cookieName, {
                value,
                writable: true,
            });
        }
    }

    public static getState(value: string) {
        if (State.hasOwnProperty(value)) {
            type ObjectKey = keyof typeof State;
            const property = value as ObjectKey;
            return State[property];
        } else return undefined;
    }
}

export default State;
