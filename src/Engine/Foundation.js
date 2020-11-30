import Base from "./Base";
import CardTools from "../Deck/CardTools";

//@todo introduce foundation model to clean up class

export default class Foundation extends Base {
    pickup(index) {
        var stack = this.stateHolder.state.foundations[index].stack;
        if (stack[stack.length - 1]) {
            var pseudoCard = { props: stack[stack.length - 1] };
            this.stateHolder.setState((state) => {
                var previous = [...state.foundations[index].usedCards].pop();
                if (previous && previous == pseudoCard.props.face) {
                    state.foundations = CardTools.filterOut(state.foundations, pseudoCard)
                    state.foundations[index].acceptedCards.push(state.foundations[index].usedCards.pop());
                    state.hand.pickUp([pseudoCard], pseudoCard.props.source);
                }
                return { ...state };
            });
        }
    }

    tryPutDown(index) {
        var currentFoundation = this.state().foundations[index].acceptedCards;
        var currentAccepted = currentFoundation[currentFoundation.length - 1];
        if (this.state().foundations[index].icon == this.hand().currentCard().props.type.icon && currentAccepted == this.hand().currentCard().props.face) {
            this.stateHolder.setState((state) => {
                if (this.hand().isHoldingCard() && state.foundations[index].stack.indexOf(this.hand().currentCard()) == -1) {
                    state.foundations[index].stack.push(this.hand().currentCard().props);
                    var popped = state.foundations[index].acceptedCards.pop();
                    if (popped) {
                        state.foundations[index].usedCards.push(popped);
                        state.hand.putDown();
                        return { ...state };
                    }
                }
                return { ...state };
            });
        } else {
            this._blink(index);
        }
    }

    //@todo move to model and/or component
    _blink = (index) => this._toggleBlink(index, 10, () => setTimeout(() => this._toggleBlink(index, 0), 100))

    _toggleBlink = (index, blinkFor, cb) => {
        this.stateHolder.setState((state) => {
            state.foundations[index].blinkFor = blinkFor;
            return { ...state };
        }, cb);
    }
}