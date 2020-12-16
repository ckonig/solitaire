import Board from "./Board";
import Dealer from "./Dealer";
import Game from "../Service/Facade";
import React from "react";

export default class Launcher extends React.Component {
    constructor(props) {
        super(props);
        this.game = new Game(props.settings);
        this.state = this.game.getInitialState();
    }

    getHandlers = () => {
        const handlers = this.game.getHandlers(this);
        handlers.restart = this.props.restart;
        return handlers;
    };

    render = () => (
        <>
            <Board model={this.state} game={this.game} handlers={this.getHandlers()} />
            <Dealer state={this.state} stateholder={this} />
        </>
    );
}
