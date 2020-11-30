import Base from "./Base";
import CardTools from "./Deck/CardTools";

export default class Stock extends Base {

    clickStockPile = (card) => {
        if (!this.hand().isHoldingCard()) {
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
        if (this.hand().isHoldingCard() && !this.hand().isCurrentCard(card)) {
            this._tryPutBackToWaste(card);
        } else if (card && !this.hand().isHoldingCard()) {
            this.stateHolder.setState((state) => {
                if (!state.hand.isHoldingCard()) {
                    state.hand.pickUp([card], card.props.source);
                    state.waste = CardTools.filterNotEqual(state.waste, card);
                }
                return { ...state };
            }, () => this.actions.startMove('waste', card.props))
        }
    }

    _moveToWaste(card) {
        this.stateHolder.setState((state, props) => {
            if (CardTools.cardEquals(card.props, state.stockPile[state.stockPile.length - 1])) {
                state.waste.push(state.stockPile.pop());
            }
            return { ...state };
        }, () => {
            this.actions.startMove('main', card.props, () => {
                this.actions.endMove('waste');
            });
        });
    }

    _recycleWaste() {
        this.stateHolder.setState((state, props) => {
            state.stockPile = [...state.waste].reverse().map(element => {
                return { ...element, hidden: true }
            })
            state.waste = [];
            return { ...state };
        }, () => {
            this.actions.registerRecycle();
        });
    }

    _tryPutBackToWaste() {
        if (this.state().hand.source == 'waste') {
            this.stateHolder.setState((state, props) => {
                var current = this.hand().currentCard();
                var top = this.state().waste[this.state().waste.length - 1];
                if (current && current.props && (!top || top.face !== current.props.face || top.type.icon !== current.props.type.icon)) {
                    state.waste.push(this.hand().currentCard().props);
                }
                state.hand.putDown();
                return { ...state };
            }, () => {
                this.actions.endMove('waste');
            });
        } else {
            // @todo implement blink validation for waste
        }
    }
}