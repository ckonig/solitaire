import "./App.css";

import { Component } from "react";
import Footer from "./View/Footer";
import Foundation from "./View/Foundation";
import Game from "./Service/Game";
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
        return (
            <div>
                <Hand stack={this.state.hand.stack} />
                <div className="layout-grid-container">
                    <Stock model={this.state.stock} onClick={this.game.clickStock} />
                    <Waste model={this.state.waste} hand={this.state.hand} onClick={this.game.clickWaste} />
                    <div className="spacer">&nbsp;</div>
                    {this.state.foundation.stacks.map((foundation, index) => (
                        <Foundation
                            key={"f" + index}
                            index={index}
                            model={foundation}
                            hand={this.state.hand}
                            onClick={(c) => this.game.clickFoundation(index, c)}
                        />
                    ))}
                    {this.state.tableau.stacks.map((stack, index) => (
                        <TableauStack
                            key={"t" + index}
                            index={index}
                            model={stack}
                            hand={this.state.hand}
                            onClick={(card, source) => this.game.clickTableauStack(card, index, source)}
                        />
                    ))}
                    <Footer reset={this.game.reset} model={this.state.game} />
                </div>
            </div>
        );
    }
}
