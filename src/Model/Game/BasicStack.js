export default class BasicStack {
    constructor(source) {
        this.source = source;
    }
    stack = [];
    getTop = () => this.stack && this.stack.length && this.stack[this.stack.length - 1];
    suggestion = false;
    getClickable = () => this.stack.filter((card) => card.canClick());
}

export class HandHoldingStack extends BasicStack {
    constructor(source, hand) {
        super(source);
        this.hand = hand;
    }
    getHandContent = () => this.hand.source == this.source ? this.hand.stack : [];
    getClickable = () => [...this.stack.filter((card) => card.canClick()), ...this.getHandContent().filter((card) => card.canClick())];
}
