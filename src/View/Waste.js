import BlinkingContextComponent from "./BlinkingContextComponent";
import Card from "./Card";
import GlobalContext from "./Context";
import Hand from "./Hand";
import React from "react";
import StackBase from "./StackBase";

export default class Waste extends BlinkingContextComponent {
    constructor() {
        super((s) => s.waste);
    }
    static contextType = GlobalContext;
    render() {
        const { state, business } = this.context;

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
                    onClick={() => business.clickWaste(null, null)}
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
                        onClick={(c, p) => business.clickWaste(c, p)}
                    />
                ))}
                <Hand
                    settings={state.waste.settings}
                    offsetTop={(state.waste.stack.length / 2) * -1}
                    offsetLeft={getOffset(state.waste.stack.length)}
                    parent="waste"
                    onClick={business.clickWaste}
                    model={state.hand}
                    stack={state.waste.stack}
                />
            </div>
        );
    }
}
