import "./App.css";

import Board from "./View/Board";
import { Component } from "react";
import Game from "./Service/Facade";
import GameState from "./Service/GameState";
import React from "react";

export default class App extends Component {
    constructor(props) {
        super(props);
        //@todo allow resuming earlier game.
        this.gamestate = new GameState(this);
        this.game = new Game();
        this.state = this.game.getInitialState();
    }

    componentDidMount = () => this.game.getDealer(this.gamestate, this.state).deal(this.state.stock.dealt);
    componentDidUpdate = () => this.game.getDealer(this.gamestate, this.state).deal(this.state.stock.dealt);

    render() {
        const handlers = this.game.getHandlers(this.gamestate, this.state);
        return <Board subscribe={this.subscribe} model={this.state} game={this.game} handlers={handlers} />;
    }
}
