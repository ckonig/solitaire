import BaseInteraction from "./Base";

export default class TableauStack extends BaseInteraction {
    click = (card, index, source) => {
        var stackIsEmpty = !!!card;
        if (card) {
            if (this.engine.tableauStack.tryUncover(card, index)) {
                // can't put card directly onto previously hidden card
            } else if (!this.engine.tableauStack.tryUncover(card, index) && this.hand().isFromCurrentSource(card)) {
                this.engine.tableauStack.tryPutDown(index)
            } else if (this.hand().isHoldingCard() && !this.hand().isCurrentCard(card)) {
                if (this.engine.tableauStack.validateTableauStackMove(this.hand().currentCard(), card)) {
                    this.engine.tableauStack.tryPutDown(index)
                } else {
                    this.engine.tableauStack.blink(index);
                }
            } else {
                this.engine.tableauStack.pickup(card)
            }
        }
        else if (stackIsEmpty && (this.hand().isHoldingKing() || this.hand().isFromCurrentSource({ props: { source: source } }))) {
            this.engine.tableauStack.tryPutDown(index)
        }
    }
}