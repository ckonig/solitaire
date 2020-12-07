import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import MouseHand from "./MouseHand";
import React from "react";
import StackBase from "./StackBase";
import TouchHand from "./TouchHand";

export default class Waste extends BlinkingComponent {
    render() {
        const props = this.props;
        return (
            <div>
                <StackBase blink={props.model.blinkFor} onClick={props.onClick} />
                {props.model.stack.map((card, index) => (
                    <Card
                        model={card}
                        shadowOffsetX={-4}
                        shadowOffsetY={-3}
                        key={index}
                        blink={props.model.blinkFor}
                        onClick={(c) => props.onClick(c)}
                        entropy={6}
                    />
                ))}
                <TouchHand parent="waste" hand={props.hand} onClick={(c) => props.onClick(c, "waste")} />
                <MouseHand
                    parent={"waste"}
                    hand={props.hand}
                    stack={props.hand.stack}
                    putBack={() => props.onClick(props.model.stack[props.model.stack.length - 1], props.model.stack.length - 1)}
                />
            </div>
        );
    }
}
