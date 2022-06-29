class Buttons {
    buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.btn'));
    navButtons = Array.from(
        document.querySelectorAll<HTMLButtonElement>('.btn-nav')
    );
    clickSound = document.querySelector<HTMLAudioElement>('#click');

    public init() {
        if (this.checkItems()) {
            const allButtons = this.buttons.concat(this.navButtons);
            allButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    this.clickSound.play();
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
