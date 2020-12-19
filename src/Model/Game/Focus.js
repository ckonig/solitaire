import Card from "../Deck/Card";

export default class Focus {
    constructor() {
        this.element = null;
    }

    set = (card) => {
        console.debug('SETTING FOCUS', card);
        this.element = card;
    };

    has = (card) => {
        return this.element && card && Card.equals(this.element, card);
    };
}
