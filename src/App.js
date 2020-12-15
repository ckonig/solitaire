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
        this.game = new Game();
        this.state = this.game.getInitialState(this);
    }

    deal = (dealt) => {
        setTimeout(() => {
            if (this.state && !this.state.isDealt) {
                this.gamestate.setState((state) => {
                    if (dealt != state.dealt) {
                        return null;
                    }
                    const next = this.game.deal(state);
                    return next;
                });
            }
        }, 50);
    };

    componentDidMount() {
        this.deal(this.state.dealt);
    }

    componentDidUpdate() {
        this.deal(this.state.dealt);
    }

    render() {
        const handlers = this.game.getHandlers(this.gamestate, this.state);
        return <Board subscribe={this.subscribe} model={this.state} game={this.game} handlers={handlers} />;
    }
}
