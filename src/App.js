import "./App.css";

import Board from "./View/Board";
import { Component } from "react";
import Game from "./Service/Facade";
import React from "react";

export default class App extends Component {
    constructor(props) {
        super(props);
        //@todo allow resuming earlier game.
        this.game = new Game();
        this.state = this.game.getInitialState(this);
    }

    render() {
        const handlers = this.game.getHandlers(this, this.state);
        return <Board subscribe={this.subscribe} model={this.state} game={this.game} handlers={handlers} />;
    }

    suggestMove = () => {
        const handlers = this.game.getHandlers(this, this.state);
        handlers.createSuggestions();
    };
}
