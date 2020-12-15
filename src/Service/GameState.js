import Model from "../Model/Facade";
import Suggestions from "./Suggestions";

export default class GameState {
    constructor(stateholder) {
        this.stateholder = stateholder;
        this.suggestor = new Suggestions();
    }

    //@todo deprecate uncontrolled usage here
    setState = (a, b) => this.stateholder.setState(a, b);

    _setState = (a, b) =>
        this.stateholder.setState((state) => {
            state.game.modified = false;
            const previous = Model.copy(state);
            a(state);
            if (state.game.modified && state.deck.isDealt) {
                //@todo  use localstorage for previous state, reduce react state for performance
                state.game.pushPreviousState(previous);
                this.suggestor.evaluateOptions(state);
                return { ...state };
            }

            return null;
        }, b);
}
