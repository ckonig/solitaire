import Service from "./BaseService";

export default class Stock extends Service {
    _dispatchPutDown = (card, position, state) => this.blink(card, state);

    _dispatchPickup = (card, position, state) => (card != null ? this.moveToWaste(card, state) : this.recycleWaste(card, state));

    //@todo check if recycling heart got broken (when stock remains empty) - maintain passes instead of remaining recyclings
    moveToWaste = (card, state) =>
        state.stock.isOnTop(card) && state.waste.addAll(state.stock.popTop()) && state.game.registerMove("waste", "stock");

    recycleWaste = (_card, state) =>
        !state.stock.getTop() && !!state.waste.getTop() && state.game.canRecycle() && state.stock.recycle(state.waste.recycle()) && state.game.registerRecycle(state);

    blink = (_card, state) => this._blink((s) => s.stock, state);
}
