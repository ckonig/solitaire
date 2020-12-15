import Dealer from "./Dealer";
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
       // this.deck.shuffle();
    }

    restart = () => {
        this.deck = new Deck();
       // this.deck.shuffle();
        return Model.getInitialState(this.deck);
    };

    getInitialState = () => Model.getInitialState(this.deck);

    getDealer = (gamestate, state) => new Dealer(gamestate, state);

    getHandlers(gamestate, state) {
        return {
            ...new Game(this.getInitialState, this.suggestor).getHandlers(gamestate, state),
            ...new Settings(this.suggestor).getHandlers(gamestate, state),
            clickTableau: new Tableau(gamestate).getHandler(state.hand),
            clickFoundation: new Foundation(gamestate).getHandler(state.hand),
            clickStock: new Stock(gamestate).getHandler(state.hand),
            clickWaste: new Waste(gamestate).getHandler(state.hand),
            restart: () => gamestate.setState(() => this.restart()),
        };
    }
}
