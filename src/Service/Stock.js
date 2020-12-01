import Base from "./Base";
import CardTools from "../Model/Deck/CardTools";

export default class Stock extends Base {

    moveToWaste(card) {
        this.stateHolder.setState((state, props) => {
            if (CardTools.cardEquals(card.props, state.stock.stack[state.stock.stack.length - 1])) {
                state.waste.stack.push(state.stock.stack.pop());
                this.actions.startMove('stock', card, state);
                this.actions.endMove('stock', state);
            }
            return { ...state };
        });
    }

    recycleWaste() {
        this.stateHolder.setState((state, props) => {
            state.stock.recycle(state.waste.recycle()) && this.actions.registerRecycle(state)
            return { ...state };
        });
    }

    blink = () => this._blink(s => s.stock)
}