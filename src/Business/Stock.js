export default class Stock {
    constructor(blinker) {
        this.blink = (_card, state) => blinker.startBlink((s) => s.stock, state);
    }

    dispatchPutDown = (card, position, state) => this.blink(card, state);

    dispatchPickup = (card, position, state) => (card != null ? this.moveToWaste(card, state) : this.recycleWaste(card, state));

    moveToWaste = (card, state) =>
        state.stock.isOnTop(card) &&
        state.waste.addAll(state.stock.popTop()) &&
        state.game.registerMove("waste", "stock") &&
        state.game.registerWasteMove(state.stock.stack.length == 0);

    recycleWaste = (_card, state) =>
        !state.stock.getTop() &&
        !!state.waste.getTop() &&
        state.game.canRecycle() &&
        state.stock.recycle(state.waste.recycle()) &&
        state.game.registerRecycle(state);
}
