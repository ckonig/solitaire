import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import GlobalContext from "../Context";
import Hand from "./Hand";
import React from "react";
import StackBase from "./StackBase";

export default class Foundation extends BlinkingComponent {
    constructor(props) {
        super((s) => s.foundation.stacks[props.index]);
    }

    static Stacks = () => {
        const { state, updateGameContext } = React.useContext(GlobalContext);
        const onClick = (c, p, i) => updateGameContext(state.foundation.onClick(c, p, i));
        return state.foundation.stacks.map((foundation, index) => (
            <Foundation key={index} model={foundation} index={index} onClick={onClick} />
        ));
    };

    render() {
        const model = this.props.model;
        return (
            <div key={this.props.index}>
                <StackBase
                    suggested={model.suggestion && !model.stack.length}
                    blink={model.blinkFor}
                    onClick={() => this.props.onClick(null, null, this.props.index)}
                    visible={!model.stack.length}
                >
                    <div className={"align-center foundation-base suit-" + model.icon}>{model.icon}</div>
                </StackBase>
                {model.stack.map((card, index) => (
                    <Card
                        key={index}
                        model={card}
                        canClick={model.stack.length - 1 == index}
                        blink={model.blinkFor}
                        isSuggested={model.suggestion && model.stack.length - 1 == index}
                        onClick={(c, p) => this.props.onClick(c, p, this.props.index)}
                    />
                ))}
                <Hand
                    parent={"foundation-" + this.props.index}
                    onClick={(c, p) => this.props.onClick(model.stack[model.stack.length - 1], p, this.props.index)}
                    stack={model.stack}
                />
            </div>
        );
    }
}
