import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import Hand from "./Hand";
import React from "react";
import StackBase from "./StackBase";

export default class Waste extends BlinkingComponent {
    constructor() {
        super((s) => s.waste);
    }

    render() {
        const { state } = this.context;
        const getOffset = (index) => {
            if (state.settings.launchSettings.drawMode == "single") {
                return 0;
            }
            const length =
                state.waste.settings.mouseMode == "remain-on-stack" && state.hand.isHoldingCard() && state.hand.isFromWaste()
                    ? state.waste.stack.length + 1
                    : state.waste.stack.length;
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
                    blink={state.waste.blinkFor}
                    onClick={() => state.waste.onClick(null, null)}
                    suggested={state.waste.suggestion && !state.waste.stack.length}
                    visible={!state.waste.stack.length}
                />
                {state.waste.stack.map((card, index) => (
                    <Card
                        key={index}
                        model={card}
                        offsetTop={(index / 2) * -1}
                        offsetLeft={getOffset(index)}
                        blink={state.waste.blinkFor}
                        isSuggested={state.waste.suggestion && index == state.waste.stack.length - 1}
                        onClick={(c, p) => state.waste.onClick(c, p)}
                    />
                ))}
                <Hand
                    offsetTop={(state.waste.stack.length / 2) * -1}
                    offsetLeft={getOffset(state.waste.stack.length)}
                    parent="waste"
                    onClick={state.waste.onClick}
                    stack={state.waste.stack}
                />
            </div>
        );
    }
}