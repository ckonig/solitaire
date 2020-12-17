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
        this.state = Model.getInitialState(this.deck, props.settings);
    }

    render = () => {
        const handlers = {
            ...Undo.getHandlers(this.suggestor, this, this.state),
            ...Settings.getHandlers(this.suggestor, this, this.state),
            ...Business.getHandlers(new GameState(this), this.state),
            restart: this.props.restart,
        };
        return (
            <>
                <Board model={this.state} handlers={handlers} />
                <Dealer state={this.state} stateholder={this} />
            </>
        );
    };
}
