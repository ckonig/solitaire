import Deck from "../Model/Deck/Deck";
import Foundation from "./Foundation";
import Model from "../Model/Facade";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

export default class Facade {
    constructor(stateholder) {
        this.stateholder = stateholder;
        this.deck = new Deck();
        this.deck.shuffle();
        this.services = {
            tableau: new Tableau(stateholder),
            foundation: new Foundation(stateholder),
            stock: new Stock(stateholder),
            waste: new Waste(stateholder),
        };
    }

    getInitialState = () => Model.getInitialState(this.deck);

    getHandlers() {
        let handler = "dispatchPickup";
        if (this.stateholder.state && this.stateholder.state.hand && this.stateholder.state.hand.isHoldingCard()) {
            handler = "dispatchPutDown";
        }
        return {
            clickTableau: this.services.tableau[handler],
            clickFoundation: this.services.foundation[handler],
            clickStock: this.services.stock[handler],
            clickWaste: this.services.waste[handler],
        };
    }

    reset = () => {
        this.stateholder.setState(() => ({ ...this.getInitialState() }));
    };
}
