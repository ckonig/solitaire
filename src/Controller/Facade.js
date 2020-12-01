import Foundation from "./Foundation";
import Service from "../Service/Facade";
import Stock from "./Stock";
import TableauStack from "./TableauStack";
import Waste from "./Waste";

export default class Facade {
    constructor(stateholder) {
        var service = new Service(stateholder);
        var hand = () => stateholder.state.hand;
        this.foundation = new Foundation(hand, service);
        this.stock = new Stock(hand, service);
        this.tableauStack = new TableauStack(hand, service);
        this.waste = new Waste(hand, service);
    }
}