import Deck from "../Model/Deck/Deck";
import Foundation from "./Foundation";
import Game from "./Game";
import Model from "../Model/Facade"
import Settings from "./Settings";
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
        return {
            ...new Game(this.getInitialState).getHandlers(stateholder, state),
            ...new Settings().getHandlers(stateholder, state),
            clickTableau: new Tableau(stateholder, state.hand).getHandler(state.hand),
            clickFoundation: new Foundation(stateholder).getHandler(state.hand),
            clickStock: new Stock(stateholder).getHandler(state.hand),
            clickWaste: new Waste(stateholder).getHandler(state.hand),
        };
    }
}
