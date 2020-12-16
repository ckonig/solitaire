import Deck from "../Model/Deck/Deck";
import Foundation from "../Business/Foundation";
import Game from "./Game";
import GameState from "../Business/GameState";
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
        const gamestate = new GameState(stateholder);
        return {
            ...new Game(this.getInitialState, this.suggestor).getHandlers(stateholder, state),
            ...new Settings(this.suggestor).getHandlers(stateholder, state),
            clickTableau: new Tableau(gamestate).getHandler(state.hand),
            clickFoundation: new Foundation(gamestate).getHandler(state.hand),
            clickStock: new Stock(gamestate).getHandler(state.hand),
            clickWaste: new Waste(gamestate).getHandler(state.hand),
        };
    }
}
