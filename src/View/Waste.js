import Card from "./Card";
import React from "react";
import StackBase from "./StackBase";
import TouchHand from "./TouchHand";

export default function Waste(props) {
    return (
        <div>
            <StackBase blink={props.model.blinkFor} onClick={props.onClick} />
            {props.model.stack.map((card, index) => (
                <Card
                    model={card}
                    key={"wc" + index}
                    blink={props.model.blinkFor}
                    canUncover={index == props.model.stack.length - 1}
                    onClick={(c) => props.onClick(c)}
                />
            ))}
            <TouchHand parent="waste" hand={props.hand} onClick={(c) => props.onClick(c, "waste")} />
        </div>
    );
}
