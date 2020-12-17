import { AppState, StateUpdateFunction } from "../Common";

import Blinker from "./Blinker";
import { ClickHandler } from "../Common";
import Dealer from "./Dealer";
import Dispatcher from "./Dispatcher";
import Foundation from "./Foundation";
import Model from "../Model/Model";
import Stock from "./Stock";
import Suggestions from "./Suggestions";
import Tableau from "./Tableau";
import Waste from "./Waste";

export default class BusinessModel extends Model {
    suggestor: Suggestions;
    dealer: Dealer;

    constructor(obj: any) {
        super(obj);
        this.suggestor = new Suggestions();
        this.dealer = new Dealer();
    }

    suggest = () => this.suggestor.evaluateOptions(this);

    setEntropy = (lvl: number) => {
        this.settings.baseEntropy = lvl;
        this.stock.setEntropy(lvl);
        this.waste.setEntropy(lvl);
        this.foundation.setEntropy(lvl);
        this.tableau.setEntropy(lvl);
    };

    assignHandlers = (updateGameContext: StateUpdateFunction) => {
        const blinker = new Blinker(updateGameContext);
        const getHandler = (clickHandler: ClickHandler) => new Dispatcher(clickHandler, updateGameContext).getHandler(this.hand);
        this.stock.onClick = getHandler(new Stock(blinker));
        this.waste.onClick = getHandler(new Waste(blinker));
        this.foundation.onClick = getHandler(new Foundation(blinker));
        this.tableau.onClick = getHandler(new Tableau(blinker));
    };

    static getInitialState = (launchSettings: AppState) => {
        return new BusinessModel(Model.getInitialState(launchSettings));
    };

    static copy = (state: Model) => {
        return new BusinessModel(Model.copy(state));
    };
}
