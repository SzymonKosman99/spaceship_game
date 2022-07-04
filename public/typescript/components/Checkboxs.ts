import getCookieValue from '../getCookieValue';

type SettingsType = 'muted_click' | 'muted_background' | 'spaceship_red';
type IsActive = 'active' | 'inactive';

class Checkboxs {
    checkboxs = Array.from(
        document.querySelectorAll<HTMLInputElement>('[data-checkbox]')
    );
    clickSound = document.querySelector<HTMLAudioElement>('#click');

    public init() {
        if (this.checkItems()) {
            this.checkStatus();
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

    private async toggleOption(setting: SettingsType, value: IsActive) {
        const data = {
            setting,
            value,
        };
        return fetch('/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });
    }

    private checkItems() {
        if (this.clickSound && this.checkboxs.length !== 0) {
            return true;
        } else return false;
    }

    private checkStatus() {
        this.checkboxs.forEach((checkbox) => {
            if (getCookieValue(checkbox.dataset.setting) === 'active') {
                checkbox.checked = true;
            }
        });
    }
}

export default Checkboxs;