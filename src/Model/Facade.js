import Foundation from "./Game/Foundation";
import Game from "./Game/Game";
import Hand from "./Game/Hand";
import Settings from "./Game/Settings";
import Stock from "./Game/Stock";
import Tableau from "./Game/Tableau";
import Waste from "./Game/Waste";

export default class Facade {
    static getInitialState = (deck) => {
        const settings = new Settings();
        const state = {
            deck: deck,
            stock: new Stock([...deck.cards], settings),
            waste: new Waste(settings),
            foundation: new Foundation(settings),
            tableau: new Tableau([], settings),
            hand: new Hand(),
            game: new Game(),
            settings: settings,
            isDealt: false,
            dealt: 0,
        };
        return state;
    };

    static deal = (state) => {
        state.isDealt = state.deck.deal(state.stock, state.tableau);
        state.dealt++;
        if (state.isDealt) {
            state.game.started = Date.now();
        }
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

    static setEntropy = (state, lvl) => {
        return {
            stock: state.stock.setEntropy(lvl),
            waste: state.waste.setEntropy(lvl),
            foundation: state.foundation.setEntropy(lvl),
            tableau: state.tableau.setEntropy(lvl),
            hand: state.hand,
            game: state.game,
            settings: state.settings,
        };
    };
}
