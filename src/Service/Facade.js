import Dealer from "./Dealer";
import Deck from "../Model/Deck/Deck";
import Foundation from "../Business/Foundation";
import Game from "./Game";
import Model from "../Model/Facade";
import Settings from "./Settings";
import Stock from "../Business/Stock";
import Suggestions from "./Suggestions";
import Tableau from "../Business/Tableau";
import Waste from "../Business/Waste";

export default class Facade {
    constructor(launchSettings) {
        this.suggestor = new Suggestions();
        this.deck = new Deck();
        this.deck.shuffle();
        this.launchSettings = launchSettings;
    }

    getInitialState = () => Model.getInitialState(this.deck, this.launchSettings);

    getHandlers(stateholder) {
        const state = stateholder.state;
        return {
            ...new Game(this.getInitialState, this.suggestor).getHandlers(stateholder, state),
            ...new Settings(this.suggestor).getHandlers(stateholder, state),
            deal: () => new Dealer(stateholder, state).deal(state.stock.dealt),
            clickTableau: new Tableau(stateholder).getHandler(state.hand),
            clickFoundation: new Foundation(stateholder).getHandler(state.hand),
            clickStock: new Stock(stateholder).getHandler(state.hand),
            clickWaste: new Waste(stateholder).getHandler(state.hand),
        };
    }
}
