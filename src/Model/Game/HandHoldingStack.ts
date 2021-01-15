import BasicStack from "./Stack";
import Hand from "./Hand";

abstract class HandHoldingStack extends BasicStack {
    hand: Hand;
    constructor(source: string, hand: Hand) {
        super(source);
        this.hand = hand;
    }
    getHandContent = () => (this.hand.source === this.source ? this.hand.stack : []);
    getClickable = () => [...this.stack.filter((card) => card.canClick()), ...this.getHandContent().filter((card) => card.canClick())];
}

export default HandHoldingStack;
