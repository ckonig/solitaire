import Service from "./BaseService";

export default class Waste extends Service {
    _dispatchPutDown = (card, state) => {
        if (state.hand.source == "waste") {
            state.waste.tryPutDown(state.hand.currentCard()) &&
                state.game.registerMove("waste", state.hand.currentCard()) &&
                state.hand.putDown();
        } else {
            this.blink(card, state);
        }
    };

    _dispatchPickup = (card, state) => {
        if (card) {
            state.hand.pickUp([state.waste.popTop(card)], "waste");
        } else {
            this.blink(card, state);
        }
    };

    blink = (card, state) => this._blink((s) => s.waste, state);
}
