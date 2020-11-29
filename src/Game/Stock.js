import Base from "./Base";

export default class Stock extends Base {

    clickStockPile = (card) => {
        if (!this.hand.isHoldingCard()) {
            if (card) {
                this._moveToWaste(card);
            } else {
                this._recycleWaste();
            }
        } else {
            //@todo blink stock
        }
    }

    clickWaste = (card) => {
        if (this.hand.isHoldingCard() && !this.hand.isCurrentCard(card)) {
            this._tryPutBackToWaste(card);
        } else if (card && !this.hand.isHoldingCard()) {
            this.pickup(card, (cb) => this._removeFromWaste(cb, card));
        }
    }

    _moveToWaste(card) {
        this.stateHolder.setState((state, props) => {
            if (this.cardEquals(card.props, state.stockPile[state.stockPile.length - 1])) {
                state.waste.push(state.stockPile.pop());
            }
            return { ...state };
        });
    }

    _removeFromWaste = (callback, card) => {
        this.removeFromXStack(callback, (state) => {
            state.waste = this.filterNotEqual(state.waste, card);
            return state;
        }, card);
    }

    _recycleWaste() {
        this.stateHolder.setState((state, props) => {
            state.stockPile = [...state.waste].reverse().map(element => {
                return { ...element, hidden: true }
            })
            state.waste = [];
            return { ...state };
        });
    }

    _tryPutBackToWaste() {
        if (this.state().hand.source == 'play') {
            this.stateHolder.setState((state, props) => {
                var current = this.hand.currentCard();
                var top = this.state().waste[this.state().waste.length - 1];
                if (current && current.props && (!top || top.face !== current.props.face || top.type.icon !== current.props.type.icon)) {
                    state.waste.push(this.hand.currentCard().props);
                }
                return { ...this.unselectCard(state) };
            });
        } else {
            // @todo implement blink validation for waste
        }
    }
}