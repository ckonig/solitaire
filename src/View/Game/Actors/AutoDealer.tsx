import React from "react";
import useGameContext from "../../Context/GameContext";
import useGlobalContext from "../../GlobalContext";
import usePauseContext from "../../Context/PauseContext";
import { usePrevious } from "react-use";

const AutoDealerRenderer = (props: { length: number; paused: boolean; started: number }) => {
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

    return null;
};

const AutoDealer = () => {
    const { state } = useGlobalContext();
    const pause = usePauseContext();
    const { gameState } = useGameContext();
    const { paused } = pause.state;
    return <AutoDealerRenderer length={state.stock.stack.length} paused={paused} started={gameState.started} />;
};

export default AutoDealer;
