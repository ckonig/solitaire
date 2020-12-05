import Foundation from "./Game/Foundation";
import Game from "./Game/Game";
import Hand from "./Game/Hand";
import Stock from "./Game/Stock";
import Tableau from "./Game/Tableau";
import Waste from "./Game/Waste";

export default class Facade {
    static getInitialState = (deck) => ({
        stock: new Stock([...deck.cards.slice(28)]),
        waste: new Waste(),
        foundation: new Foundation(),
        tableau: new Tableau([...deck.cards.slice(0, 28)]),
        hand: new Hand(),
        game: new Game(),
    });
}
