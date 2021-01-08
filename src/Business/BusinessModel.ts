import Model, { LaunchState } from "../Model/Model";
import Tableau, { TableauHidden } from "./Tableau";

import { ClickHandler } from "../Common";
import Dealer from "./Dealer";
import Deck from "../Model/Deck/Deck";
import Dispatcher from "./Dispatcher";
import Foundation from "./Foundation";
import Navigator from "./Navigator";
import Stock from "./Stock";
import Suggestions from "./Suggestions";
import Waste from "./Waste";

export default class BusinessModel extends Model {
    suggestor: Suggestions;
    dealer: Dealer;
    navigator: Navigator;

    constructor(obj: any) {
        super(obj);
        this.suggestor = new Suggestions();
        this.dealer = new Dealer();
        this.navigator = new Navigator(this);
    }

    withSuggestions = () => {
        this.suggestor.evaluateOptions(this);
        return this;
    };

    setEntropy = (lvl: number) => {
        this.settings.baseEntropy = lvl;
        this.stock.setEntropy(lvl);
        this.waste.setEntropy(lvl);
        this.foundation.setEntropy(lvl);
        this.tableau.setEntropy(lvl);
    };

    withHandlers = () => {
        const getHandler = (clickHandler: ClickHandler) => new Dispatcher(clickHandler).getHandler(this.hand);
        this.stock.setOnClick(getHandler(new Stock(this.navigator)));
        this.waste.setOnClick(getHandler(new Waste()));
        this.foundation.setOnClick(getHandler(new Foundation()));
        this.tableau.setOnClick(getHandler(new Tableau()), getHandler(new TableauHidden()), this.hand);
        return this;
    };

    static getInitialState = (launchSettings: LaunchState, deck: Deck) => {
        return new BusinessModel(Model.getInitialState(launchSettings, deck));
    };

    static copy = (state: Model) => {
        return new BusinessModel(Model.copy(state));
    };
}
