import Service from "./BaseService";

export default class Stock extends Service {
    _dispatchPutDown = (card, position, state) => this.blink(card, state);

    _dispatchPickup = (card, position, state) => (card != null ? this.moveToWaste(card, state) : this.recycleWaste(card, state));

    moveToWaste = (card, state) =>
        state.stock.isOnTop(card) && state.waste.addAll(state.stock.popTop()) && state.game.registerMove("waste", "stock");

    //@todo if recycling three times, and no suggestions are found, abort game.
    //@todo allow limiting the max number of recyclings
    recycleWaste = (_card, state) =>
        !state.stock.getTop() && !!state.waste.getTop() && state.stock.recycle(state.waste.recycle()) && state.game.registerRecycle(state);

    blink = (_card, state) => this._blink((s) => s.stock, state);
}
