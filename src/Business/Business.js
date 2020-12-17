import Blinker from "./Blinker";
import Dispatcher from "./Dispatcher";
import Foundation from "./Foundation";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

export default class Business {
    static getHandlers(gamestate, hand) {
        const blinker = new Blinker(gamestate);
        return {
            clickTableau: new Dispatcher(new Tableau(blinker), gamestate).getHandler(hand),
            clickFoundation: new Dispatcher(new Foundation(blinker), gamestate).getHandler(hand),
            clickStock: new Dispatcher(new Stock(blinker), gamestate).getHandler(hand),
            clickWaste: new Dispatcher(new Waste(blinker), gamestate).getHandler(hand),
        };
    }
}
