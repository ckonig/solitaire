import BaseInteraction from "./Base";

export default class Waste extends BaseInteraction {
    click = (card) => {
        if (this.hand().isHoldingCard() && !this.hand().isCurrentCard(card)) {
            this.engine.waste._tryPutBackToWaste(card);
        } else if (card && !this.hand().isHoldingCard()) {
            this.engine.waste._pickup(card)
        }
    }
}