import { BoardContext } from "./BoardContext";
import GameContext from "./GameContext";
import React from "react";
import useGlobalContext from "../GlobalContext";

const Detector = () => {
    const { state } = useGlobalContext();
    const { win } = React.useContext(GameContext);
    const { player } = React.useContext(BoardContext);
    React.useEffect(() => {
        if (!state.hand.currentCard() && state.foundation.countCards() == 52) {
            win(player);
        }
    }, [state.token]);
    return null;
};

const WinDetector = () => {
    const { state } = useGlobalContext();
    const { gameState } = React.useContext(GameContext);
    return !gameState.isEnded && !!state.settings.launchSettings.autoUncover && !!gameState.started && <Detector /> || null;
};

export default WinDetector;
