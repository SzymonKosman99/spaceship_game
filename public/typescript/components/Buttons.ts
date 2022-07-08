import { DOMElements } from '../base';
import State from '../State';

class Buttons {
    private buttons = DOMElements.buttons;
    private navButtons = DOMElements.navButtons;
    private clickSound = DOMElements.clickSound;

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
}

export default Buttons;
