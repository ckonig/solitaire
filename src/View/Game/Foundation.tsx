import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import { FoundationStack } from "../../Model/Game/Foundation";
import GlobalContext from "../Context";
import Hand from "./Hand";
import React from "react";
import StackBase from "./StackBase";

type FoundationProps = { index: number; model: FoundationStack };

export default class Foundation extends BlinkingComponent<FoundationProps> {
    constructor(props: FoundationProps) {
        super(props, (s) => s.foundation.stacks[props.index]);
    }

    static Stacks = () => {
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

    render() {
        const model = this.props.model;
        return (
            <div className="board-field" key={this.props.index}>
                <StackBase model={model}>
                    <div className={"align-center foundation-base suit-" + model.icon}>{model.icon}</div>
                </StackBase>
                {model.stack.map((card, index) => (
                    <Card
                        key={index}
                        model={card}
                        blink={model.blinkFor}
                        isSuggested={model.suggestion && model.stack.length - 1 == index}
                    />
                ))}
                <Hand parentModel={model} />
            </div>
        );
    }
}
