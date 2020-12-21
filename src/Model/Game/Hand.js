import Card from "../Deck/Card";

export default class Hand {
    constructor() {
        this.stack = [];
        this.source = null;
        this.position = null;
    }

    pickUp = (stack, source, position) => {
        if (stack && stack[0]) {
            this.stack = stack.map((c) => {
                c.suggestion = false;
                return c;
            });
            this.source = source;
            this.position = position;
        }

        return stack;
    };

    putDown = () => {
        this.source = null;
        const result = this.stack.splice(0, this.stack.length);
        return result;
    };

    setOnClick = (model) => {
        if (this.source && this.source == model.source) {
            let _onClick = model.clickEmpty;
            if (model.stack.length) {
                _onClick = model.stack[model.stack.length - 1].onClick;
            }
            this.stack.forEach((card) => {
                card.onClick = _onClick;
                card.canClick = true;
            });
        }
    };

    isHoldingCard = () => !!this.stack.length;

    isHoldingKing = () => this.isHoldingCard() && this.currentCard().face == "K";

    currentCard = () => this.isHoldingCard() && this.stack[0];

    hasMoreThanOneCard = () => this.stack.length > 1;

    isFromCurrentSource = (card) => this.source && card.source == this.source;

    isFromWaste = () => this.source && this.source == "waste";

    isFromFoundation = (index) => this.source && this.source == `foundation-${index}`;

    isFromTableau = (index) => this.source && this.source == `tableau-${index}`;

    isFromAnyTableau = () => this.source && this.source.substring(0, 8) == "tableau-";

    getTableauIndex = () => this.source && this.source.substring(8);

    static copy = (orig) => {
        const copy = new Hand(orig.focus);
        copy.stack = Card.copyAll(orig.stack);
        copy.source = orig.source;
        copy.position = orig.position;
        return copy;
    };
}
