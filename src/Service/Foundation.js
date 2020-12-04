import Service from "./BaseService";

export default class Foundation extends Service {
    _dispatchPutDown = (card, state, index) => {
        if (!state.hand.hasMoreThanOneCard() && state.foundation.accepts(index, state.hand.currentCard())) {
            if (state.hand.isHoldingCard() && !state.foundation.contains(index, state.hand.currentCard())) {
                state.game.registerMove("foundation-" + index, state.hand.currentCard());
                state.foundation.add(index, state.hand.currentCard());
                state.hand.putDown();
                this.tryDetectEnd(state);
            }
        } else {
            this.blink(index, state);
        }
    };

    _dispatchPickup = (_card, state, index) => {
        const card = state.foundation.getTop(index);
        if (card) {
            if (state.foundation.getPreviousUsed(index) === card.face) {
                state.foundation.remove(index, card);
                state.hand.pickUp([card], card.source);
            }
        } else {
            this.blink(index, state);
        }
    };

    tryDetectEnd(state) {
        const nrofCards = state.foundation.stacks.map((f) => parseInt(f.stack.length)).reduce((a, b) => a + b, 0);
        if (nrofCards === 52) {
            state.isEnded = true;
            state.end = Date.now();
        }
    }

    blink = (index, state) => this._blink((s) => s.foundation.stacks[index], state);
}
