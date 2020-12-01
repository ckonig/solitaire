import Base from "./Base";
import CardTools from "../Model/Deck/CardTools";

export default class Stock extends Base {

    moveToWaste(card) {
        this.stateHolder.setState((state, props) => {
            if (CardTools.cardEquals(card.props, state.stockPile[state.stockPile.length - 1])) {
                state.waste.push(state.stockPile.pop());
            }
            return { ...state };
        }, () => this.actions.startMove('stock', card, () => this.actions.endMove('waste')));
    }

    recycleWaste() {
        this.stateHolder.setState((state, props) => {
            state.stockPile = [...state.waste].reverse().map(element => {
                return { ...element, hidden: true }
            })
            state.waste = [];
            return { ...state };
        }, () => this.actions.registerRecycle());
    }

    blink() {
        //@todo implement
    }


}