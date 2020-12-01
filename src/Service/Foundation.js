import Base from "./Base";
import CardTools from "../Model/Deck/CardTools";

//@todo introduce foundation model to clean up class

export default class Foundation extends Base {
    pickup(index) {
        var stack = this.stateHolder.state.foundation.stacks[index].stack;
        if (stack[stack.length - 1]) {
            var pseudoCard = { props: stack[stack.length - 1] };
            this.stateHolder.setState((state) => {
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
        if (this.stateHolder.state.foundation.accepts(index, this.hand().currentCard())) {
            this.stateHolder.setState((state) => {
                if (this.hand().isHoldingCard() && !state.foundation.contains(index, this.hand().currentCard())) {
                    state.foundation.stacks[index].stack.push(this.hand().currentCard().props);
                    state.foundation.stacks[index].usedCards.push(state.foundation.stacks[index].acceptedCards.pop());
                    state.hand.putDown();
                    this.actions.endMove('foundation', state)
                }
                return { ...state };
            });
        } else {
            this.blink(index);
        }
    }

    blink = (index) => this._blink(s => s.foundation.stacks[index])
}