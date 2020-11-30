import BaseInteraction from "./Base";

export default class Stock extends BaseInteraction {
    click = (card) => {
        if (!this.hand().isHoldingCard()) {
            if (card) {
                this.engine.stock._moveToWaste(card);
            } else {
                this.engine.stock._recycleWaste();
            }
        } else {
            //@todo blink stock
        }
    }
}