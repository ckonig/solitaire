import GameContext from "./GameContext";
import React from "react";
import useGlobalContext from "../GlobalContext";

const _AutoUncoverer = (props: { canUncover: boolean }) => {
    const [solving, setSolving] = React.useState(false);
    const { gameState } = React.useContext(GameContext);

    React.useEffect(() => {
        if (props.canUncover && gameState.started) {
            setSolving(true);
        }
    }, [props.canUncover, gameState]);
    const canSolve = solving;
    return !canSolve ? null : <Uncoverer />;
};

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
    return <_AutoUncoverer canUncover={!!state.settings.launchSettings.autoUncover} />;
};

export default AutoUncoverer;
