import Factory from "../Model/Factory";
import Foundation from "./Foundation";
import Stock from "./Stock";
import TableauStack from "./TableauStack";
import Waste from "./Waste";

export default class Facade {
    constructor(stateholder) {
        this.stateholder = stateholder;
        this.deck = Factory.generateDeck();
        this.deck.shuffle();
        this.services = {
            tableauStack: new TableauStack(stateholder),
            foundation: new Foundation(stateholder),
            stock: new Stock(stateholder),
            waste: new Waste(stateholder),
        };
    }

    getInitialState = () => Factory.getInitialState(this.deck);

    getHandlers() {
        let handler = "dispatchPickup";
        if (this.stateholder.state && this.stateholder.state.hand && this.stateholder.state.hand.isHoldingCard()) {
            handler = "dispatchPutDown";
        }
        return {
            clickTableauStack: this.services.tableauStack[handler],
            clickFoundation: this.services.foundation[handler],
            clickStock: this.services.stock[handler],
            clickWaste: this.services.waste[handler],
        };
    }

    reset = () => {
        this.stateholder.setState(() => ({ ...this.getInitialState() }));
    };
}
