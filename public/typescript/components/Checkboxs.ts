import { SpaceshipModel, SettingsType, IsActive, DOMElements } from '../base';
import State from '../State';

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
        const cookieName = checkbox.dataset.setting as SettingsType;
        let value = checkbox.dataset.value as IsActive | SpaceshipModel;
        this.clickSound.play();

        if (this.settingsLayout) {
            const endpoint = '/settings';
            if (checkbox.checked) {
                value = 'active';
                await State.setState(cookieName, value, endpoint);
            } else {
                value = 'inactive';
                await State.setState(cookieName, value, endpoint);
            }
        }
        if (this.shopLayout) {
            const endpoint = '/game/shop';
            try {
                await State.setState(cookieName, value, endpoint);
                const newCookie =
                    value === 'spaceship_small' ||
                    value === 'spaceship_medium' ||
                    value === 'spaceship_big'
                        ? value
                        : null;
                if (newCookie) {
                    await State.setState(newCookie, 'active', endpoint);
                }

                this.setImageAndCheckbox();
            } catch (error) {
                console.error(error);
            }
        }
    }

    private checkStatus() {
        if (this.shopLayout) {
            this.setImageAndCheckbox();
            this.checkboxs.forEach((checkbox) => {
                const isPurchased = checkbox.dataset.value as SpaceshipModel;
                if (State.getState(isPurchased) === 'inactive') {
                    checkbox.disabled = true;
                } else {
                    checkbox.disabled = false;
                }
            });
        }
        if (this.settingsLayout) {
            this.checkboxs.forEach((checkbox) => {
                const isSetted = checkbox.dataset.setting as IsActive;
                if (State.getState(isSetted) === 'active') {
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
        const checkbox = this.checkboxs.find(
            (checkbox) => checkbox.dataset.value === State.spaceship_model
        );
        checkbox.checked = true;
        const color = State.spaceship_red === 'active' ? 'red' : 'blue';
        this.spaceshipModel.src = `../../images/base/${State.spaceship_model}_${color}.png`;
        this.checkboxs.forEach((input) => {
            if (checkbox !== input) {
                input.checked = false;
            }
        });
    }
}

export default Checkboxs;
