import { ClickHandler, LaunchSettings } from "../Common";
import TableauHandler, { TableauHidden } from "./Business/Tableau";

import Card from "./Deck/Card";
import Dealer from "./Business/Dealer";
import Deck from "./Deck/Deck";
import Dispatcher from "./Business/Dispatcher";
import Focus from "./Game/Focus";
import Foundation from "./Game/Foundation";
import FoundationHandler from "./Business/Foundation";
import Game from "./Game/Game";
import Hand from "./Game/Hand";
import { IStack } from "./Game/IStack";
import Navigator from "./Business/Navigator";
import Settings from "./Game/Settings";
import Stock from "./Game/Stock";
import StockHandler from "./Business/Stock";
import Suggestions from "./Business/Suggestions";
import Tableau from "./Game/Tableau";
import Waste from "./Game/Waste";
import WasteHandler from "./Business/Waste";

export default class Model {
    stock: Stock;
    waste: Waste;
    foundation: Foundation;
    tableau: Tableau;
    hand: Hand;
    game: Game;
    settings: Settings;
    focus: Focus;
    suggestor: Suggestions;
    dealer: Dealer;
    navigator: Navigator;
    token: number;

    constructor(obj: any) {
        this.stock = obj.stock;
        this.waste = obj.waste;
        this.foundation = obj.foundation;
        this.tableau = obj.tableau;
        this.hand = obj.hand;
        this.game = obj.game;
        this.settings = obj.settings;
        this.focus = obj.focus;
        this.suggestor = new Suggestions();
        this.dealer = new Dealer();
        this.navigator = new Navigator(this);
        this.token = obj.token;
    }

    setToken = (token: number) => {
        this.token = token;
    };

    withSuggestions = () => {
        this.suggestor.evaluateOptions(this);
        return this;
    };

    _hasSuggestion = (obj: any) => {
        return obj.suggestion || (obj.stack && obj.stack.some(this._hasSuggestion)) || (obj.stacks && obj.stacks.some(this._hasSuggestion));
    };

    hasSuggestions = () => {
        return (
            this._hasSuggestion(this.waste) ||
            this._hasSuggestion(this.stock) ||
            this._hasSuggestion(this.tableau) ||
            this._hasSuggestion(this.foundation)
        );
    };

    canAutoSolve = () => {
        return (
            this.waste.stack.length == 0 &&
            this.stock.stack.length == 0 &&
            this.tableau.stacks.every((s) => s.stack.every((c) => !c.isHidden))
        );
    };

    setEntropy = (lvl: number) => {
        this.settings.baseEntropy = lvl;
        this.stock.setEntropy(lvl);
        this.waste.setEntropy(lvl);
        this.foundation.setEntropy(lvl);
        this.tableau.setEntropy(lvl);
    };

    clearSuccess = (card: Card) => {
        const clear = (c: Card, s: IStack) => {
            s.stack.forEach((_c) => {
                if (_c.equals(c)) {
                    _c.success = false;
                }
            });
        };
        clear(card, this.stock);
        clear(card, this.waste);
        this.foundation.stacks.forEach((s) => clear(card, s));
        this.tableau.stacks.forEach((s) => clear(card, s));
    };

    withHandlers = () => {
        const getHandler = (clickHandler: ClickHandler) => new Dispatcher(clickHandler).getHandler(this.hand);
        this.stock.setOnClick(getHandler(new StockHandler(this.navigator)));
        this.waste.setOnClick(getHandler(new WasteHandler()));
        this.foundation.setOnClick(getHandler(new FoundationHandler()));
        this.tableau.setOnClick(getHandler(new TableauHandler()), getHandler(new TableauHidden()), this.hand);
        return this;
    };

    static getInitialState = (launchSettings: LaunchSettings, deck: Deck) => {
        const settings = new Settings(launchSettings);
        const hand = new Hand();
        const state = {
            stock: new Stock([...deck.cards], settings),
            waste: new Waste(settings, hand),
            foundation: new Foundation(settings, hand),
            tableau: new Tableau(settings, hand),
            hand: hand,
            game: new Game(settings),
            settings: settings,
            focus: new Focus(settings),
            token: 0,
        };
        return new Model(state);
    };

    static copy = (state: Model) => {
        const hand = Hand.copy(state.hand);
        return new Model({
            stock: Stock.copy(state.stock),
            waste: Waste.copy(state.waste, hand),
            foundation: Foundation.copy(state.foundation, hand),
            tableau: Tableau.copy(state.tableau, hand),
            hand: hand,
            game: Game.copy(state.game),
            settings: Settings.copy(state.settings),
            focus: state.focus,
            token: state.token,
        });
    };
}
