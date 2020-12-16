import Board from "./Board";
import Business from "../Business/Business";
import Dealer from "./Dealer";
import Deck from "../Model/Deck/Deck";
import GameState from "../Business/GameState";
import Model from "../Model/Model";
import React from "react";
import Settings from "../Service/Settings";
import Suggestions from "../Service/Suggestions";
import Undo from "../Service/Undo";

export default class Launcher extends React.Component {
    constructor(props) {
        super(props);
        this.suggestor = new Suggestions();
        this.deck = new Deck();
        this.deck.shuffle();
        this.launchSettings = props.settings;
        this.state = Model.getInitialState(this.deck, this.launchSettings);
    }

    getInitialState = () => Model.getInitialState(this.deck, this.launchSettings);

    getHandlers() {
        const gamestate = new GameState(this);
        return {
            ...new Undo(this.getInitialState, this.suggestor).getHandlers(this, this.state),
            ...new Settings(this.suggestor).getHandlers(this, this.state),
            ...Business.getHandlers(gamestate, this.state),
            restart: this.props.restart,
        };
    }

    render = () => (
        <>
            <Board model={this.state} handlers={this.getHandlers()} />
            <Dealer state={this.state} stateholder={this} />
        </>
    );
}
