import { Product } from '../base';

const descriptions = {
    space_mine: `When game starts on game field will be set several mines , every mine is going 
    to explode when enemy ship flied on her, very cheap and also really usefull thing`,

    destroyer_missle: `Player can launch missle which will destroy every enemy ship which will 
    be on his straight, to shot just press x on your keyboard`,

    spaceship_big: `Big spaceship very durable but unfortunatly esily to hit and also esily to
    have collision`,

    spaceship_medium: `The best spaceship in this game , much durable then small spaceship and
    also much faster not so esily for collision`,

    spaceship_small: `Default spaceship which player starts the game ,it is the worst spaceship `,
};

class Table {
    public renderTable(product: Product) {
        const price: number | string = this.getPrice(product);
        const columns = this.getColumns(product);
        const headers = this.getHeaders(columns);
        const body = this.getBody(product, columns, price);

        const productName = (
            product.charAt(0).toUpperCase() + product.slice(1)
        ).replace('_', ' ');

        return `
    <table class='table'>
        <thead>
            <tr>
                <th colspan="${columns}">${productName}</th>
            </tr>
            ${headers}
        </thead>
        ${body}
    </table>`;
    }

    private getPrice(product: Product) {
        return product === 'spaceship_big'
            ? 5000
            : product === 'spaceship_medium'
            ? 5000
            : product === 'destroyer_missle'
            ? 7000
            : product === 'space_mine'
            ? 1000
            : 'this product is purchased by default';
    }

    private getHeaders(columns: 4 | 2) {
        if (columns === 4) {
            return `
            <tr>
                <th style="width:15%">price</th>
                <th style="width:5%">lives</th>
                <th style="width:5%">speed</th>
                <th style="width:75%">description</th>                      
            </tr>            
            `;
        } else {
            return `
            <tr>
                <th style="width:10%">Price</th>
                <th style="width:90%">Description</th>                      
            </tr>            
            `;
        }
    }

    private getBody(product: Product, columns: 2 | 4, price: number | string) {
        const description = this.getDescription(product);

        if (columns === 2) {
            return `
            <tbody>
            <tr>
                <td>${price} $</td>
                <td>${description}</td>
            </tr>
            </tbody>
            `;
        }
        if (columns === 4) {
            const lives = this.getLives(product);
            const speed = this.getSpeed(product);
            return `
            <tbody>
            <tr>
                <td>${price}</td>
                <td>${lives}</td>
                <td>${speed}</td>
                <td>${description}</td>
            </tr>
            </tbody>
            `;
        }
    }

    private getColumns(product: Product) {
        if (product === 'destroyer_missle' || product === 'space_mine') {
            return 2;
        } else return 4;
    }

    private getDescription(product: Product) {
        return product === 'space_mine'
            ? descriptions.space_mine
            : product === 'destroyer_missle'
            ? descriptions.destroyer_missle
            : product === 'spaceship_big'
            ? descriptions.spaceship_big
            : product === 'spaceship_medium'
            ? descriptions.spaceship_medium
            : product === 'spaceship_small'
            ? descriptions.spaceship_small
            : null;
    }
    private getLives(product: Product) {
        if (product === 'spaceship_medium') {
            return 5;
        }
        if (product === 'spaceship_big') {
            return 10;
        }
        if (product === 'spaceship_small') {
            return 3;
        }
    }
    private getSpeed(product: Product) {
        if (product === 'spaceship_medium') {
            return 5.5;
        }
        if (product === 'spaceship_big') {
            return 5;
        }
        if (product === 'spaceship_small') {
            return 5;
        }
    }
}

export default Table;
