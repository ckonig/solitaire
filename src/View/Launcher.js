import Board from "./Board";
import Game from "../Service/Facade";
import GameState from "../Service/GameState";
import React from "react";

export default class Launcher extends React.Component {
    constructor(props) {
        super(props);
        this.gamestate = new GameState(this);
        this.game = new Game(props.settings);
        this.state = this.game.getInitialState();
    }

    getHandlers = () => {
        const handlers = this.game.getHandlers(this.gamestate, this.state);
        handlers.restart = this.props.restart;
        return handlers;
    }

    render = () => <Board model={this.state} game={this.game} handlers={this.getHandlers()} />;
}
