import BasicStack from "./BasicStack";

export default class HandHoldingStack extends BasicStack {
    constructor(source, hand) {
        super(source);
        this.hand = hand;
    }
    getHandContent = () => (this.hand.source == this.source ? this.hand.stack : []);
    getClickable = () => [...this.stack.filter((card) => card.canClick()), ...this.getHandContent().filter((card) => card.canClick())];
}
