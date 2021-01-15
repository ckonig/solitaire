import React from "react";
import { useBoardContext } from "./BoardContext";
import useGameContext from "./GameContext";
import useGlobalContext from "../GlobalContext";

const Detector = () => {
    const { state } = useGlobalContext();

    React.useEffect(() => {
        const { win } = useGameContext();
        const { player } = useBoardContext();
        if (!state.hand.currentCard() && state.foundation.countCards() === 52) {
            win(player);
        }
    }, [state.token, state.foundation, state.hand]);
    return null;
};

const WinDetector = () => {
    const { state } = useGlobalContext();
    const { gameState } = useGameContext();
    return (!gameState.isEnded && !!state.settings.launchSettings.autoUncover && !!gameState.started && <Detector />) || null;
};

export default WinDetector;
