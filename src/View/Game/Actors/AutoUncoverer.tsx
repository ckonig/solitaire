import React from "react";
import useGameContext from "../../Context/GameContext";
import useGlobalContext from "../../GlobalContext";

const Uncoverer = () => {
    const { state, updateGameContext } = useGlobalContext();
    React.useEffect(() => {
        if (!state.hand.currentCard()) {
            state.tableau.stacks.forEach((stack) => {
                if (stack.getTop() && stack.getTop().isHidden && stack.getTop().canClick()) {
                    updateGameContext(stack.getTop().onClick({ isKeyboard: true }));
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.token]);
    return null;
};

const AutoUncoverer = () => {
    const { state } = useGlobalContext();
    const { gameState } = useGameContext();
    return !!state.settings.launchSettings.autoUncover && !!gameState.started ? <Uncoverer /> : null;
};

export default AutoUncoverer;
