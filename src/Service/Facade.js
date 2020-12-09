import Deck from "../Model/Deck/Deck";
import Foundation from "./Foundation";
import Game from "./Game";
import Model from "../Model/Facade";
import Settings from "./Settings";
import Stock from "./Stock";
import Suggestions from "./Suggestions";
import Tableau from "./Tableau";
import Waste from "./Waste";

export default class Facade {
    constructor() {
        this.suggestor = new Suggestions();
        this.deck = new Deck();
        this.deck.shuffle();
    }

    getInitialState = () => {
        const model = Model.getInitialState(this.deck);
        this.suggestor.evaluateOptions(model);
        return model;
    };

    getHandlers(gamestate, state) {
        return {
            ...new Game(this.getInitialState, this.suggestor).getHandlers(gamestate, state),
            ...new Settings(this.suggestor).getHandlers(gamestate, state),
            clickTableau: new Tableau(gamestate, this.suggestor).getHandler(state.hand),
            clickFoundation: new Foundation(gamestate, this.suggestor).getHandler(state.hand),
            clickStock: new Stock(gamestate, this.suggestor).getHandler(state.hand),
            clickWaste: new Waste(gamestate, this.suggestor).getHandler(state.hand),
        };
    }
}
