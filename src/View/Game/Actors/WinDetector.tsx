import React from "react";
import { useBoardContext } from "../../Context/BoardContext";
import useGameContext from "../../Context/GameContext";
import useGlobalContext from "../../GlobalContext";

const Detector = () => {
    const { state } = useGlobalContext();
    const { win } = useGameContext();
    const { player } = useBoardContext();

    React.useEffect(() => {
        if (!state.hand.currentCard() && state.foundation.countCards() === 52) {
            win(player);
        }
    }, [state.token, state.foundation, state.hand, player, win]);
    return null;
};

const WinDetector = () => {
    const { state } = useGlobalContext();
    const { gameState } = useGameContext();
    return (!gameState.isEnded && !!state.settings.launchSettings.autoUncover && !!gameState.started && <Detector />) || null;
};

export default WinDetector;
