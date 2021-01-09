import BasicStack from "./BasicStack";
import Hand from "./Hand";

export default class HandHoldingStack extends BasicStack {
    hand: Hand;
    constructor(source: string, hand: Hand) {
        super(source);
        this.hand = hand;
    }
    getHandContent = () => (this.hand.source == this.source ? this.hand.stack : []);
    getClickable = () => [...this.stack.filter((card) => card.canClick()), ...this.getHandContent().filter((card) => card.canClick())];
    blinkFor = 0;
    unblink = () => {};
}
