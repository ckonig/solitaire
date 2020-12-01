import BaseInteraction from "./Base";

export default class Stock extends BaseInteraction {
    click = (card) => {
        if (!this.hand().isHoldingCard()) {
            if (card) {
                this.service.stock.moveToWaste(card);
            } else {
                this.service.stock.recycleWaste();
            }
        } else {
            this.service.stock.blink();
        }
    }
}