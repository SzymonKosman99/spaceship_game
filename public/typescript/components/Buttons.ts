import { DOMElements } from '../base';
import getCookieValue from '../getCookieValue';

class Buttons {
    private buttons = DOMElements.buttons;
    private navButtons = DOMElements.navButtons;
    private clickSound = DOMElements.clickSound;

    public init() {
        if (this.checkItems()) {
            const allButtons = this.buttons.concat(this.navButtons);
            allButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (getCookieValue('muted_click') === 'inactive') {
                        this.clickSound.play();
                    }
                    if (btn.dataset.href) {
                        setTimeout(() => {
                            window.location.href = `${btn.dataset.href}`;
                        }, 250);
                    }
                });
            });
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
}

export default Buttons;
