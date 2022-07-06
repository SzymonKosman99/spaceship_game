import getCookieValue from '../getCookieValue';
import { SpaceshipModel, SettingsType, IsActive, DOMElements } from '../base';

class Checkboxs {
    private spaceshipModel = DOMElements.spaceshipModel;
    private checkboxs = DOMElements.checkboxs;
    private clickSound = DOMElements.clickSound;
    private settingsLayout = DOMElements.settingsLayout;
    private shopLayout = DOMElements.shopLayout;

    public init() {
        if (this.checkItems()) {
            this.checkStatus();
            this.checkboxs.forEach((checkbox) => {
                checkbox.addEventListener('click', () =>
                    this.handleClick(checkbox)
                );
            });
        }
    }

    private async handleClick(checkbox: HTMLInputElement) {
        let setting = checkbox.dataset.setting as SettingsType;
        let value = checkbox.dataset.value as IsActive | SpaceshipModel;
        this.clickSound.play();

        if (this.settingsLayout) {
            const endpoint = '/settings';
            if (checkbox.checked) {
                value = 'active';
                await this.toggleOption(setting, value, endpoint);
            } else {
                value = 'inactive';
                await this.toggleOption(setting, value, endpoint);
            }
        }
        if (this.shopLayout) {
            const endpoint = '/game/shop';
            try {
                await this.toggleOption(setting, value, endpoint);
                this.setImageAndCheckbox();
            } catch (error) {
                console.error(error);
            }
        }
    }

    private async toggleOption(
        setting: SettingsType,
        value: IsActive | SpaceshipModel,
        endpoint: string
    ) {
        const data = {
            setting,
            value,
        };
        return fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });
    }

    private checkStatus() {
        if (this.shopLayout) {
            this.setImageAndCheckbox();
            this.checkboxs.forEach((checkbox) => {
                const isPurchased = checkbox.dataset.value as SpaceshipModel;
                if (getCookieValue(isPurchased) === 'inactive') {
                    checkbox.disabled = true;
                }
            });
        }
        if (this.settingsLayout) {
            this.checkboxs.forEach((checkbox) => {
                const isSetted = checkbox.dataset.setting as IsActive;
                if (getCookieValue(isSetted) === 'active') {
                    checkbox.checked = true;
                }
            });
        }
    }

    private checkItems() {
        if (this.clickSound && this.checkboxs.length !== 0) {
            return true;
        } else return false;
    }

    private setImageAndCheckbox() {
        const value = getCookieValue('spaceship_model');
        const checkbox = this.checkboxs.find(
            (checkbox) => checkbox.dataset.value === value
        );
        checkbox.checked = true;
        const color =
            getCookieValue('spaceship_red') === 'active' ? 'red' : 'blue';
        this.spaceshipModel.src = `../../images/base/${value}_${color}.png`;
        this.checkboxs.forEach((input) => {
            if (checkbox !== input) {
                input.checked = false;
            }
        });
    }
}

export default Checkboxs;
