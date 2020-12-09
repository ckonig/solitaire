import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import Hand from "./Hand";
import React from "react";
import StackBase from "./StackBase";

export default class Foundation extends BlinkingComponent {
    static Stacks = (props) =>
        props.model.stacks.map((foundation, index) => (
            <Foundation
                hand={props.hand}
                key={index}
                model={foundation}
                stackindex={index}
                settings={props.settings}
                onClick={(c, p) => props.onClick(c, p, index)}
            />
        ));
    render() {
        const props = this.props;
        const model = this.props.model;
        const stackindex = this.props.stackindex;
        const settings = this.props.settings;
        return (
            <div key={stackindex}>
                <StackBase
                    suggested={model.suggestion && !model.stack.length}
                    blink={model.blinkFor}
                    onClick={() => props.onClick(null, null, stackindex)}
                    visible={!model.stack.length}
                >
                    <div className={"align-center foundation-base suit-" + model.icon}>{model.icon}</div>
                </StackBase>
                {model.stack.map((card, index) => (
                    <Card
                        model={card}
                        key={index}
                        shadowOffsetX={stackindex * 2}
                        shadowOffsetY={-3}
                        blink={model.blinkFor}
                        isSuggested={model.suggestion && model.stack.length - 1 == index}
                        onClick={(c, p) => props.onClick(c, p, stackindex)}
                    />
                ))}
                <Hand
                    settings={settings}
                    parent={"foundation-" + stackindex}
                    shadowOffsetX={stackindex * 2}
                    shadowOffsetY={-3}
                    onClick={(c, p) => props.onClick(model.stack[model.stack.length - 1], p, stackindex)}
                    model={props.hand}
                    stack={model.stack}
                />
            </div>
        );
    }
}
