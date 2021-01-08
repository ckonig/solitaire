import { BlinkFunction, ClickHandler } from "../../Common";

import Blinker from "./Blinker";
import Card from "../Deck/Card";
import Model from "../Model";

export default class Foundation implements ClickHandler {
    blink: BlinkFunction = (state, index) => new Blinker().startBlink((s: Model) => s.foundation.stacks[index], state);

    dispatchPutDown = (card: Card, position: any, state: Model, index: number) => {
        if (state.foundation.wouldAcceptHand(index)) {
            const src = state.hand.source;
            state.foundation.putDownHand(index) && state.game.registerMove("foundation-" + index, src);
            this.tryDetectEnd(state);
        } else {
            this.blink(state, index);
        }
    };

    dispatchPickup = (_card: Card | null, position: any, state: Model, index: number) => {
        const card = state.foundation.getTop(index);
        if (card && state.foundation.getPreviousUsed(index) === card.face) {
            state.hand.pickUp([state.foundation.remove(index, card)], card.source, position) && state.game.registerPickup();
        } else {
            this.blink(state, index);
        }
    };

    //@todo move this to a generic place, also detect failure
    tryDetectEnd(state: Model) {
        const nrofCards = state.foundation.countCards();
        if (nrofCards === 52) {
            state.game.isEnded = true;
            state.game.end = Date.now();
        }
    }
}
