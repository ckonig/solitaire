import Card from "./Card";
import React from "react";
import StackBase from "./StackBase";

export default function Stock(props) {
    return (
        <div>
            <StackBase blink={props.model.blinkFor} onClick={props.onClick} />
            {props.model.stack.map((card, index) => (
                <Card
                    model={card}
                    key={"sc" + index}
                    type={card.type}
                    face={card.face}
                    blink={props.model.blinkFor}
                    source="main"
                    isHidden={card.isHidden}
                    canUncover={index == props.model.stack.length - 1}
                    onClick={props.onClick}
                />
            ))}
        </div>
    );
}
