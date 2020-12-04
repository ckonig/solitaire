import Service from "./BaseService";

export default class Foundation extends Service {
    click = (index) => (this.hand().isHoldingCard() ? this.tryPutDown(index) : this.pickup(index));

    pickup(index) {
        const card = this.state().foundation.getTop(index);
        if (card) {
            this._setState((state) => {
                if (state.foundation.getPreviousUsed(index) === card.face) {
                    state.foundation.remove(index, card);
                    state.hand.pickUp([card], card.source);
                }
            });
        } else {
            this.blink(index);
        }
    }

    tryPutDown(index) {
        if (!this.hand().hasMoreThanOneCard() && this.state().foundation.accepts(index, this.hand().currentCard())) {
            this._setState((state) => {
                if (state.hand.isHoldingCard() && !state.foundation.contains(index, state.hand.currentCard())) {
                    state.game.registerMove("foundation-"+index, state.hand.currentCard());
                    state.foundation.add(index, state.hand.currentCard());
                    state.hand.putDown();
                    this.tryDetectEnd(state);
                }
            });
        } else {
            this.blink(index);
        }
    }

    tryDetectEnd(state) {
        const nrofCards = state.foundation.stacks.map((f) => parseInt(f.stack.length)).reduce((a, b) => a + b, 0);
        if (nrofCards === 52) {
            state.isEnded = true;
            state.end = Date.now();
        }
    }

    blink = (index) => this._blink((s) => s.foundation.stacks[index]);
}
