import Service from "./BaseService";

export default class Waste extends Service {
    _dispatchPutDown = (card, position, state) =>
        (state.waste.wouldAccept(state.hand) &&
            state.waste.tryPutDown(state.hand.currentCard()) &&
            state.hand.putDown() &&
            state.game.registerMove("waste", "waste")) ||
        this.blink(state);

    _dispatchPickup = (card, position, state) =>
        (card && state.hand.pickUp([state.waste.popTop(card)], "waste", position) && state.game.registerPickup()) || this.blink(state);

    blink = (state) => this._blink((s) => s.waste, state);
}
