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
                    <Card
                        model={card}
                        key={index}
                        blink={props.model.blinkFor}
                        shadowOffsetX={-6}
                        shadowOffsetY={-3}
                        source="main"
                        entropy={6}
                        onClick={props.onClick}
                    />
                ))}
            </div>
        );
    }
}
