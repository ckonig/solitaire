import { BlinkFunction, ClickHandler } from "../Common";

import BusinessModel from "./BusinessModel";
import Card from "../Model/Deck/Card";
import { IBlinker } from "./Blinker";

export default class Tableau implements ClickHandler {
    blink: BlinkFunction;

    constructor(blinker: IBlinker) {
        this.blink = (state, index) => blinker.startBlink((s: BusinessModel) => s.tableau.stacks[index], state);
    }

    dispatchPutDown = (card: Card, position: any, state: BusinessModel, index: number) => {
        if (state.tableau.wouldAccept(index, state.hand)) {
            const src = state.hand.source;
            state.tableau.add(index, state.hand.putDown()) && state.game.registerMove("tableau-" + index, src);
        } else {
            this.blink(state, index);
        }
    };

    dispatchPickup = (card: Card, position: any, state: BusinessModel, index: number) => {
        if (card && !this.tryUncover(card, index, state) && !card.isHidden) {
            state.hand.pickUp(state.tableau.popWithFollowing(card, index), card.source, position) && state.game.registerPickup();
        } else if (!card) {
            this.blink(state, index);
        }
    };

    tryUncover = (card: Card, index: number, state: BusinessModel) =>
        !state.hand.isHoldingCard() && card.isHidden && state.tableau.uncover(index, card) && state.game.registerUncover();
}
