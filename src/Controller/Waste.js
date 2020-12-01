import BaseInteraction from "./Base";

export default class Waste extends BaseInteraction {
    click = (card) => {
        if (this.hand().isHoldingCard() && !this.hand().isCurrentCard(card)) {
            this.service.waste.tryPutDown(card);
        } else if (card && !this.hand().isHoldingCard()) {
            this.service.waste.pickup(card)
        }
    }
}