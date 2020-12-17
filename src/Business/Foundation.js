export default class Foundation {
    constructor(blinker) {
        this.blink = (index, state) => blinker.startBlink((s) => s.foundation.stacks[index], state);
    }

    dispatchPutDown = (_card, position, state, index) => {
        if (state.foundation.wouldAccept(index, state.hand)) {
            const src = state.hand.source;
            state.foundation.add(index, state.hand.putDown()) && state.game.registerMove("foundation-" + index, src);
            this.tryDetectEnd(state);
        } else {
            this.blink(index, state);
        }
    };

    dispatchPickup = (_card, position, state, index) => {
        const card = state.foundation.getTop(index);
        if (card && state.foundation.getPreviousUsed(index) === card.face) {
            state.hand.pickUp([state.foundation.remove(index, card)], card.source, position) && state.game.registerPickup();
        } else {
            this.blink(index, state);
        }
    };

    //@todo move this to a generic place, also detect failure
    tryDetectEnd(state) {
        const nrofCards = state.foundation.countCards();
        if (nrofCards === 52) {
            state.game.isEnded = true;
            state.game.end = Date.now();
        }
    }
}
