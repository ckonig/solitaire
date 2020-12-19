import "../Style/Board.scss";

import Dealer from "./Dealer";
import EndScreen from "../UI/EndScreen";
import Foundation from "./Foundation";
import Header from "../UI/Header/Header";
import Menu from "../UI/Menu";
import Navigator from "./Navigator";
import React from "react";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

const Board = () => (
    <>
        <div className="layout-grid-container">
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
    </>
);

export default Board;
