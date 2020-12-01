import BaseInteraction from "./Base";

export default class TableauStack extends BaseInteraction {
    click = (card, index, source) => {
        if (card) {
            if (this.hand().isHoldingCard()) {
                if (!this.service.tableauStack.tryUncover(card, index) && this.hand().isFromCurrentSource(card)) {
                    this.service.tableauStack.tryPutDown(index)
                } else if (this.service.tableauStack.validateTableauStackMove(this.hand().currentCard(), card)) {
                    this.service.tableauStack.tryPutDown(index)
                } else {
                    this.service.tableauStack.blink(index);
                }
            } else if (!this.service.tableauStack.tryUncover(card, index)) {
                this.service.tableauStack.pickup(card)
            }
        } else {
            if (this.hand().isHoldingKing() || this.hand().source == source) {
                this.service.tableauStack.tryPutDown(index)
            } else {
                this.service.tableauStack.blink(index);
            }
        }
    }
}