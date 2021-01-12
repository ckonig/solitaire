import GameContext from "./GameContext";
import React from "react";
import useGlobalContext from "../GlobalContext";

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
    }, [state.token]);
    return null;
};

const AutoUncoverer = () => {
    const { state } = useGlobalContext();
    const { gameState } = React.useContext(GameContext);
    return !!state.settings.launchSettings.autoUncover && !!gameState.started && <Uncoverer /> || null;
};

export default AutoUncoverer;
