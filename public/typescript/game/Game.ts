import { DOMElements } from '../base';

import Buttons from '../components/Buttons';
import State from '../State';
import Result from './Resut';
import SpaceshipsFactory from './SpaceshipsFactory';

import MinesFactory from './MinesFactory';

const { gameState } = State;

class Game {
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
                gameState.player_mines,
                gameState.enemy_spaceships
            );
        });
    }, this.elementsPositionInterval);

    private displayEnemies = setInterval(() => {
        if (gameState.player_lives <= 0) {
            return this.lose();
        }
        if (
            gameState.max_enemy_number === 0 &&
            gameState.player_lives >= 1 &&
            gameState.enemy_spaceships.length === 0 &&
            gameState.is_game_won === true
        ) {
            return this.win();
        }
        if (gameState.max_enemy_number > 0) {
            SpaceshipsFactory.createEnemySpaceship();
            gameState.max_enemy_number--;
        }
    }, this.displayEnemiesInterval);

    private checkSpaceshipsPosition = setInterval(() => {
        requestAnimationFrame(() => {
            Result.checkSpaceshipsPosition(
                gameState.player_spaceship,
                gameState.enemy_spaceships
            );
        });
    }, this.elementsPositionInterval);

    private checkBulletsPosition = setInterval(() => {
        requestAnimationFrame(() => {
            Result.checkBulletsPosition(gameState.player_bullets);
            Result.checkBulletsPosition(gameState.enemy_bullets);
        });
    }, this.elementsPositionInterval);

    private checkCollision = setInterval(() => {
        requestAnimationFrame(() => {
            Result.checkCollision(
                gameState.player_spaceship,
                gameState.enemy_spaceships,
                gameState.enemy_bullets
            );
        });
    }, this.elementsPositionInterval);

    private checkBulletsHits = setInterval(() => {
        requestAnimationFrame(() => {
            Result.checkHits(
                gameState.player_bullets,
                gameState.enemy_spaceships
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
        const myButtons = new Buttons();
        myButtons.init();
        const backButton = document.querySelector<HTMLButtonElement>('.back');
        backButton.addEventListener('click', this.updateGame);
    }

    private updateGame() {
        const newEnemiesNumber = State.max_enemy_number + 10;
        const money =
            Number(State.player_money) + Number(gameState.player_money);
        State.setState('player_money', money, '/game/shop');
        State.setState('max_enemy_number', newEnemiesNumber, 'game/shop');
    }

    private clearGameField() {
        gameState.enemy_bullets.forEach((bullet) => bullet.remove());
        gameState.enemy_spaceships.forEach((enemy) => enemy.remove());
        gameState.player_bullets.forEach((bullet) => bullet.remove());
        gameState.player_spaceship.remove();
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
        const {
            player_money,
            destroyed_enemies,
            hittedBy,
            is_game_won,
            max_enemy_number,
        } = gameState;

        if (gameState.is_game_won === false) {
            const reason =
                hittedBy === 'bullet' || hittedBy === 'spaceship'
                    ? `Your spaceship has been destroyed by colision with ${hittedBy}`
                    : `You haven't had collision but too many spaceships flew out the windows`;

            return `
            <h3>You lost 😑</h3>
            <div class="modal--game__element"> Destroyed enemy spaceships : ${destroyed_enemies}</div>
            <br>
            <div class="modal--game__element warning">${reason}</div>
            <br>
            <div class="modal--game__element warning">Enemies left :${max_enemy_number}</div>
            <br>
            <button class="btn-nav" data-href="/game">Play again ➧</button>
            <button class="btn-nav" data-href="/game/shop">Back to shop ↺</button>

            `;
        } else if (is_game_won === true) {
            return `
            <h3>Congrats you won the game 😀</h3>
            <div class="modal--game__element">Destroyed enemy spaceships : ${destroyed_enemies}</div>
            <br>
            <span class="wallet">Your earned money : ${player_money}</span>
            <br>
            <button class="btn-nav" data-href="/game">Play again ➧</button>
            <button class="btn-nav back" data-href="/game/shop">Go to shop ↺</button>

            `;
        }
    }
}

export default Game;
