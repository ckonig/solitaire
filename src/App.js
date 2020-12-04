import "./App.css";

import { Component } from "react";
import Footer from "./View/Footer";
import Foundation from "./View/Foundation";
import Game from "./Service/Facade";
import Hand from "./View/MouseHand";
import React from "react";
import Stock from "./View/Stock";
import TableauStack from "./View/TableauStack";
import Waste from "./View/Waste";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.game = new Game(this);
        this.state = this.game.getInitialState();
    }

    render() {
        const handlers = this.game.getHandlers();
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
                        <TableauStack
                            key={"t" + index}
                            index={index}
                            model={stack}
                            hand={this.state.hand}
                            onClick={(card) => handlers.clickTableauStack(card, index)}
                        />
                    ))}
                    <Footer reset={this.game.reset} model={this.state.game} />
                </div>
            </div>
        );
    }
}
