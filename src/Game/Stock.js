import Base from "./Base";

export default class Stock extends Base {
    clickStockPile = (card) => {
        if (card) {
            //move from stockPile to waste
            this.stateHolder.setState((state, props) => {
                if (this.cardEquals(card.props, state.stockPile[state.stockPile.length - 1])) {
                    state.waste.push(state.stockPile.pop());
                }
                return { ...state };
            });
        } else {
            //recycle waste to stockPile
            this.stateHolder.setState((state, props) => {
                state.stockPile = [...state.waste].reverse().map(element => {
                    return { ...element, hidden: true }
                })
                state.waste = [];
                return { ...state };
            });
        }
    }

    clickWaste = (card) => {
        if (this.hand.isHoldingCard() && !this.hand.isCurrentCard(card)) {
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
        } else if (card && !this.hand.isHoldingCard()) {
            this.pickup(card);
        }
    }
}