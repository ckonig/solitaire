import Service from "./BaseService";

export default class TableauStack extends Service {
    _dispatchPutDown = (card, state, index) => {
        if (this.canPutDown(card, state, index)) {
            state.game.registerMove("tableau-" + index, state.hand.currentCard());
            state.tableau.add(index, state.hand.putDown());
        } else {
            this.blink(index, state);
        }
    };

    canPutDown = (card, state, index) =>
        !state.hand.containsCurrentCard(state.tableau.stacks[index].stack) &&
        ((card && state.hand.isFromCurrentSource(card) && card.isHidden) ||
            (card && state.tableau.accepts(index, state.hand.currentCard())) ||
            (!card && (state.hand.isHoldingKing() || state.hand.source == "tableau-" + index)));

    _dispatchPickup = (card, state, index) => {
        if (card && !this.tryUncover(card, index, state) && !card.isHidden) {
            state.hand.pickUp(state.tableau.popWithFollowing(card, index), card.source);
        } else if (!card) {
            this.blink(index, state);
        }
    };

    tryUncover = (card, index, state) =>
        !state.hand.isHoldingCard() && card.isHidden && state.tableau.uncover(index, card) && state.game.registerUncover(card, state);

    blink = (index, state) => this._blink((s) => s.tableau.stacks[index], state);
}
