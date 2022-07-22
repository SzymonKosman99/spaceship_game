import { DOMElements } from '../base';

import Buttons from '../components/Buttons';
import State from '../State';
import Result from './Resut';
import SpaceshipsFactory from './SpaceshipsFactory';

import MinesFactory from './MinesFactory';

class Game {
    constructor() {}
    private displayEnemiesInterval = 1000;
    private elementsPositionInterval = 10;

    public start() {
        SpaceshipsFactory.createPlayerSpaceship();
        if (State.space_mine === 'active') {
            MinesFactory.createMines();
        } else clearInterval(this.checkMinesHits);
    }

    private checkMinesHits = setInterval(() => {
        requestAnimationFrame(() => {
            Result.checkHits(
                State.gameState.player_mines,
                State.gameState.enemy_spaceships
            );
        });
    }, this.elementsPositionInterval);

    private displayEnemies = setInterval(() => {
        if (State.gameState.player_lives <= 0) {
            return this.lose();
        }
        if (
            State.gameState.max_enemy_number === 0 &&
            State.gameState.player_lives >= 1 &&
            State.gameState.enemy_spaceships.length === 0 &&
            State.gameState.is_game_won === true
        ) {
            return this.win();
        }
        if (State.gameState.max_enemy_number > 0) {
            SpaceshipsFactory.createEnemySpaceship();
            State.gameState.max_enemy_number--;
        }
    }, this.displayEnemiesInterval);

    private checkSpaceshipsPosition = setInterval(() => {
        requestAnimationFrame(() => {
            Result.checkSpaceshipsPosition(
                State.gameState.player_spaceship,
                State.gameState.enemy_spaceships
            );
        });
    }, this.elementsPositionInterval);

    private checkBulletsPosition = setInterval(() => {
        requestAnimationFrame(() => {
            Result.checkBulletsPosition(State.gameState.player_bullets);
            Result.checkBulletsPosition(State.gameState.enemy_bullets);
        });
    }, this.elementsPositionInterval);

    private checkCollision = setInterval(() => {
        requestAnimationFrame(() => {
            Result.checkCollision(
                State.gameState.player_spaceship,
                State.gameState.enemy_spaceships,
                State.gameState.enemy_bullets
            );
        });
    }, this.elementsPositionInterval);

    private checkBulletsHits = setInterval(() => {
        requestAnimationFrame(() => {
            Result.checkHits(
                State.gameState.player_bullets,
                State.gameState.enemy_spaceships
            );
        });
    }, this.elementsPositionInterval);

    private win() {
        this.clearGameField();
        this.displayModal();
    }

    private lose() {
        this.clearGameField();
        this.displayModal();
    }

    private displayModal() {
        const blur = document.createElement('div');
        const modal = document.createElement('div');
        blur.setAttribute('class', 'blur');
        modal.setAttribute('class', 'modal--game');
        modal.innerHTML = this.createModalText();

        DOMElements.gameField.innerHTML = '';
        DOMElements.gameField.appendChild(blur);
        DOMElements.gameField.appendChild(modal);
        DOMElements.navButtons = Array.from(
            document.querySelectorAll<HTMLButtonElement>('.btn-nav')
        );
        console.log(DOMElements.navButtons);
        const myButtons = new Buttons();
        myButtons.init();
        const some = document.querySelector<HTMLButtonElement>('.some');
        some.addEventListener('click', () => {
            const money =
                Number(State.player_money) +
                Number(State.gameState.player_money);
            State.setState('player_money', money, '/game/shop');
        });
    }

    private clearGameField() {
        State.gameState.enemy_bullets.forEach((bullet) => bullet.remove());
        State.gameState.enemy_spaceships.forEach((enemy) => enemy.remove());
        State.gameState.player_bullets.forEach((bullet) => bullet.remove());
        State.gameState.player_spaceship.remove();
        DOMElements.life_bar.remove();
        DOMElements.lives_precent.remove();
        DOMElements.statusDestroyedEnemies.remove();
        clearInterval(this.displayEnemies);
        clearInterval(this.checkSpaceshipsPosition);
        clearInterval(this.checkBulletsPosition);
        clearInterval(this.checkCollision);
        clearInterval(this.checkBulletsHits);
    }

    private createModalText() {
        const { player_money, destroyed_enemies, hittedBy, is_game_won } =
            State.gameState;
        if (State.gameState.is_game_won === false) {
            const reason =
                hittedBy === 'bullet' || hittedBy === 'spaceship'
                    ? `Your spaceship has been destroyed by colision with ${hittedBy}`
                    : `You haven't had collision but too many spaceships flew out the windows`;

            return `
            <h3>You lost 😑</h3>
            <div class="modal--game__element"> Destroyed enemy spaceships : ${destroyed_enemies}</div>
            <div class="modal--game__element warning">${reason}</div>
            <button class="btn-nav" data-href="/game">Play again ➧</button>
            <button class="btn-nav" data-href="/game/shop">Back to shop ↺</button>

            `;
        } else if (is_game_won === true) {
            return `
            <h3>Congrats you won the game 😀</h3>
            <div class="modal--game__element">Destroyed enemy spaceships : ${destroyed_enemies}</div>
            <span class="wallet">Your earned money : ${player_money}</span>
            <button class="btn-nav" data-href="/game">Play again ➧</button>
            <button class="btn-nav some" data-href="/game/shop">Go to shop ↺</button>

            `;
        }
    }
}

export default Game;
