import "./App.css";

import Board from "./View/Board";
import { Component } from "react";
import Game from "./Service/Facade";
import GameState from "./Service/GameState";
import React from "react";
import Suggestions from "./Service/Suggestions";

export default class App extends Component {
    constructor(props) {
        super(props);
        //@todo allow resuming earlier game.
        this.gamestate = new GameState(this, new Suggestions());
        this.game = new Game(this.gamestate);
        this.state = this.game.getInitialState(this);
    }

    render() {
        const handlers = this.game.getHandlers(this.gamestate, this.state);
        return <Board subscribe={this.subscribe} model={this.state} game={this.game} handlers={handlers} />;
    }

    suggestMove = () => {
        const handlers = this.game.getHandlers(this.gamestate, this.state);
        handlers.createSuggestions();
    };
}
