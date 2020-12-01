import Service from "./BaseService";

export default class Foundation extends Service {

    click = (index) => this.hand().isHoldingCard()
        ? this.tryPutDown(index)
        : this.pickup(index)

    pickup(index) {
        var top = this.state().foundation.getTop(index)
        if (top) {
            var card = { props: top };
            this._setState((state) => {
                if (state.foundation.getPreviousUsed(index) == card.props.face) {
                    state.foundation.add(index, card)
                    state.hand.pickUp([card], card.props.source);
                    this.actions.startMove('foundation', card, state)
                }
                return { ...state };
            });
        } else {
            this.blink(index);
        }
    }

    tryPutDown(index) {
        if (!this.hand().hasMoreThanOneCard() && this.state().foundation.accepts(index, this.hand().currentCard())) {
            this._setState((state) => {
                if (state.hand.isHoldingCard() && !state.foundation.contains(index, state.hand.currentCard())) {
                    state.foundation.remove(index, state.hand.currentCard().props)
                    state.hand.putDown();
                    this.actions.endMove('foundation', state)
                    this._tryDetectEnd(state)
                }
                return { ...state };
            });
        } else {
            this.blink(index);
        }
    }

    _tryDetectEnd(state) {
        var reduced = state.foundation.stacks.map(f => parseInt(f.stack.length)).reduce((a, b) => a + b, 0);
        if (reduced == 52) {
            state.isEnded = true;
            state.end = Date.now();
        }
    }

    blink = (index) => this._blink(s => s.foundation.stacks[index])
}