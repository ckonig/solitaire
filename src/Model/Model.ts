import { AppState } from "../Common";
import Deck from "./Deck/Deck";
import Focus from "./Game/Focus";
import Foundation from "./Game/Foundation";
import Game from "./Game/Game";
import Hand from "./Game/Hand";
import LaunchSettings from "./Game/Settings/LaunchSettings";
import Settings from "./Game/Settings";
import Stock from "./Game/Stock";
import Tableau from "./Game/Tableau";
import Waste from "./Game/Waste";

export interface LaunchState extends AppState, LaunchSettings {}
export default class Model {
    stock: Stock;
    waste: Waste;
    foundation: Foundation;
    tableau: Tableau;
    hand: Hand;
    game: Game;
    settings: Settings;
    focus: Focus;

    constructor(obj: any) {
        this.stock = obj.stock;
        this.waste = obj.waste;
        this.foundation = obj.foundation;
        this.tableau = obj.tableau;
        this.hand = obj.hand;
        this.game = obj.game;
        this.settings = obj.settings;
        this.focus = obj.focus;
    }

    static getInitialState = (launchSettings: LaunchState, deck: Deck) => {
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
        };
        return state;
    };

    static copy = (state: Model) => {
        const hand = Hand.copy(state.hand);
        return {
            stock: Stock.copy(state.stock),
            waste: Waste.copy(state.waste, hand),
            foundation: Foundation.copy(state.foundation, hand),
            tableau: Tableau.copy(state.tableau, hand),
            hand: hand,
            game: Game.copy(state.game),
            settings: Settings.copy(state.settings),
            focus: state.focus,
        };
    };
}
