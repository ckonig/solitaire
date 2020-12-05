import Service from "./BaseService";

export default class Stock extends Service {
    _dispatchPutDown = (card, state) => this.blink(card, state);

    _dispatchPickup = (card, state) => (card ? this.moveToWaste(card, state) : this.recycleWaste(card, state));

    moveToWaste = (card, state) =>
        state.stock.isOnTop(card) && state.waste.add(state.stock.stack.pop()) && state.game.registerMove("waste", "stock");

    recycleWaste = (_card, state) =>
        !state.stock.getTop() && !!state.waste.getTop() && state.stock.recycle(state.waste.recycle()) && state.game.registerRecycle(state);

    blink = (_card, state) => this._blink((s) => s.stock, state);
}
