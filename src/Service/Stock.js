import Base from "./Base";
import CardTools from "../Model/Deck/CardTools";

export default class Stock extends Base {
    click = (card) => {
        if (!this.hand().isHoldingCard()) {
            if (card) {
                this.moveToWaste(card);
            } else {
                this.recycleWaste();
            }
        } else {
            this.blink();
        }
    }
    
    moveToWaste(card) {
        this._setState((state, props) => {
            if (CardTools.cardEquals(card.props, state.stock.stack[state.stock.stack.length - 1])) {
                state.waste.stack.push(state.stock.stack.pop());
                this.actions.startMove('stock', card, state);
                this.actions.endMove('stock', state);
            }
            return { ...state };
        });
    }

    recycleWaste() {
        this._setState((state, props) => {
            state.stock.recycle(state.waste.recycle()) && this.actions.registerRecycle(state)
            return { ...state };
        });
    }

    blink = () => this._blink(s => s.stock)
}