import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import Hand from "./Hand";
import React from "react";
import StackBase from "./StackBase";

export default class Waste extends BlinkingComponent {
    render() {
        const props = this.props;

        const getOffset = (index) => {
            if (props.settings.drawMode == "single") {
                return 0;
            }
            const length =
                props.model.settings.mouseMode == "remain-on-stack" && props.hand.isHoldingCard() && props.hand.source == "waste"
                    ? props.model.stack.length + 1
                    : props.model.stack.length;
            let additionalOffset = 2;
            if (length == 2) {
                additionalOffset = 1;
            }

            if (length == 1) {
                additionalOffset = 0;
            }

            return ((index - length - 2) % 3) + additionalOffset;
        };

        return (
            <div>
                <StackBase
                    blink={props.model.blinkFor}
                    onClick={() => props.onClick(null, null)}
                    suggested={props.model.suggestion && !props.model.stack.length}
                    visible={!props.model.stack.length}
                />
                {props.model.stack.map((card, index) => (
                    <Card
                        model={card}
                        shadowOffsetX={-4}
                        shadowOffsetY={-3}
                        offsetTop={(index / 2) * -1}
                        offsetLeft={getOffset(index)}
                        key={index}
                        blink={props.model.blinkFor}
                        isSuggested={props.model.suggestion && index == props.model.stack.length - 1}
                        onClick={(c, p) => props.onClick(c, p)}
                    />
                ))}
                <Hand
                    settings={props.model.settings}
                    shadowOffsetX={-4}
                    shadowOffsetY={-3}
                    offsetTop={(props.model.stack.length / 2) * -1}
                    offsetLeft={((props.model.stack.length - 1 - props.model.stack.length - 2) % 3) + 2}
                    parent="waste"
                    onClick={props.onClick}
                    model={props.hand}
                    stack={props.model.stack}
                />
            </div>
        );
    }
}
