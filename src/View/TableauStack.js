import Card from "./Card";
import React from "react";
import StackBase from "./StackBase";
import TouchHand from "./TouchHand";

export default function TableauStack(props) {
    let offset = 0;
    const getOffset = (index) => {
        let i = 0;
        while (i <= index) {
            if (props.model.stack[i] && !props.model.stack[i].isHidden) {
                offset = i * 12 + (index - i) * 24;
                return offset;
            }
            i++;
        }
        offset = index * 12;
        return offset;
    };

    return (
        <div>
            <StackBase blink={props.model.blinkFor} onClick={() => props.onClick(null, "tableau-" + props.index)} />
            {props.model.stack.map((card, index) => (
                <Card
                    model={card}
                    key={"tsc" + index}
                    blink={props.model.blinkFor}
                    offsetTop={getOffset(index)}
                    canUncover={index == props.model.stack.length - 1}
                    onClick={(c) => props.onClick(c, "tableau-" + props.index)}
                />
            ))}
            <TouchHand
                parent={"tableau-" + props.index}
                hand={props.hand}
                offset={getOffset(props.model.stack.length)}
                onClick={() => props.onClick(props.model.stack[props.model.stack.length - 1], "tableau-" + props.index)}
            />
        </div>
    );
}
    