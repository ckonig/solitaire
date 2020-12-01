import CardTools from "../Model/Deck/CardTools";
import Service from "./BaseService";

export default class Stock extends Service {
    click = (card) => {
        if (this.hand().isHoldingCard()) {
            this.blink();
        } else if (card) {
            this.moveToWaste(card);
        } else {
            this.recycleWaste();
        }
    }

    moveToWaste(card) {
        this._setState((state) => {
            if (CardTools.cardEquals(card.props, state.stock.getTop())) {
                state.waste.stack.push(state.stock.stack.pop());
                this.actions.startMove('stock', card, state);
                this.actions.endMove('stock', state);
            }
            return { ...state };
        })
    }

    recycleWaste() {
        this._setState((state) => {
            state.stock.recycle(state.waste.recycle())
                && this.actions.registerRecycle(state)
            return { ...state };
        });
    }

    blink = () => this._blink(s => s.stock)
}