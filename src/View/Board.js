import "../Style/Board.scss";

import Dealer from "./Dealer";
import EndScreen from "./UI/EndScreen";
import Foundation from "./Foundation";
import GlobalState from "./Context";
import Header from "./UI/Header";
import Menu from "./UI/Menu";
import React from "react";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

const Board = (props, context) => {
    const { state, business, handlers, suggestor, stateholder } = context;
    return (
        <div>
            <div className="layout-grid-container">
                <Header game={state.game} settings={state.settings} handlers={handlers} />
                <div className="game-view">
                    <div className="board-grid-container">
                        <Stock model={state.stock} onClick={business.clickStock} />
                        <Waste model={state.waste} hand={state.hand} onClick={business.clickWaste} settings={state.settings} />
                        <div className="spacer">&nbsp;</div>
                        <Foundation.Stacks
                            model={state.foundation}
                            hand={state.hand}
                            onClick={business.clickFoundation}
                            settings={state.settings}
                        />
                        <Tableau.Stacks model={state.tableau} hand={state.hand} onClick={business.clickTableau} settings={state.settings} />
                    </div>
                </div>
                <Menu model={state.game} settings={state.settings} handlers={handlers} />
                <EndScreen game={state.game} restart={handlers.restart} />
                <Dealer state={state} stateholder={stateholder} suggestor={suggestor} />
            </div>
        </div>
    );
};
Board.contextTypes = GlobalState;

export default Board;
