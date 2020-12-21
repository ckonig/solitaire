import { BlinkFunction, ClickHandler } from "../Common";

import Blinker from "./Blinker";
import BusinessModel from "./BusinessModel";
import Card from "../Model/Deck/Card";

export default class Tableau implements ClickHandler {
    blink: BlinkFunction = (state, index) => new Blinker().startBlink((s: BusinessModel) => s.tableau.stacks[index], state);

    dispatchPutDown = (card: Card, position: any, state: BusinessModel, index: number) => {
        if (state.tableau.wouldAcceptHand(index)) {
            const src = state.hand.source;
            state.tableau.putDownHand(index) && state.game.registerMove("tableau-" + index, src);
        } else {
            this.blink(state, index);
        }
    };

    dispatchPickup = (card: Card, position: any, state: BusinessModel, index: number) => {
        if (card) {
            state.hand.pickUp(state.tableau.popWithFollowing(card, index), card.source, position) && state.game.registerPickup();
        } else if (!card) {
            this.blink(state, index);
        }
    };
}

export class TableauHidden extends Tableau {
    dispatchPickup = (card: Card, position: any, state: BusinessModel, index: number) => {
        if (card) {
            this.tryUncover(card, index, state);
        }
    };

    tryUncover = (card: Card, index: number, state: BusinessModel) =>
        !state.hand.isHoldingCard() && card.isHidden && state.tableau.uncover(index, card) && state.game.registerUncover();
}
