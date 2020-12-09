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

    getHandlers(stateholder, state) {
        return {
            ...new Game(this.getInitialState).getHandlers(stateholder, state),
            ...new Settings(this.suggestor).getHandlers(stateholder, state),
            clickTableau: new Tableau(stateholder, this.suggestor).getHandler(state.hand),
            clickFoundation: new Foundation(stateholder, this.suggestor).getHandler(state.hand),
            clickStock: new Stock(stateholder, this.suggestor).getHandler(state.hand),
            clickWaste: new Waste(stateholder, this.suggestor).getHandler(state.hand),
        };
    }
}
