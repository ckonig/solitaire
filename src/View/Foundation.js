import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import Hand from "./Hand";
import React from "react";
import StackBase from "./StackBase";

export default class Foundation extends BlinkingComponent {
    render() {
        const props = this.props;
        return (
            <div>
                <StackBase blink={props.model.blinkFor} onClick={() => props.onClick()} visible={!props.model.stack.length}>
                    <div className={"align-center foundation-base suit-" + props.model.icon}>{props.model.icon}</div>
                </StackBase>
                {props.model.stack.map((card, index) => (
                    <Card
                        model={card}
                        key={index}
                        shadowOffsetX={props.index * 2}
                        shadowOffsetY={-3}
                        blink={props.model.blinkFor}
                        onClick={props.onClick}
                    />
                ))}
                <Hand
                    settings={props.settings}
                    parent={"foundation-" + props.index}
                    shadowOffsetX={props.index * 2}
                    shadowOffsetY={-3}
                    onClick={(c, p) => props.onClick(props.model.stack[props.model.stack.length - 1], p)}
                    model={props.hand}
                    stack={props.model.stack}
                />
            </div>
        );
    }
}
