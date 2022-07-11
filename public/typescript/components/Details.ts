import { DOMElements } from '../base';

class Details {
    private details = DOMElements.details;
    private clickSound = DOMElements.clickSound;

    public init() {
        if (this.checkStatus) {
            this.details.forEach((detail) => {
                detail.addEventListener('click', () => {
                    setTimeout(() => {
                        this.clickSound.play();
                    }, 100);
                    this.details.forEach((item) => {
                        if (item !== detail) {
                            item.open = false;
                        }
                    });
                });
            });
        }
    }

    private checkStatus() {
        if (this.details.length <= 0) {
            console.error('Not every details tag has been loaded');
            return false;
        } else {
            return true;
        }
    }
}

export default Details;
