import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import GlobalContext from "./Context";
import Hand from "./Hand";
import React from "react";
import StackBase from "./StackBase";

export default class Foundation extends BlinkingComponent {
    constructor(props) {
        super((s) => s.foundation.stacks[props.index]);
    }

    static Stacks = () => {
        const { state } = React.useContext(GlobalContext);
        return state.foundation.stacks.map((foundation, index) => <Foundation key={index} model={foundation} index={index} />);
    };
    
    render() {
        const model = this.props.model;
        const { business } = this.context;
        return (
            <div key={this.props.index}>
                <StackBase
                    suggested={model.suggestion && !model.stack.length}
                    blink={model.blinkFor}
                    onClick={() => business.clickFoundation(null, null, this.props.index)}
                    visible={!model.stack.length}
                >
                    <div className={"align-center foundation-base suit-" + model.icon}>{model.icon}</div>
                </StackBase>
                {model.stack.map((card, index) => (
                    <Card
                        key={index}
                        model={card}
                        blink={model.blinkFor}
                        isSuggested={model.suggestion && model.stack.length - 1 == index}
                        onClick={(c, p) => business.clickFoundation(c, p, this.props.index)}
                    />
                ))}
                <Hand
                    parent={"foundation-" + this.props.index}
                    onClick={(c, p) => business.clickFoundation(model.stack[model.stack.length - 1], p, this.props.index)}
                    stack={model.stack}
                />
            </div>
        );
    }
}
