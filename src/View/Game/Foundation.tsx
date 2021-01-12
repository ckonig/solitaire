import Card from "./Card";
import FoundationStack from "../../Model/Game/FoundationStack";
import GlobalContext from "../Context";
import React from "react";
import StackBase from "./StackBase";
import useBlinkEffect from "./useBlinkEffect";
import { useDrop } from "react-dnd";

type FoundationProps = { index: number; model: FoundationStack };

const FoundationStacks = () => {
    const { state } = React.useContext(GlobalContext);
    if (!state) return null;
    return (
        <>
            {state.foundation.stacks.map((foundation, index) => (
                <Foundation key={index} model={foundation} index={index} />
            ))}
        </>
    );
};

export default FoundationStacks;

const Foundation = (props: FoundationProps) => {
    useBlinkEffect((model) => model.foundation.stacks[props.index]);
    const { updateGameContext, state } = React.useContext(GlobalContext);
    const model = props.model;
    const [, drop] = useDrop({
        accept: "card",
        canDrop: (item: any) => {
            return props.model.accepts(item.model);
        },
        drop: () => {
            updateGameContext(props.model.clickEmpty({ isKeyBoard: false }));
        },
    });
    const cards = state?.hand.source == model.source ? [...model.stack, ...state.hand.stack] : [...model.stack];
    return (
        <div className="board-field" key={props.index} ref={drop}>
            <StackBase model={model}>
                <div className={"align-center foundation-base suit-" + model.icon}>{model.icon}</div>
            </StackBase>
            <Card
                index={0}
                key={0}
                models={cards}
                blink={model.blinkFor}
                isSuggested={(index) => model.suggestion && model.stack.length - 1 == index}
                isSelected={(index) => index > model.stack.length - 1}
            />
        </div>
    );
};
