import Service from "./BaseService";

export default class Foundation extends Service {
    _dispatchPutDown = (_card, state, index) => {
        if (!state.hand.hasMoreThanOneCard() && state.foundation.accepts(index, state.hand.currentCard())) {
            state.game.registerMove("foundation-" + index, state.hand.currentCard());
            state.foundation.add(index, state.hand.currentCard());
            state.hand.putDown();
            this.tryDetectEnd(state);
        } else {
            this.blink(index, state);
        }
    };

    _dispatchPickup = (_card, state, index) => {
        const card = state.foundation.getTop(index);
        if (card && state.foundation.getPreviousUsed(index) === card.face) {
            state.hand.pickUp([state.foundation.remove(index, card)], card.source);
        } else {
            this.blink(index, state);
        }
    };

    tryDetectEnd(state) {
        const nrofCards = state.foundation.countCards();
        if (nrofCards === 52) {
            state.game.isEnded = true;
            state.game.end = Date.now();
        }
    }

    blink = (index, state) => this._blink((s) => s.foundation.stacks[index], state);
}
