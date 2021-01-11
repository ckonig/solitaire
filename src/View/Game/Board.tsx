import "../Style/Board.scss";

import BoardNavigator from "./Navigation/BoardNavigator";
import Dealer from "./Dealer";
import { DndProvider } from "react-dnd-multi-backend";
import FoundationStacks from "./Foundation";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import Header from "../UI/Header/Header";
import Judge from "./Judge";
import Menu from "../UI/Menu";
import React from "react";
import Stock from "./Stock";
import TableauStacks from "./Tableau";
import Waste from "./Waste";
import { usePreview } from "react-dnd-preview";

const Preview = (props: { reff: any }) => {
    // eslint-disable-next-line no-unused-vars
    const { display, _itemType, item, style } = usePreview();
    if (!display) {
        return null;
    }
    const rect = props.reff.getBoundingClientRect();
    return (
        <div
            style={{
                ...style,
                position: "relative",
                width: "100%",
                left: rect.left * -1,
                top: rect.top * -1,
                zIndex: 2000,
                opacity: 1,
            }}
        >
            {item.render}
        </div>
    );
};
type BoardProps = { mode: string };
const Board = (props: BoardProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    //@todo when board lives too long, restart game will lead to duplicate dndprovider error
    //@todo use different IDs for draggable/droppable elements per user
    //then have central provider that lives forever
    return (
        <DndProvider options={HTML5toTouch}>
            <Menu />
            <Header mode={props.mode} />
            <div className={"board-jail " + props.mode}>
                <div className={"board-grid-container " + props.mode}>
                    <Stock />
                    <Waste />
                    <div className="board-field spacer" ref={ref}>
                        {ref.current && <Preview reff={ref.current} />}
                    </div>
                    <FoundationStacks />
                    <TableauStacks />
                </div>
            </div>
            <Dealer />
            <BoardNavigator />
            <Judge />
        </DndProvider>
    );
};

export default Board;
