import Card from "./Card";
import React from "react";
import StackBase from "./StackBase";
import useBlinkEffect from "./useBlinkEffect";
import { useDrop } from "react-dnd";
import useGlobalContext from "../GlobalContext";

const Waste = () => {
    const { state, updateGameContext } = useGlobalContext();
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

    const [, _drop] = useDrop({
        accept: "card",
        // eslint-disable-next-line no-unused-vars
        canDrop: () => {
            const accepts = state.hand.isFromWaste();
            //setAccepting(accepts);
            return accepts;
        },
        drop: () => {
            updateGameContext(state.waste.clickEmpty({ isKeyBoard: false }));
        },
    });

    const cards = state?.hand.source == state.waste.source ? [...state.waste.stack, ...state.hand.stack] : [...state.waste.stack];

    return (
        <div className="board-field" ref={_drop}>
            <StackBase model={state.waste} />
            <Card
                index={0}
                key={0}
                models={cards}
                offsetTop={(index) => (index / 2) * -1}
                offsetLeft={(index) => getOffset(index)}
                blink={state.waste.blinkFor}
                isSuggested={(index) => state.waste.suggestion && index == state.waste.stack.length - 1}
                isSelected={(index) => index > state.waste.stack.length - 1}
            />
        </div>
    );
};
export default Waste;
