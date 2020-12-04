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
        this.deck.shuffle();
    }

    getHandlers() {
        if (this.stateholder.state && this.stateholder.state.hand && this.stateholder.state.hand.isHoldingCard())
            return {
                clickTableauStack: new TableauStack(this.stateholder).dispatchPutDown,
                clickFoundation: new Foundation(this.stateholder).dispatchPutDown,
                clickStock: new Stock(this.stateholder).dispatchPutDown,
                clickWaste: new Waste(this.stateholder).dispatchPutDown,
            };
        else
            return {
                clickTableauStack: new TableauStack(this.stateholder).dispatchPickup,
                clickFoundation: new Foundation(this.stateholder).dispatchPickup,
                clickStock: new Stock(this.stateholder).dispatchPickup,
                clickWaste: new Waste(this.stateholder).dispatchPickup,
            };
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
