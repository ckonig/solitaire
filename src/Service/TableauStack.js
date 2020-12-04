import { CardRange } from "../Model/Deck/CardRange";
import Service from "./BaseService";

export default class TableauStack extends Service {
    _dispatchPutDown = (card, state, index) => {
        if (card) {
            if (!this.tryUncover(card, index, state) && state.hand.isFromCurrentSource(card) && card.isHidden) {
                this.tryPutDown(index, state);
            } else if (this.validateTableauStackMove(state.hand.currentCard(), card)) {
                this.tryPutDown(index, state);
            } else {
                console.debug("blink for no damn reason");
                this.blink(index, state);
            }
        } else if (state.hand.isHoldingKing() || state.hand.source == "tableau-" + index) {
            this.tryPutDown(index, state);
        } else {
            console.debug("blink for unknown reason");
            this.blink(index, state);
        }
    };

    _dispatchPickup = (card, state, index) => {
        if (card && !this.tryUncover(card, index, state)) {
            this.pickup(card, index, state);
        } else if (!card) {
            this.blink(index, state);
        }
    };

    validateTableauStackMove = (current, top) => {
        // @todo this is different from acceptedCards in foundation although they are very similar -> fix inconsistency
        const range = [...CardRange];
        const currentIndex = range.indexOf(current.face);
        const topIndex = range.indexOf(top.face);
        return currentIndex + 1 == topIndex && current.type.color != top.type.color;
    };

    pickup = (card, index, state) => {
        if (!state.hand.isHoldingCard() && !card.isHidden) {
            state.hand.pickUp(state.tableau.popWithFollowing(card, index), card.source);
        }
    };

    tryPutDown = (index, state) => {
        if (state.hand.isHoldingCard() && !state.hand.containsCurrentCard(state.tableau.stacks[index].stack)) {
            state.game.registerMove("tableau-" + index, state.hand.currentCard());
            state.tableau.add(index, state.hand.putDown());
        }
    };

    tryUncover = (card, index, state) => {
        //@todo decide and check in model if can be uncovered
        if (!state.hand.isHoldingCard() && card.isHidden && card.canUncover) {
            state.tableau.uncover(index, card) && state.game.registerUncover(card, state);
            return true;
        }
        return false;
    };

    blink = (index, state) => this._blink((s) => s.tableau.stacks[index], state);
}
