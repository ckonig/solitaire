import "../Style/Board.scss";

import Dealer from "./Dealer";
import EndScreen from "../UI/EndScreen";
import Foundation from "./Foundation";
import GamePad from "./GamePad";
import Header from "../UI/Header/Header";
import Menu from "../UI/Menu";
import Navigator from "./Navigator";
import React from "react";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

const Board = (props) => (
    <>
        <div className={"layout-grid-container " + props.mode}>
            <Header />
            <div className="board-grid-container">
                <Stock />
                <Waste />
                <div className="spacer">&nbsp;</div>
                <Foundation.Stacks />
                <Tableau.Stacks />
            </div>
        </div>
        <Menu />
        <EndScreen />
        <Dealer />
        <Navigator />
        <GamePad />
    </>
);

export default Board;
