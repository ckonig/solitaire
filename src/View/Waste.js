import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
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
                    <Card model={card} key={index} blink={props.model.blinkFor} onClick={(c) => props.onClick(c)} />
                ))}
                <TouchHand parent="waste" hand={props.hand} onClick={(c) => props.onClick(c, "waste")} />
            </div>
        );
    }
}
