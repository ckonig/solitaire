import Service from "./BaseService";

export default class Stock extends Service {
    dispatchPutDown = () => {
        this.blink();
    };

    dispatchPickup = (card) => {
        if (card) {
            this.moveToWaste(card);
        } else {
            this.recycleWaste();
        }
    };

    moveToWaste(card) {
        this._setState((state) => {
            state.stock.isOnTop(card) && state.waste.add(state.stock.stack.pop()) && state.game.registerMove("stock", state.waste.getTop());
        });
    }

    recycleWaste() {
        this._setState((state) => {
            !state.stock.getTop() &&
                !!state.waste.getTop() &&
                state.stock.recycle(state.waste.recycle()) &&
                state.game.registerRecycle(state);
        });
    }

    blink = () => this._blink((s) => s.stock);
}
