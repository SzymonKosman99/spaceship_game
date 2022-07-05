import { DOMElements } from '../base';

class Slider {
    private slideIndex = 0;
    private arrowPrev = DOMElements.arrowPrev;
    private arrowNext = DOMElements.arrowNext;
    private slides = DOMElements.slides;
    private dots = DOMElements.dots;
    private clickSound = DOMElements.clickSound;

    public init() {
        if (this.checkItems()) {
            const elements: Array<HTMLDivElement | HTMLSpanElement> = [
                ...this.dots,
                this.arrowPrev,
                this.arrowNext,
            ];

            elements.forEach((element) => {
                element.addEventListener('click', () => {
                    if (element.nodeName === 'DIV') {
                        const shift = Number(element.dataset.value);
                        this.slideIndex += shift;
                        this.displaySlide();
                    }
                    if (element.nodeName === 'SPAN') {
                        this.slideIndex = Number(element.dataset.dot);
                        this.displaySlide();
                    }
                });
            });
        } else return console.error(`Not every element has been loaded`);
    }

    private checkItems() {
        if (
            this.arrowPrev &&
            this.arrowNext &&
            this.slides.length === 3 &&
            this.dots.length === 3
        ) {
            return true;
        } else return false;
    }

    private displaySlide() {
        if (0 > this.slideIndex) return (this.slideIndex = 0);
        if (this.slides.length - 1 < this.slideIndex)
            return (this.slideIndex = 2);
        this.slides.forEach((slide) => slide.classList.remove('fade'));
        this.dots.forEach((dot) => dot.classList.remove('active'));
        this.slides[this.slideIndex].classList.add('fade');
        this.dots[this.slideIndex].classList.add('active');
        this.clickSound.play();
    }
}

export default Slider;
