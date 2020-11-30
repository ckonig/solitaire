import Foundation from "./Foundation";
import Stock from "./Stock";
import TableauStack from "./TableauStack";
import Waste from "./Waste";

export default class Interaction {
    constructor(stateholder) {
        this.foundation = new Foundation(stateholder);
        this.stock = new Stock(stateholder);
        this.tableauStack = new TableauStack(stateholder);
        this.waste = new Waste(stateholder);
    }
}