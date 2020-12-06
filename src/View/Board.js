import Footer from "./Footer";
import Foundation from "./Foundation";
import Hand from "./MouseHand";
import React from "react";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

const Board = (props) => {
    return (
        <div>
            <Hand stack={props.model.hand.stack} undo={props.handlers.undo} />
            <div className="layout-grid-container">
                <Stock model={props.model.stock} onClick={props.handlers.clickStock} />
                <Waste model={props.model.waste} hand={props.model.hand} onClick={props.handlers.clickWaste} />
                <div className="spacer">&nbsp;</div>
                {props.model.foundation.stacks.map((foundation, index) => (
                    <Foundation
                        key={index}
                        index={index}
                        model={foundation}
                        hand={props.model.hand}
                        onClick={(c) => props.handlers.clickFoundation(c, index)}
                    />
                ))}
                {props.model.tableau.stacks.map((stack, index) => (
                    <Tableau
                        key={index}
                        index={index}
                        model={stack}
                        hand={props.model.hand}
                        onClick={(card) => props.handlers.clickTableau(card, index)}
                    />
                ))}
                <Footer
                    reset={props.handlers.reset}
                    undoLabel={props.handlers.undoLabel}
                    undo={props.handlers.undo}
                    model={props.model.game}
                />
            </div>
        </div>
    );
};

export default Board;
