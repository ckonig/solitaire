import Base from "./Base";

export default class Foundation extends Base {
    click = (index) => {
        if (this.hand.isHoldingCard()) {
            this._tryPutOntoStack(index);
        } else {
            this._tryPickup(index);
        }
    }

    _tryPickup(index) {
        var _stack = this.stateHolder.state.foundations[index].stack;
        if (_stack[_stack.length - 1]) {
            var pseudoCard = { props: _stack[_stack.length - 1] }
            this.pickup(pseudoCard,
                (cb) => this._removeFromFoundations(cb, pseudoCard),
                () => {
                    this.stateHolder.setState((state, props) => {
                        var used = [...state.foundations[index].usedCards];
                        var previous = used.pop();
                        if (previous && previous == this.hand.currentCard().props.face) {
                            state.foundations[index].acceptedCards.push(state.foundations[index].usedCards.pop());
                        }
                        return { ...state };
                    }, () => this.actions.startMove('foundation', pseudoCard.props));
                });
        }
    }

    _removeFromFoundations = (callback, card) => {
        this.removeFromXStack(callback, (state) => {
            state.foundations = this.filterOut(state.foundations, card)
            return state;
        }, card);
    }

    _tryPutOntoStack(index) {
        var currentFoundation = this.state().foundations[index].acceptedCards;
        var currentAccepted = currentFoundation[currentFoundation.length - 1];
        if (this.state().foundations[index].icon == this.hand.currentCard().props.type.icon && currentAccepted == this.hand.currentCard().props.face) {
            this.stateHolder.setState((state, props) => {
                if (this.hand.isHoldingCard() && state.foundations[index].stack.indexOf(this.hand.currentCard()) == -1) {
                    state.foundations[index].stack.push(this.hand.currentCard().props);
                    var popped = state.foundations[index].acceptedCards.pop();
                    if (popped)
                        state.foundations[index].usedCards.push(popped);
                    return { ...this.unselectCard(state) };
                } else {
                    return { ...state };
                }
            }, () => this.actions.endMove('foundation'));
        } else {
            this._blink(index);
        }
    }

    _blink = (index) => {
        this._toggleBlink(index, 10, () => {
            setTimeout(() => this._toggleBlink(index, 0), 100);
        })
    }

    _toggleBlink = (index, blinkFor, cb) => {
        this.stateHolder.setState((state, props) => {
            state.foundations[index].blinkFor = blinkFor;
            return { ...state };
        }, cb);
    }
}