import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import React from "react";
import StackBase from "./StackBase";

export default class Stock extends BlinkingComponent {
    render() {
        const props = this.props;
        return (
            <div>
                <StackBase blink={props.model.blinkFor} onClick={props.onClick} suggested={props.model.suggestion && !props.model.stack.length} visible={!props.model.stack.length}  />
                {props.model.stack.map((card, index) => (
                    <Card
                        model={card}
                        key={index}
                        offsetTop={index/2*-1}
                        blink={props.model.blinkFor}
                        shadowOffsetX={-6}
                        shadowOffsetY={-3}
                        isSuggested={props.model.suggestion && index == props.model.stack.length-1}
                        onClick={props.onClick}
                    />
                ))}
            </div>
        );
    }
}
