import "./App.css";

import { Component } from "react";
import Footer from "./View/Footer";
import Foundation from "./View/Foundation";
import Game from "./Service/Facade";
import Hand from "./View/MouseHand";
import React from "react";
import Stock from "./View/Stock";
import Tableau from "./View/Tableau";
import Waste from "./View/Waste";

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.game = new Game();
        this.state = this.game.getInitialState(this);
    }

    render() {
        const handlers = this.game.getHandlers(this);
        return (
            <div>
                <Hand stack={this.state.hand.stack} />
                <div className="layout-grid-container">
                    <Stock model={this.state.stock} onClick={handlers.clickStock} />
                    <Waste model={this.state.waste} hand={this.state.hand} onClick={handlers.clickWaste} />
                    <div className="spacer">&nbsp;</div>
                    {this.state.foundation.stacks.map((foundation, index) => (
                        <Foundation
                            key={"f" + index}
                            index={index}
                            model={foundation}
                            hand={this.state.hand}
                            onClick={(c) => handlers.clickFoundation(c, index)}
                        />
                    ))}
                    {this.state.tableau.stacks.map((stack, index) => (
                        <Tableau
                            key={"t" + index}
                            index={index}
                            model={stack}
                            hand={this.state.hand}
                            onClick={(card) => handlers.clickTableau(card, index)}
                        />
                    ))}
                    <Footer reset={handlers.reset} undo={handlers.undo} model={this.state.game} />
                </div>
            </div>
        );
    }
}
