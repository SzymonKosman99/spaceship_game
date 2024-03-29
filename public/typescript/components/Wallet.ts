import { DOMElements } from '../base';
import State from '../State';

class Wallet {
    private static spn = DOMElements.wallet;

    public static displayMoney() {
        this.spn.textContent = String(State.getState('player_money'));
        if (this.spn && this.spn.textContent) {
            if (this.spn.textContent.length === 4) {
                const str1 = this.spn.textContent.slice(0, 1);
                const str2 = this.spn.textContent.slice(1, 4);
                this.spn.textContent = str1.concat(' ', str2) + ' $';
            } else if (this.spn.textContent.length === 5) {
                const str1 = this.spn.textContent.slice(0, 2);
                const str2 = this.spn.textContent.slice(2, 5);
                this.spn.textContent = str1.concat(' ', str2) + ' $';
            } else if (this.spn.textContent.length === 6) {
                const str1 = this.spn.textContent.slice(0, 3);
                const str2 = this.spn.textContent.slice(3, 6);
                this.spn.textContent = str1.concat(' ', str2) + ' $';
            } else this.spn.textContent += ' $';
        } else throw Error('span wallet not has been loaded');
    }
}

export default Wallet;
