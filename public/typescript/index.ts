import '../scss/index.scss';

import Buttons from './components/Buttons';
import Checkboxs from './components/Checkboxs';
import Details from './components/Details';
import Products from './components/Products';
import Slider from './components/Slider';
import Wallet from './components/Wallet';

import Game from './game/Game';
import { DOMElements } from './base';

import State from './State';

window.onload = () => {
    if (!DOMElements.gameField && State.muted_background === 'inactive') {
        DOMElements.backgroundSound.play();
    }

    if (DOMElements.startLayout) {
        const myButtons = new Buttons();
        const mySlider = new Slider();

        mySlider.init();
        myButtons.init();
    }

    if (DOMElements.infoLayout) {
        const myButtons = new Buttons();
        const myDetails = new Details();

        myButtons.init();
        myDetails.init();
    }

    if (DOMElements.settingsLayout) {
        const myButtons = new Buttons();
        const myCheckboxs = new Checkboxs();

        myButtons.init();
        myCheckboxs.init();
    }

    if (DOMElements.shopLayout) {
        const myButtons = new Buttons();
        const myCheckboxs = new Checkboxs();
        const myProducts = new Products();

        myButtons.init();
        myCheckboxs.init();
        myProducts.init();
        Wallet.displayMoney();
    }

    if (DOMElements.gameField) {
        const myGame = new Game();
        myGame.start();
    }
};
