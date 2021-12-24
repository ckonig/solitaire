import Card from "./Card";
import FoundationStackModel from "../../Model/Game/FoundationStack";
import Icon from "@mdi/react";
import React from "react";
import StackBase from "./StackBase";
import useBlinkEffect from "./Hooks/useBlinkEffect";
import useGlobalContext from "../GlobalContext";
import { useStackDrop } from "./Hooks/useStackDrop";

type FoundationProps = { index: number; model: FoundationStackModel };

const Foundation = () => {
    const { state } = useGlobalContext();
    return (
        <>
            {state.foundation.stacks.map((foundation, index) => (
                <FoundationStack key={index} model={foundation} index={index} />
            ))}
        </>
    );
};

export default Foundation;

const FoundationStack = (props: FoundationProps) => {
    useBlinkEffect((model) => model.foundation.stacks[props.index]);
    const { state } = useGlobalContext();
    const model = props.model;
    const drop = useStackDrop(props.model);
    const cards = state.hand.source === model.source ? [...model.stack, ...state.hand.stack] : [...model.stack];
    return (
        <div className="board-field" key={props.index} ref={drop}>
            <StackBase model={model}>
                <div className={"align-center foundation-base suit-" + model.icon}>
                    <Icon path={model.icon} size={4} horizontal  color={model.color} />
                </div>
            </StackBase>
            <Card
                index={0}
                key={0}
                models={cards}
                blink={model.blinkFor}
                isSuggested={(index) => model.suggestion && model.stack.length - 1 === index}
                isSelected={(index) => index > model.stack.length - 1}
            />
        </div>
    );
};
