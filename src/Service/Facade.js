import Deck from "../Model/Deck/Deck";
import Foundation from "./Foundation";
import Model from "../Model/Facade";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

export default class Facade {
    constructor() {
        this.deck = new Deck();
        this.deck.shuffle();
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
            beat: () => this.beat(stateholder),
            setBaseEntropy: (lvl) => this.setBaseEntropy(stateholder, lvl),
            setInteractionEntropy: (lvl) => this.setInteractionEntropy(stateholder, lvl),
            setMouseMode: (mm) => this.setMouseMode(stateholder, mm),
            toggle3d: () => this.toggle3d(stateholder, state.settings.is3D),
            undoLabel: () => Math.pow(2, stateholder.state.game.multiplicator),
        };
    }

    beat = (stateholder) => {
        this.setBaseEntropy(stateholder, 4);
    };

    reset = (stateholder) =>
        stateholder.setState((state) => (state.game.previousStates ? state.game.previousStates[0] : { ...this.getInitialState() }));

    undo = (id, stateholder, currentState) => stateholder.setState((state) => state.game.popPreviousState(id, currentState) || null);

    setBaseEntropy = (stateholder, lvl) => {
        stateholder.setState((state) => {
            state.settings.baseEntropy = lvl;
            stateholder.setState((state) => Model.setEntropy(state, state.settings.baseEntropy));
            return state;
        });
    };

    setInteractionEntropy = (stateholder, lvl) => {
        stateholder.setState((state) => {
            state.settings.interactionEntropy = lvl;
            return state;
        });
    };

    setMouseMode = (stateholder, mm) => {
        stateholder.setState((state) => {
            state.settings.mouseMode = mm;
            return state;
        });
    };

    toggle3d = (stateholder, was3D) => {
        stateholder.setState((state) => {
            console.debug("set 3d mode", state.settings.is3D);
            if (state.settings.is3D == was3D) {
                state.settings.is3D = !state.settings.is3D;
            }
            console.debug("set 3d mode", state.settings.is3D);
            return state;
        });
    };
}
