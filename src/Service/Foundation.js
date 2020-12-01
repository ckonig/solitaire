import Base from "./Base";

export default class Foundation extends Base {
    click = (index) => {
        if (this.hand().isHoldingCard()) {
            this.tryPutDown(index);
        } else {
            this.pickup(index);
        }
    }

    pickup(index) {
        var stack = this.state().foundation.stacks[index].stack;
        if (stack[stack.length - 1]) {
            var pseudoCard = { props: stack[stack.length - 1] };
            this._setState((state) => {
                var previous = [...state.foundation.stacks[index].usedCards].pop();
                if (previous && previous == pseudoCard.props.face) {
                    state.foundation.filterOut(pseudoCard)
                    state.foundation.stacks[index].acceptedCards.push(state.foundation.stacks[index].usedCards.pop());
                    state.hand.pickUp([pseudoCard], pseudoCard.props.source);
                    this.actions.startMove('foundation', pseudoCard, state)
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
                    state.foundation.stacks[index].stack.push(state.hand.currentCard().props);
                    state.foundation.stacks[index].usedCards.push(state.foundation.stacks[index].acceptedCards.pop());
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