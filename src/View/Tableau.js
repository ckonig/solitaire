import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import MouseHand from "./MouseHand";
import React from "react";
import StackBase from "./StackBase";
import TouchHand from "./TouchHand";

export default class Tableau extends BlinkingComponent {
    render() {
        const props = this.props;
        let offset = 0;
        const getOffset = (index) => {
            for (let i = 0; i <= index; i++) {
                if (props.model.stack[i] && !props.model.stack[i].isHidden) {
                    offset = i * 12 + (index - i) * 24;
                    return offset;
                }
            }
            offset = index * 12;
            return offset;
        };

        return (
            <div>
                <StackBase blink={props.model.blinkFor} onClick={() => props.onClick(null, "tableau-" + props.index)} visible={!props.model.stack.length}  />
                {props.model.stack.map((card, index) => (
                    <Card
                        model={card}
                        key={index}
                        blink={props.model.blinkFor}
                        entropy={4}
                        shadowOffsetX={(4 - 7 + props.index)*2}
                        offsetTop={getOffset(index)}
                        onClick={props.onClick}
                    />
                ))}
                <TouchHand
                    parent={"tableau-" + props.index}
                    hand={props.hand}
                    offset={getOffset(props.model.stack.length)}
                    onClick={() => props.onClick(props.model.stack[props.model.stack.length - 1])}
                />
                <MouseHand
                    parent={"tableau-" + props.index}
                    hand={props.hand}
                    stack={props.hand.stack}
                    putBack={() => props.onClick(props.model.stack[props.model.stack.length - 1], props.model.stack.length - 1)}
                />
            </div>
        );
    }
}
