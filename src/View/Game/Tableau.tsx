import TableauModel, { TableauStack } from "../../Model/Game/Tableau";

import Card from "./Card";
import GlobalContext from "../Context";
import Hand from "./Hand";
import React from "react";
import StackBase from "./StackBase";
import useBlinkEffect from "./useBlinkEffect";

type TableauProps = { index: number; model: TableauStack; parent: TableauModel };

const TableauStacks = () => {
    const { state } = React.useContext(GlobalContext);
    if (!state) return null;
    return (
        <>
            {state.tableau.stacks.map((tableau, index) => (
                <Tableau key={index} index={index} model={tableau} parent={state.tableau} />
            ))}
        </>
    );
};
export default TableauStacks;

const Tableau = (props: TableauProps) => {
    useBlinkEffect((s) => s.tableau.stacks[props.index]);

    let offset = 1;
    const getOffset = (index: number) => {
        for (let i = 0; i <= index; i++) {
            if (props.model.stack[i] && !props.model.stack[i].isHidden) {
                offset = i * 12 + (index - i) * 24;
                return offset;
            }
        }
        offset = index * 12;
        return offset;
    };

    return (
        <div className="board-field">
            <StackBase model={props.model} />
            {props.model.stack.map((card, index) => (
                <Card
                    key={index}
                    model={card}
                    blink={props.model.blinkFor}
                    isSuggested={props.model.suggestion && props.model.stack.length - 1 == index}
                    offsetTop={getOffset(index)}
                />
            ))}
            <Hand parentModel={props.model} offsetTop={getOffset(props.model.stack.length)} />
        </div>
    );
};
