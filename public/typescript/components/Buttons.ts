import Table from './Table';

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
            const parentNode = button.parentNode as HTMLLIElement;
            const product = parentNode.dataset.product;
            if (
                State.getState(product) === 'inactive' &&
                button.textContent === 'buy'
            ) {
                button.disabled = true;
                button.classList.remove('btn');
                button.classList.add('btn--inactive');
                button.textContent = '✗✗✗✗';
            }
            if (
                State.getState(product) === 'active' &&
                button.textContent === 'buy'
            ) {
                button.disabled = true;
                button.textContent = 'Purchased';
            }
        });
    }

    private async displayInfo(product: Product) {
        try {
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
                this.clickSound.play();
                document.body.removeChild(modal);
                document.body.removeChild(blur);
            };
            document.body.appendChild(blur);
            document.body.appendChild(modal);
            this.checkStatus();
        } catch (error) {
            console.error(error);
        }
    }
}

export default Buttons;
