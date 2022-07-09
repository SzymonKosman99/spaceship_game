import Table from './Table';
import Wallet from './Wallet';

import { DOMElements, Product } from '../base';
import State from '../State';

class Buttons {
    private buttons = DOMElements.buttons;
    private navButtons = DOMElements.navButtons;
    private clickSound = DOMElements.clickSound;
    private table = new Table();

    public init() {
        if (this.checkItems()) {
            this.checkStatus();
            const allButtons = this.buttons.concat(this.navButtons);
            allButtons.forEach((btn) => {
                btn.addEventListener('click', () => this.handleClick(btn));
            });
        }
    }

    private handleClick(btn: HTMLButtonElement) {
        if (State.muted_click === 'inactive') {
            this.clickSound.play();
        }
        if (btn.dataset.info) {
            const product = btn.dataset.info as Product;
            this.displayInfo(product);
        }

        if (btn.dataset.href) {
            setTimeout(() => {
                window.location.href = `${btn.dataset.href}`;
            }, 250);
        }
    }

    private checkItems() {
        if (
            (this.clickSound && this.buttons.length !== 0) ||
            this.navButtons.length !== 0
        ) {
            return true;
        } else return false;
    }

    private checkStatus() {
        this.buttons.forEach((button) => {
            button.dataset.price ? (button.textContent = 'buy') : null;
            button.removeAttribute('class');
            const parentNode = button.parentNode as HTMLLIElement;
            const product = parentNode.dataset.product as Product;
            const price = Number(button.dataset.price);
            if (
                State.getState('player_money') < price &&
                button.textContent === 'buy' &&
                State.getState(product) === 'inactive'
            ) {
                button.disabled = true;
                button.classList.add('btn--unavailable');
                button.textContent = '✗✗✗✗';
            } else if (
                State.getState(product) === 'active' &&
                button.textContent === 'buy'
            ) {
                button.disabled = true;
                button.classList.add('btn--inactive');
                button.textContent = 'Purchased';
            } else if (price) {
                button.classList.add('btn');
                button.addEventListener('click', () => {
                    this.handlePurchase(price, product);
                });
            } else {
                button.classList.add('btn');
            }
        });
    }

    private async handlePurchase(price: number, product: Product) {
        const score = Number(State.player_money) - price;
        console.log(score);
        try {
            await State.setState('player_money', score, '/game/shop');
            await State.setState(product, 'active', '/game/shop');
            Wallet.displayMoney();
            this.checkStatus();
        } catch (error) {
            console.error(`Problems with purchase : ${error}`);
        }
    }

    private displayInfo(product: Product) {
        const blur = document.createElement('div');
        const modal = document.createElement('div');
        const btn = document.createElement('button');
        blur.classList.add('blur');
        modal.classList.add('modal');
        btn.classList.add('btn-nav');
        btn.textContent = 'Back ↺';
        modal.innerHTML = this.table.renderTable(product);
        modal.appendChild(btn);
        btn.onclick = () => {
            State.muted_click === 'inactive' ? this.clickSound.play() : null;
            modal.removeChild(btn);
            document.body.removeChild(modal);
            document.body.removeChild(blur);
        };
        document.body.appendChild(blur);
        document.body.appendChild(modal);
    }
}

export default Buttons;
