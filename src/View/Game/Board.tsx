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
import { TouchBackend } from "react-dnd-touch-backend";
import TouchDetector from "../../common/TouchDetector";
import Waste from "./Waste";
import { usePreview } from "react-dnd-preview";

const TouchPreview = (props: { reff: any }) => {
    // eslint-disable-next-line no-unused-vars
    const { display, _itemType, item, style } = usePreview();
    if (!display) {
        return null;
    }
    const rect = props.reff.getBoundingClientRect();
    return (
        <div style={{ ...style, position: "relative", width: "100%", left: rect.left * -1, top: rect.top * -1, zIndex: 2000, opacity: 1 }}>
            {item.render()}
        </div>
    );
};
type BoardProps = { mode: string };
const Board = (props: BoardProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    return (
        <DndProvider backend={TouchDetector() ? TouchBackend : HTML5Backend}>
            <Menu />
            <Header mode={props.mode} />
            <div className={"board-jail " + props.mode}>
                <div className={"board-grid-container " + props.mode}>
                    <Stock />
                    <Waste />
                    <div className="spacer" ref={ref}>
                        <div className="board-field">{TouchDetector() && <TouchPreview reff={ref.current} />}</div>
                    </div>
                    <FoundationStacks />
                    <TableauStacks />
                </div>
            </div>
            <Dealer />
            <BoardNavigator />
        </DndProvider>
    );
};

export default Board;
