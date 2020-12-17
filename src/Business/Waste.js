export default class Waste {
    constructor(blinker) {
        this.blink = (state) => blinker.startBlink((s) => s.waste, state);
    }

    dispatchPutDown = (card, position, state) =>
        (state.waste.wouldAccept(state.hand) &&
            state.waste.tryPutDown(state.hand.currentCard()) &&
            state.hand.putDown() &&
            state.game.registerMove("waste", "waste")) ||
        this.blink(state);

    dispatchPickup = (card, position, state) =>
        (card && state.hand.pickUp([state.waste.popTop(card)], "waste", position) && state.game.registerPickup()) || this.blink(state);
}
