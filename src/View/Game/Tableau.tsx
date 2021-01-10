import TableauModel, { TableauStack } from "../../Model/Game/Tableau";

import Card from "./Card";
import GlobalContext from "../Context";
import React from "react";
import StackBase from "./StackBase";
import useBlinkEffect from "./useBlinkEffect";
import { useDrop } from "react-dnd";

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
    const { updateGameContext } = React.useContext(GlobalContext);
    const [, drop] = useDrop({
        accept: "card",
        drop: () => {
            console.log("dropping", drop);
            updateGameContext(props.model.clickEmpty({ isKeyBoard: false }));
            props.model.clickEmpty({ isKeyboard: false });
        },
    });
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

    const { state } = React.useContext(GlobalContext);
    const cards = state?.hand.source == props.model.source ? [...props.model.stack, ...state.hand.stack] : [...props.model.stack];

    return (
        <div className="board-field" ref={drop}>
            <StackBase model={props.model} />
            {cards.map((card, index) => (
                <Card
                    key={index}
                    model={card}
                    blink={props.model.blinkFor}
                    isSuggested={props.model.suggestion && props.model.stack.length - 1 == index}
                    offsetTop={getOffset(index)}
                    isSelected={index > props.model.stack.length - 1}
                />
            ))}
        </div>
    );
};
