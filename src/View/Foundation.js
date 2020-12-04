import Card from "./Card";
import React from "react";
import StackBase from "./StackBase";
import TouchHand from "./TouchHand";

export default function Foundation(props) {
    return (
        <div>
            <StackBase blink={props.model.blinkFor} onClick={() => props.onClick()}>
                <div className={"align-center foundation-base suit-" + props.model.icon}>{props.model.icon}</div>
            </StackBase>
            {props.model.stack.map((card, index) => (
                <Card
                    model={card}
                    key={"fc" + index}
                    blink={props.model.blinkFor}
                    canUncover={index == props.model.stack.length - 1}
                    onClick={(c) => props.onClick(c)}
                />
            ))}
            <TouchHand
                parent={"foundation-" + props.index}
                hand={props.hand}
                onClick={() => props.onClick(props.model.stack[props.model.stack.length - 1])}
            />
        </div>
    );
}
