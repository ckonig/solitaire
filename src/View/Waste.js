import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import Hand from "./Hand";
import React from "react";
import StackBase from "./StackBase";

export default class Waste extends BlinkingComponent {
    render() {
        const props = this.props;
        return (
            <div>
                <StackBase
                    blink={props.model.blinkFor}
                    onClick={() => props.onClick(null, null)}
                    suggested={props.model.suggestion && !props.model.stack.length}
                    visible={!props.model.stack.length}
                />
                {props.model.stack.map((card, index) => (
                    <Card
                        model={card}
                        shadowOffsetX={-4}
                        shadowOffsetY={-3}
                        offsetTop={(index / 2) * -1}
                        key={index}
                        blink={props.model.blinkFor}
                        isSuggested={props.model.suggestion}
                        onClick={(c, p) => props.onClick(c, p)}
                    />
                ))}
                <Hand
                    settings={props.model.settings}
                    shadowOffsetX={-4}
                    shadowOffsetY={-3}
                    offsetTop={(props.model.stack.length / 2) * -1}
                    parent="waste"
                    onClick={props.onClick}
                    model={props.hand}
                    stack={props.model.stack}
                />
            </div>
        );
    }
}
