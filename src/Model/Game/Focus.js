import Card from "../Deck/Card";

export default class Focus {
    constructor(settings) {
        this.settings = settings;
        this.card = null;
        this.stack = null;
    }

    validSettings = () => this.settings.mouseMode !== "follow-cursor";

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

    hasCard = (card) => this.validSettings() && this.card && card && Card.equals(this.card, card);

    hasStack = (stack) => this.validSettings() && this.stack && stack && this.stack == stack;
}
