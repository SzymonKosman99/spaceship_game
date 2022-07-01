type SettingsType = 'muted_click' | 'muted_background' | 'spaceship_blue';
type IsActive = 'active' | 'inactive';

class Checkboxs {
    checkboxs = Array.from(
        document.querySelectorAll<HTMLInputElement>('[data-checkbox]')
    );
    clickSound = document.querySelector<HTMLAudioElement>('#click');

    public init() {
        if (this.checkItems()) {
            this.checkboxs.forEach((checkbox) => {
                checkbox.addEventListener('click', () => {
                    let setting = checkbox.dataset.setting as SettingsType;
                    let value = checkbox.dataset.value as IsActive;

                    this.clickSound.play();
                    if (checkbox.checked) {
                        value = 'active';
                        this.toggleOption(setting, value);
                    } else {
                        value = 'inactive';
                        this.toggleOption(setting, value);
                    }
                });
            });
        }
    }

    private checkItems() {
        if (this.clickSound && this.checkboxs.length !== 0) {
            return true;
        } else return false;
    }

    private async toggleOption(setting: SettingsType, value: IsActive) {
        console.log(setting, value);
    }
}

export default Checkboxs;
