import Business from "../Business/Business";
import Deck from "../Model/Deck/Deck";
import GameState from "../Business/GameState";
import GlobalState from "./Context";
import Model from "../Model/Model";
import React from "react";
import Settings from "../Service/Settings";
import Suggestions from "../Service/Suggestions";
import Undo from "../Service/Undo";

export default class BoardWrap extends React.Component {
    constructor(props) {
        super(props);
        this.suggestor = new Suggestions();
        this.deck = new Deck();
        this.deck.shuffle();
        this.state = Model.getInitialState(this.deck, props.settings);
    }
    
    static childContextTypes = GlobalState;

    getChildContext() {
        const business = Business.getHandlers(new GameState(this, this.suggestor), this.state.hand);
        const handlers = {
            ...new Undo(this.suggestor, this, this.state),
            ...new Settings(this.suggestor, this, this.state),
            restart: this.props.restart,
        };
        return {
            state: this.state,
            handlers: handlers,
            business: business,
            suggestor: this.suggestor,
            stateholder: this,
        };
    }

    render() {
        return <>{this.props.children}</>;
    }
}
