import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import GlobalContext from "./Context";
import Hand from "./Hand";
import React from "react";
import StackBase from "./StackBase";

export default class Foundation extends BlinkingComponent {
    static Stacks = () => {
        const {state, business} = React.useContext(GlobalContext);
        return state.foundation.stacks.map((foundation, index) => (
            <Foundation
                hand={state.hand}
                key={index}
                model={foundation}
                stackindex={index}
                settings={state.settings}
                onClick={(c, p) => business.clickFoundation(c, p, index)}
            />
        ));
    };
    render() {
        const model = this.props.model;
        const stackindex = this.props.stackindex;
        return (
            <div key={stackindex}>
                <StackBase
                    suggested={model.suggestion && !model.stack.length}
                    blink={model.blinkFor}
                    onClick={() => this.props.onClick(null, null, stackindex)}
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
                        onClick={(c, p) => this.props.onClick(c, p, stackindex)}
                    />
                ))}
                <Hand
                    settings={this.props.settings}
                    parent={"foundation-" + stackindex}
                    onClick={(c, p) => this.props.onClick(model.stack[model.stack.length - 1], p, stackindex)}
                    model={this.props.hand}
                    stack={model.stack}
                />
            </div>
        );
    }
}
