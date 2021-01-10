import "../Style/Board.scss";

import BoardNavigator from "./Navigation/BoardNavigator";
import Dealer from "./Dealer";
import { DndProvider } from "react-dnd";
import FoundationStacks from "./Foundation";
import { HTML5Backend } from "react-dnd-html5-backend";
import Header from "../UI/Header/Header";
import Menu from "../UI/Menu";
import React from "react";
import Stock from "./Stock";
import TableauStacks from "./Tableau";
import Waste from "./Waste";

type BoardProps = { mode: string };
const Board = (props: BoardProps) => (
    <DndProvider backend={HTML5Backend}>
        <Menu />
        <Header mode={props.mode} />
        <div className={"board-jail " + props.mode}>
            <div className={"board-grid-container " + props.mode}>
                <Stock />
                <Waste />
                <div className="spacer">&nbsp;</div>
                <FoundationStacks />
                <TableauStacks />
            </div>
        </div>
        <Dealer />
        <BoardNavigator />
    </DndProvider>
);

export default Board;
