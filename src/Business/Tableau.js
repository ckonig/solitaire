export default class Tableau {
    constructor(blinker) {
        this.blink = (index, state) => blinker.startBlink((s) => s.tableau.stacks[index], state);
    }

    dispatchPutDown = (card, position, state, index) => {
        if (state.tableau.wouldAccept(index, state.hand)) {
            const src = state.hand.source;
            state.tableau.add(index, state.hand.putDown()) && state.game.registerMove("tableau-" + index, src);
        } else {
            this.blink(index, state);
        }
    };

    dispatchPickup = (card, position, state, index) => {
        if (card && !this.tryUncover(card, index, state) && !card.isHidden) {
            state.hand.pickUp(state.tableau.popWithFollowing(card, index), card.source, position) && state.game.registerPickup();
        } else if (!card) {
            this.blink(index, state);
        }
    };

    tryUncover = (card, index, state) =>
        !state.hand.isHoldingCard() && card.isHidden && state.tableau.uncover(index, card) && state.game.registerUncover();
}
