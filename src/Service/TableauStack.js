import { CardRange } from "../Model/Deck/CardRange";
import Service from "./BaseService";

export default class TableauStack extends Service {
    dispatchPutDown = (card, index) => {
        console.log("dispatch put down");
        if (card) {
            //@todo rewrite to be atomic, to allow transaction like state handling in parent class
            if (!this.tryUncover(card, index) && this.hand().isFromCurrentSource(card) && card.isHidden) {
                this.tryPutDown(index);
            } else if (this.validateTableauStackMove(this.hand().currentCard(), card)) {
                this.tryPutDown(index);
            } else {
                this.blink(index);
            }
        } else if (this.hand().isHoldingKing() || this.hand().source == "tableau-" + index) {
            this.tryPutDown(index);
        } else {
            this.blink(index);
        }
    };

    dispatchPickup = (card, index) => {
        console.log("dispatch pick up");
        if (card && !this.tryUncover(card, index)) {
            this.pickup(card, index);
        } else {
            this.blink(index);
        }
    };

    click = (card, index) => (card ? this.clickCard(card, index) : this.clickEmpty(index));

    validateTableauStackMove = (current, top) => {
        // @todo this is different from acceptedCards in foundation although they are very similar -> fix inconsistency
        const range = [...CardRange];
        const currentIndex = range.indexOf(current.face);
        const topIndex = range.indexOf(top.face);
        return currentIndex + 1 == topIndex && current.type.color != top.type.color;
    };

    pickup = (card, index) => {
        this._setState((state) => {
            if (!state.hand.isHoldingCard() && !card.isHidden) {
                state.hand.pickUp(state.tableau.popWithFollowing(card, index), card.source);
            }
        });
    };

    tryPutDown = (index) => {
        this._setState((state) => {
            if (state.hand.isHoldingCard() && !state.hand.containsCurrentCard(state.tableau.stacks[index].stack)) {
                state.game.registerMove("tableau-" + index, state.hand.currentCard());
                state.tableau.add(index, state.hand.putDown());
            }
        });
    };

    tryUncover = (card, index) => {
        //@todo decide and check in model if can be uncovered
        if (!this.hand().isHoldingCard() && card.isHidden && card.canUncover) {
            this._setState((state) => {
                state.tableau.uncover(index, card) && state.game.registerUncover(card, state);
            });
            return true;
        }
        return false;
    };

    blink = (index) => this._blink((s) => s.tableau.stacks[index]);
}
