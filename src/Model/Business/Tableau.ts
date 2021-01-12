import { BlinkFunction, ClickHandler } from "../../Common";

import Blinker from "./Blinker";
import Card from "../Deck/Card";
import Model from "../Model";

export default class Tableau implements ClickHandler {
    blink: BlinkFunction = (state, index) => new Blinker().startBlink((s: Model) => s.tableau.stacks[index], state);

    dispatchPutDown = (card: Card, position: any, state: Model, index: number) => {
        if (state.tableau.wouldAcceptHand(index)) {
            const src = state.hand.source;
            state.tableau.putDownHand(index) && state.game.registerMove("tableau-" + index, src, state.tableau.getTop(index));
        } else {
            this.blink(state, index);
        }
    };

    dispatchPickup = (card: Card | null, position: any, state: Model, index: number) => {
        if (card) {
            state.hand.pickUp(state.tableau.popWithFollowing(card, index), card.source, position) && state.game.registerPickup();
        } else if (!card) {
            this.blink(state, index);
        }
    };
}

export class TableauHidden extends Tableau {
    dispatchPickup = (card: Card | null, position: any, state: Model, index: number) => {
        if (card) {
            this.tryUncover(card, index, state);
        }
    };

    tryUncover = (card: Card, index: number, state: Model) =>
        !state.hand.isHoldingCard() && card.isHidden && state.tableau.uncover(index, card) && state.game.registerUncover(state.tableau.getTop(index));
}
