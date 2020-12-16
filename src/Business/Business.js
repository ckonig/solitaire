import Foundation from "./Foundation";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

export default class Business {
    static getHandlers(gamestate, state) {
        return {
            clickTableau: new Tableau(gamestate).getHandler(state.hand),
            clickFoundation: new Foundation(gamestate).getHandler(state.hand),
            clickStock: new Stock(gamestate).getHandler(state.hand),
            clickWaste: new Waste(gamestate).getHandler(state.hand),
        };
    }
}
