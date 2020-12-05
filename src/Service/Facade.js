import Deck from "../Model/Deck/Deck";
import Foundation from "./Foundation";
import Model from "../Model/Facade";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

export default class Facade {
    constructor() {
        this.deck = new Deck();
        //this.deck.shuffle();
    }

    getInitialState = () => Model.getInitialState(this.deck);

    getHandlers(stateholder, state) {
        let handler = "dispatchPickup";
        if (state && state.hand && state.hand.isHoldingCard()) {
            handler = "dispatchPutDown";
        }

        return {
            clickTableau: new Tableau(stateholder)[handler],
            clickFoundation: new Foundation(stateholder)[handler],
            clickStock: new Stock(stateholder)[handler],
            clickWaste: new Waste(stateholder)[handler],
            undo: () => this.undo(state.game.previousStates.length - 1, stateholder, state),
            reset: () => this.reset(stateholder),
            undoLabel: () => Math.pow(2, stateholder.state.game.multiplicator),
        };
    }

    reset = (stateholder) => {
        stateholder.setState(() => ({ ...this.getInitialState() }));
    };

    undo = (id, stateholder, currentState) => {
        stateholder.setState((state) => {
            const previous = state.game.popPreviousState(id, currentState);
            if (previous) {
                return previous;
            }

            return null;
        });
    };
}
