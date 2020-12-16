import EndScreen from "./UI/EndScreen";
import Foundation from "./Foundation";
import Header from "./UI/Header";
import Menu from "./UI/Menu";
import React from "react";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

export default class Board extends React.Component {
    componentDidMount = () => this.props.handlers.deal();
    render() {
        const props = this.props;
        return (
            <div>
                <div className="layout-grid-container">
                    <Header
                        //@todo minify by passing all handlers
                        model={props.model.game}
                        settings={props.model.settings}
                        undoLabel={props.handlers.undoLabel}
                        toggleMenu={props.handlers.toggleMenu}
                        reset={props.handlers.reset}
                        newGame={props.handlers.restart}
                        undo={props.handlers.undo}
                        beat={props.handlers.beat}
                        suggestOnce={props.handlers.suggestOnce}
                    />
                    <div className="game-view">
                        <div className="board-grid-container">
                            <Stock model={props.model.stock} onClick={props.handlers.clickStock} />
                            <Waste
                                model={props.model.waste}
                                hand={props.model.hand}
                                onClick={props.handlers.clickWaste}
                                settings={props.model.settings}
                            />
                            <div className="spacer">&nbsp;</div>
                            <Foundation.Stacks
                                model={props.model.foundation}
                                hand={props.model.hand}
                                onClick={props.handlers.clickFoundation}
                                settings={props.model.settings}
                            />
                            <Tableau.Stacks
                                model={props.model.tableau}
                                hand={props.model.hand}
                                onClick={props.handlers.clickTableau}
                                settings={props.model.settings}
                            />
                        </div>
                    </div>
                    <Menu
                        //@todo minify by passing all handlers
                        model={props.model.game}
                        settings={props.model.settings}
                        undoLabel={props.handlers.undoLabel}
                        setMouseMode={props.handlers.setMouseMode}
                        setBaseEntropy={props.handlers.setBaseEntropy}
                        setInteractionEntropy={props.handlers.setInteractionEntropy}
                        setSuggestionMode={props.handlers.setSuggestionMode}
                    />
                    <EndScreen game={props.model.game} restart={props.handlers.restart} />
                </div>
            </div>
        );
    }
}
