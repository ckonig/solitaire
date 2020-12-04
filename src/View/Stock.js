import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import React from "react";
import StackBase from "./StackBase";

export default class Stock extends BlinkingComponent {
    render() {
        const props = this.props;
        return (
            <div>
                <StackBase blink={props.model.blinkFor} onClick={props.onClick} />
                {props.model.stack.map((card, index) => (
                    <Card model={card} key={index} blink={props.model.blinkFor} source="main" onClick={props.onClick} />
                ))}
            </div>
        );
    }
}
