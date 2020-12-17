import "../Style/Board.scss";

import Business from "../Business/Business";
import Dealer from "./Dealer";
import Deck from "../Model/Deck/Deck";
import EndScreen from "./UI/EndScreen";
import Foundation from "./Foundation";
import GameState from "../Business/GameState";
import Header from "./UI/Header";
import Menu from "./UI/Menu";
import Model from "../Model/Model";
import React from "react";
import Settings from "../Service/Settings";
import Stock from "./Stock";
import Suggestions from "../Service/Suggestions";
import Tableau from "./Tableau";
import Undo from "../Service/Undo";
import Waste from "./Waste";

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.suggestor = new Suggestions();
        this.deck = new Deck();
        this.deck.shuffle();
        this.state = Model.getInitialState(this.deck, props.settings);
    }

    render = () => {
        const business = Business.getHandlers(new GameState(this, this.suggestor), this.state.hand);
        const handlers = {
            ...new Undo(this.suggestor, this, this.state),
            ...new Settings(this.suggestor, this, this.state),
            restart: this.props.restart,
        };
        return (
            <div>
                <div className="layout-grid-container">
                    <Header game={this.state.game} settings={this.state.settings} handlers={handlers} />
                    <div className="game-view">
                        <div className="board-grid-container">
                            <Stock model={this.state.stock} onClick={business.clickStock} />
                            <Waste
                                model={this.state.waste}
                                hand={this.state.hand}
                                onClick={business.clickWaste}
                                settings={this.state.settings}
                            />
                            <div className="spacer">&nbsp;</div>
                            <Foundation.Stacks
                                model={this.state.foundation}
                                hand={this.state.hand}
                                onClick={business.clickFoundation}
                                settings={this.state.settings}
                            />
                            <Tableau.Stacks
                                model={this.state.tableau}
                                hand={this.state.hand}
                                onClick={business.clickTableau}
                                settings={this.state.settings}
                            />
                        </div>
                    </div>
                    <Menu model={this.state.game} settings={this.state.settings} handlers={handlers} />
                    <EndScreen game={this.state.game} restart={handlers.restart} />
                    <Dealer state={this.state} stateholder={this} suggestor={this.suggestor} />
                </div>
            </div>
        );
    };
}
