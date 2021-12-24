import Card from "./Card";
import React from "react";
import StackBase from "./StackBase";
import useBlinkEffect from "./Hooks/useBlinkEffect";
import useGameContext from "../Context/GameContext";
import useGlobalContext from "../GlobalContext";
import usePauseContext from "../Context/PauseContext";
import usePrevious from "./Hooks/usePrevious";

const Renderer = (props: { length: number; paused: boolean; started: number }) => {
    const context = useGlobalContext();
    const { length, started, paused } = props;
    const previous = usePrevious({ length, paused, started });
    React.useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;
        if (
            context.state.settings.launchSettings.speed &&
            started &&
            !paused &&
            previous &&
            (previous?.length !== length || previous?.started !== started || previous?.paused !== paused)
        ) {
            timeout = setTimeout(() => {
                context.updateContext((state) => {
                    if (
                        length === state.stock.stack.length &&
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
        return () => {
            timeout && clearTimeout(timeout);
        };
    }, [context, length, paused, previous, started]);

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

const Stock = () => {
    const { state } = useGlobalContext();
    useBlinkEffect((model) => model.stock);
    const pause = usePauseContext();
    const { gameState } = useGameContext();
    const { paused } = pause.state;
    return <Renderer length={state.stock.stack.length} paused={paused} started={gameState.started} />;
};

export default Stock;
