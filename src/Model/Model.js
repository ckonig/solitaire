import Deck from "./Deck/Deck";
import Foundation from "./Game/Foundation";
import Game from "./Game/Game";
import Hand from "./Game/Hand";
import Settings from "./Game/Settings";
import Stock from "./Game/Stock";
import Tableau from "./Game/Tableau";
import Waste from "./Game/Waste";

export default class Model {
    static getInitialState = (launchSettings) => {
        const deck = new Deck().shuffle();
        const settings = new Settings(launchSettings);
        const state = {
            stock: new Stock([...deck.cards], settings),
            waste: new Waste(settings),
            foundation: new Foundation(settings),
            tableau: new Tableau(settings),
            hand: new Hand(),
            game: new Game(settings),
            settings: settings,
        };
        return state;
    };

    static copy = (state) => {
        return {
            stock: Stock.copy(state.stock),
            waste: Waste.copy(state.waste),
            foundation: Foundation.copy(state.foundation),
            tableau: Tableau.copy(state.tableau),
            hand: Hand.copy(state.hand),
            game: Game.copy(state.game),
            settings: Settings.copy(state.settings),
        };
    };
}
