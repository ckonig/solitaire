import { BlinkFunction, ClickHandler } from "../Common";

import Blinker from "./Blinker";
import BusinessModel from "./BusinessModel";
import Card from "../Model/Deck/Card";

export default class Foundation implements ClickHandler {
    blink: BlinkFunction;

    constructor(blinker: Blinker) {
        this.blink = (state, index) => blinker.startBlink((s: BusinessModel) => s.foundation.stacks[index], state);
    }

    dispatchPutDown = (card: Card, position: any, state: BusinessModel, index: number) => {
        if (state.foundation.wouldAccept(index, state.hand)) {
            const src = state.hand.source;
            state.foundation.add(index, state.hand.putDown()) && state.game.registerMove("foundation-" + index, src);
            this.tryDetectEnd(state);
        } else {
            this.blink(state, index);
        }
    };

    dispatchPickup = (_card: Card, position: any, state: BusinessModel, index: number) => {
        const card = state.foundation.getTop(index);
        if (card && state.foundation.getPreviousUsed(index) === card.face) {
            state.hand.pickUp([state.foundation.remove(index, card)], card.source, position) && state.game.registerPickup();
        } else {
            this.blink(state, index);
        }
    };

    //@todo move this to a generic place, also detect failure
    tryDetectEnd(state: BusinessModel) {
        const nrofCards = state.foundation.countCards();
        if (nrofCards === 52) {
            state.game.isEnded = true;
            state.game.end = Date.now();
        }
    }
}
