import Service from "./BaseService";

export default class Waste extends Service {
    _dispatchPutDown = (card, state) =>
        (state.hand.source == "waste" &&
            state.waste.tryPutDown(state.hand.currentCard()) &&
            state.hand.putDown() &&
            state.game.registerMove("waste", "waste")) ||
        this.blink(card, state);

    _dispatchPickup = (card, state) =>
        (card && state.hand.pickUp([state.waste.popTop(card)], "waste") && state.game.registerPickup()) || this.blink(card, state);

    blink = (card, state) => this._blink((s) => s.waste, state);
}
