import { IsActive, SpaceshipModel, SettingsType } from './base';
import getCookieValue from './getCookieValue';

class State {
    static muted_click = getCookieValue('muted_click') as IsActive;
    static muted_background = getCookieValue('muted_background') as IsActive;
    static destroyer_missle = getCookieValue('destroyer_missle') as IsActive;
    static spaceship_red = getCookieValue('spaceship_red') as IsActive;
    static spaceship_model = getCookieValue(
        'spaceship_model'
    ) as SpaceshipModel;

    static spaceship_small = getCookieValue('spaceship_small') as IsActive;
    static spaceship_big = getCookieValue('spaceship_big') as IsActive;
    static spaceship_medium = getCookieValue('spaceship_medium') as IsActive;
    static space_mine = getCookieValue('space_mine') as IsActive;
    static player_money: Number = parseInt(getCookieValue('player_money'), 10);

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
