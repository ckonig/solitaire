import Card from "./Card";
import React from "react";
import StackBase from "./StackBase";
import TouchHand from "./TouchHand";

export default function Waste(props) {
    return (
        <div>
            <StackBase blink={props.model.blinkFor} onClick={props.onClick} />
            {props.model.stack.map((card, index) => (
                <div className="stack-base" key={"wc" + index}>
                    <Card type={card.type} face={card.face} blink={props.model.blinkFor} source="waste" onClick={(c) => props.onClick(c)} />
                </div>
            ))}
            <TouchHand parent="waste" hand={props.hand} onClick={(c) => props.onClick(c, "waste")} />
        </div>
    );
}
