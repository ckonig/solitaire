import BaseInteraction from "./Base";

export default class Waste extends BaseInteraction {
    click = (card) => {
        if (this.hand().isHoldingCard() && !this.hand().isCurrentCard(card)) {
            this.engine.waste.tryPutDown(card);
        } else if (card && !this.hand().isHoldingCard()) {
            this.engine.waste.pickup(card)
        }
    }
}