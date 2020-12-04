import Foundation from "./Foundation";
import GameModel from "../Model/Game/Game";
import HandModel from "../Model/Game/Hand";
import Stock from "./Stock";
import StockModel from "../Model/Game/Stock";
import TableauStack from "./TableauStack";
import Waste from "./Waste";
import WasteModel from "../Model/Game/Waste";
import generateDeck from "../Model/Deck/DeckGenerator";
import generateFoundations from "../Model/Game/FoundationGenerator";
import generateTableau from "../Model/Game/TableauGenerator";

export default class Game {
    constructor(stateholder) {
        this.stateholder = stateholder;
        this.deck = generateDeck();
        //this.deck.shuffle();
        this.clickTableauStack = new TableauStack(stateholder).click;
        this.clickFoundation = new Foundation(stateholder).click;
        this.clickStock = new Stock(stateholder).click;
        this.clickWaste = new Waste(stateholder).click;
    }

    getInitialState = () => ({
        stock: new StockModel([...this.deck.cards.slice(28)]),
        waste: new WasteModel(),
        foundation: generateFoundations(),
        tableau: generateTableau([...this.deck.cards.slice(0, 28)]),
        hand: new HandModel(),
        game: new GameModel(),
    });

    reset = () => {
        this.stateholder.setState(() => ({ ...this.getInitialState() }));
    };
}
