import GameModel from "../Model/Game/Game";
import Hand from "../Model/Game/Hand";
import Service from "./BaseService";
import Stock from "../Model/Game/Stock";
import Waste from "../Model/Game/Waste";
import generateDeck from "../Model/Deck/DeckGenerator";
import generateFoundations from "../Model/Game/FoundationGenerator";
import generateTableau from "../Model/Game/TableauGenerator";

export default class Game extends Service {
    constructor(stateholder) {
        super(stateholder);
        this.deck = generateDeck();
        this.deck.shuffle();
    }

    getInitialState = () => {
        return {
            stock: new Stock(this.deck.cards.slice(28)),
            waste: new Waste(),
            foundation: generateFoundations(),
            tableau: generateTableau(this.deck.cards.slice(0, 28)),
            hand: new Hand(),
            game: new GameModel(),
        };
    };

    reset = () => {
        this._setState(() => ({ ...this.getInitialState() }));
    };
}
