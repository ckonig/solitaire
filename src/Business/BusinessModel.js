import Blinker from "./Blinker";
import Dispatcher from "./Dispatcher";
import Foundation from "./Foundation";
import Model from "../Model/Model";
import Stock from "./Stock";
import Suggestions from "./Suggestions";
import Tableau from "./Tableau";
import Waste from "./Waste";

export default class BusinessModel {
    constructor(obj) {
        this.stock = obj.stock;
        this.waste = obj.waste;
        this.foundation = obj.foundation;
        this.tableau = obj.tableau;
        this.hand = obj.hand;
        this.game = obj.game;
        this.settings = obj.settings;
        this.suggestor = new Suggestions();
    }

    suggest = () => this.suggestor.evaluateOptions(this);

    setEntropy = (lvl) => {
        this.settings.baseEntropy = lvl;
        this.stock.setEntropy(lvl);
        this.waste.setEntropy(lvl);
        this.foundation.setEntropy(lvl);
        this.tableau.setEntropy(lvl);
    };

    assignHandlers = (updateGameContext) => {
        const blinker = new Blinker(updateGameContext);
        const getHandler = (clickHandler) => new Dispatcher(clickHandler, updateGameContext).getHandler(this.hand);
        this.stock.onClick = getHandler(new Stock(blinker));
        this.waste.onClick = getHandler(new Waste(blinker));
        this.foundation.onClick = getHandler(new Foundation(blinker));
        this.tableau.onClick = getHandler(new Tableau(blinker));
    };

    static getInitialState = (launchSettings) => {
        return new BusinessModel(Model.getInitialState(launchSettings));
    };

    static copy = (state) => {
        return new BusinessModel(Model.copy(state));
    };
}
