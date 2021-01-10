import Card from "./Card";
import GlobalContext from "../Context";
import PauseContext from "../PauseContext";
import React from "react";
import StackBase from "./StackBase";
import useBlinkEffect from "./useBlinkEffect";
import usePrevious from "./usePrevious";

const Renderer = (props: { length: number; paused: boolean; started: number }) => {
    const context = React.useContext(GlobalContext);

    const { length, started, paused } = props;
    const previous = usePrevious({ length, paused, started });
    React.useEffect(() => {
        let timeout: any = null;
        if (
            context &&
            context.state &&
            context.state.settings.launchSettings.speed &&
            started &&
            !paused &&
            previous &&
            (previous?.length != length || previous?.started != started || previous?.paused != paused)
        ) {
            timeout = setTimeout(() => {
                context.updateContext((state) => {
                    if (
                        length == state.stock.stack.length &&
                        state.stock.passes > 0 &&
                        (state.stock.stack.length || state.waste.stack.length)
                    ) {
                        if (state.hand.isFromWaste()) {
                            state.waste.putDownHand();
                        }
                        if (state.stock.stack.length) {
                            state.waste.addAll(state.stock.popTop());
                        } else if (state.stock.canRecycle()) {
                            state.stock.recycle(state.waste.recycle());
                        }
                    }
                });
            }, 10000);
        }
        return () => clearTimeout(timeout);
    }, [length, paused, started]);

    if (!context || !context.state) return null;

    return (
        <div className="board-field stock">
            <StackBase model={context.state.stock} />
            {context.state.stock.stack.map((card, index) => (
                <Card
                    key={index}
                    model={card}
                    offsetTop={(index / 2) * -1}
                    zIndex={index}
                    blink={context?.state?.stock.blinkFor}
                    isSuggested={context?.state?.stock.suggestion && index == context.state.stock.stack.length - 1}
                />
            ))}
        </div>
    );
};

const Stock = () => {
    const { state } = React.useContext(GlobalContext);
    if (!state) return null;
    useBlinkEffect((model) => model.stock);
    const pause = React.useContext(PauseContext);
    const { paused, started } = pause.state;
    return <Renderer length={state.stock.stack.length} paused={paused} started={started} />;
};

export default Stock;
