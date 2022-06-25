class Slider {
    private slideIndex = 0;
    private arrowPrev = document.querySelector<HTMLDivElement>('.slider__prev');
    private arrowNext = document.querySelector<HTMLDivElement>('.slider__next');
    private slides = Array.from(
        document.querySelectorAll<HTMLDivElement>('.slider__content')
    );
    private dots = Array.from(
        document.querySelectorAll<HTMLSpanElement>('.dot')
    );

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
            console.log(this.arrowPrev, this.arrowNext, this.slides, this.dots);
            return true;
        } else return false;
    }

    private displaySlide() {
        if (0 > this.slideIndex) this.slideIndex = 0;
        if (this.slides.length - 1 < this.slideIndex) this.slideIndex = 2;
        this.slides.forEach((slide) => slide.classList.remove('fade'));
        this.dots.forEach((dot) => dot.classList.remove('active'));
        this.slides[this.slideIndex].classList.add('fade');
        this.dots[this.slideIndex].classList.add('active');
    }
}

export default Slider;
