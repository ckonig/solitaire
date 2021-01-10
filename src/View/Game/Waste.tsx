import Card from "./Card";
import CardModel from "../../Model/Deck/Card";
import GlobalContext from "../Context";
import Hand from "./Hand";
import React from "react";
import StackBase from "./StackBase";
import useBlinkEffect from "./useBlinkEffect";

const Waste = () => {
    const { state } = React.useContext(GlobalContext);
    if (!state) return null;
    useBlinkEffect((model) => model.waste);
    const getOffset = (index: number) => {
        if (state.settings.launchSettings.drawMode == "single") {
            return 0;
        }
        const length = state.hand.isHoldingCard() && state.hand.isFromWaste() ? state.waste.stack.length + 1 : state.waste.stack.length;
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
        <div className="board-field">
            <StackBase model={state.waste} />
            {state.waste.stack.map((card: CardModel, index: number) => (
                <Card
                    key={index}
                    model={card}
                    offsetTop={(index / 2) * -1}
                    offsetLeft={getOffset(index)}
                    blink={state.waste.blinkFor}
                    isSuggested={state.waste.suggestion && index == state.waste.stack.length - 1}
                />
            ))}
            <Hand
                offsetTop={(state.waste.stack.length / 2) * -1}
                offsetLeft={getOffset(state.waste.stack.length)}
                parentModel={state.waste}
            />
        </div>
    );
};
export default Waste;
