import getCookieValue from '../getCookieValue';
import { DOMElements } from '../base';

class Products {
    constructor() {}
    private products = DOMElements.products;
    public init() {
        if (this.checkItems) {
            if (getCookieValue('spaceship_red') === 'inactive') {
                this.displayImages('blue');
            }
            if (getCookieValue('spaceship_red') === 'active') {
                this.displayImages('red');
            }
        } else console.error('Not every product has been loaded');
    }

    private checkItems() {
        if (this.products.length === 5) {
            return true;
        } else return false;
    }

    private displayImages(color: 'blue' | 'red') {
        this.products.forEach((product) => {
            const parentNode = product.parentNode as HTMLLIElement;
            const imageName = parentNode.dataset.product;
            if (imageName === 'destroyer_missle') {
                product.src = `../../images/base/${imageName}.png`;
            } else product.src = `../../images/base/${imageName}_${color}.png`;
        });
    }
}

export default Products;
