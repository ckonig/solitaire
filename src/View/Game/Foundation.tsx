import Card from "./Card";
import { FoundationStack } from "../../Model/Game/Foundation";
import GlobalContext from "../Context";
import Hand from "./Hand";
import React from "react";
import StackBase from "./StackBase";
import useBlinkEffect from "./useBlinkEffect";

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
    const model = props.model;
    return (
        <div className="board-field" key={props.index}>
            <StackBase model={model}>
                <div className={"align-center foundation-base suit-" + model.icon}>{model.icon}</div>
            </StackBase>
            {model.stack.map((card, index) => (
                <Card key={index} model={card} blink={model.blinkFor} isSuggested={model.suggestion && model.stack.length - 1 == index} />
            ))}
            <Hand parentModel={model} />
        </div>
    );
};
