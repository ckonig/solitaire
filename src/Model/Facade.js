import Foundation from "./Game/Foundation";
import Game from "./Game/Game";
import Hand from "./Game/Hand";
import Stock from "./Game/Stock";
import Tableau from "./Game/Tableau";
import Waste from "./Game/Waste";

export default class Facade {
    static getInitialState = (deck) => {
        const state = {
            stock: new Stock([...deck.cards.slice(28)]),
            waste: new Waste(),
            foundation: new Foundation(),
            tableau: new Tableau([...deck.cards.slice(0, 28)]),
            hand: new Hand(),
            game: new Game(),
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
        };
    };
}
