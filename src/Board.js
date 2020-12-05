import "./App.css";

import { Component } from "react";
import Footer from "./View/Footer";
import Foundation from "./View/Foundation";
import Hand from "./View/MouseHand";
import React from "react";
import Stock from "./View/Stock";
import Tableau from "./View/Tableau";
import Waste from "./View/Waste";

export default class Board extends Component {
    render = () => {
        return (
            <div>
                <Hand stack={this.props.model.hand.stack} undo={this.props.handlers.undo} />
                <div className="layout-grid-container">
                    <Stock model={this.props.model.stock} onClick={this.props.handlers.clickStock} />
                    <Waste model={this.props.model.waste} hand={this.props.model.hand} onClick={this.props.handlers.clickWaste} />
                    <div className="spacer">&nbsp;</div>
                    {this.props.model.foundation.stacks.map((foundation, index) => (
                        <Foundation
                            key={"f" + index}
                            index={index}
                            model={foundation}
                            hand={this.props.model.hand}
                            onClick={(c) => this.props.handlers.clickFoundation(c, index)}
                        />
                    ))}
                    {this.props.model.tableau.stacks.map((stack, index) => (
                        <Tableau
                            key={"t" + index}
                            index={index}
                            model={stack}
                            hand={this.props.model.hand}
                            onClick={(card) => this.props.handlers.clickTableau(card, index)}
                        />
                    ))}
                    <Footer reset={this.props.handlers.reset} undo={this.props.handlers.undo} model={this.props.model.game} />
                </div>
            </div>
        );
    };
}
