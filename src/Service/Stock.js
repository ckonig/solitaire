import CardTools from "../Model/Deck/CardTools";
import Service from "./BaseService";

export default class Stock extends Service {
    click = (card) => {
        if (this.hand().isHoldingCard()) {
            this.blink();
        } else if (card) { //@todo card doesn't matter, we can use stock model to pick  top card (shadow bug)
            this.moveToWaste(card);
        } else {
            this.recycleWaste();
        }
    }

    moveToWaste(card) {
        this._setState((state) => {
            if (CardTools.cardEquals(card, state.stock.getTop())) {
                state.waste.stack.push(state.stock.stack.pop());
                this.actions.registerMove('stock', state, {...card, source: 'waste'});
            }
        })
    }

    recycleWaste() {
        this._setState((state) => {
            state.stock.recycle(state.waste.recycle())
                && this.actions.registerRecycle(state)
        });
    }

    blink = () => this._blink(s => s.stock)
}