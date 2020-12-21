import Card from "../Deck/Card";

export default class Focus {
    constructor(settings) {
        this.settings = settings;
        this.card = null;
        this.stack = null;
        this.keyboard = false;
    }

    validSettings = () => this.settings.launchSettings.inputMode !== "mouse";

    isKeyBoard = (isKeyboard) => {
        this.keyboard = isKeyboard;
    }

    setCard = (card) => {
        this.card = card;
        this.stack = null;
    };

    unsetCard = (card) => {
        if (this.card && card && Card.equals(this.card, card)) {
            this.card = null;
        }
    };

    unsetStack = (stack) => {
        if (this.stack && stack && this.stack == stack) {
            this.stack = null;
        }
    }

    setStack = (stack) => {
        this.card = null;
        this.stack = stack;
    };

    hasCard = (card) => this.keyboard && this.validSettings() && this.card && card && Card.equals(this.card, card);

    hasStack = (stack) => this.keyboard && this.validSettings() && this.stack && stack && this.stack == stack;
}
