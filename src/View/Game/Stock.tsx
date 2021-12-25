import Card from "./Card";
import React from "react";
import StackBase from "./StackBase";
import useBlinkEffect from "./Hooks/useBlinkEffect";
import useGlobalContext from "../GlobalContext";

const Stock = () => {
    useBlinkEffect((model) => model.stock);
    const context = useGlobalContext();

    if (!context || !context.state) return null;

    return (
        <div className="board-field stock">
            <StackBase model={context.state.stock} />
            <Card
                index={0}
                key={0}
                models={context.state.stock.stack}
                offsetTop={(index) => (index / 2) * -1}
                zIndex={0}
                blink={context?.state?.stock.blinkFor}
                isSuggested={(index) => context?.state?.stock.suggestion && index === context.state.stock.stack.length - 1}
            />
        </div>
    );
};

export default Stock;
