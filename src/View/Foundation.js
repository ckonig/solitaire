import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import MouseHand from "./MouseHand";
import React from "react";
import StackBase from "./StackBase";
import TouchHand from "./TouchHand";

export default class Foundation extends BlinkingComponent {
    render() {
        const props = this.props;
        return (
            <div>
                <StackBase blink={props.model.blinkFor} onClick={() => props.onClick()}>
                    <div className={"align-center foundation-base suit-" + props.model.icon}>{props.model.icon}</div>
                </StackBase>
                {props.model.stack.map((card, index) => (
                    <Card model={card} key={index} shadowOffset={(props.index)*2} blink={props.model.blinkFor} entropy={6} onClick={props.onClick} />
                ))}
                <TouchHand
                    parent={"foundation-" + props.index}
                    hand={props.hand}
                    onClick={() => props.onClick(props.model.stack[props.model.stack.length - 1])}
                />
                <MouseHand
                    parent={"foundation-" + props.index}
                    hand={props.hand}
                    stack={props.hand.stack}
                    putBack={() => props.onClick(props.model.stack[props.model.stack.length - 1], props.model.stack.length - 1)}
                />
            </div>
        );
    }
}
