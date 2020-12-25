import "./View/Style/App.css";
import "./View/Style/UI.css";

import { AppState, StartScreenState } from "./Common";
import GameModes, { GameMode } from "./View/GameModes";

import BoardWrap from "./View/Game/BoardWrap";
import Deck from "./Model/Deck/Deck";
import DifficultyOptions from "./View/UI/StartScreen/DifficultyOptions";
import { PauseProvider } from "./View/PauseContext";
import React from "react";
import StartMenu from "./View/StartMenu";

const App = () => {
    const [started, setStarted] = React.useState<number>(0);
    const [paused, setPaused] = React.useState<boolean>(false);
    const defaultState = { gameMode: GameModes.CUSTOM, inputMode: "mouse", paused, setPaused, initialized: false };
    const [appState, setAppState] = React.useState<AppState>(defaultState);
    
    const restart = () => {
        setAppState(defaultState);
    };

    const deck = new Deck().shuffle();
    const start = (gameMode: GameMode, state: StartScreenState) => {
        deck.shuffle();
        const settings = {
            ...appState,
            ...DifficultyOptions[state.difficultySettings].settings,
            ...state.ratingSettings,
            ...state.entropySettings,
            quickDeal: state.quickDeal,
            gameMode: gameMode,
            initialized: true,
        };
        //@todo more clearly separate different states between StartScreen & Appstate
        setAppState(settings);
        setStarted(Date.now());
    };

    if (appState.initialized) {
        let board = null;
        if (appState.gameMode.boardMode == "singleplayer") {
            board = (
                <div className="game-layout-container singleplayer">
                    <BoardWrap player="1" settings={appState} restart={restart} deck={deck} />
                </div>
            );
        }
        if (appState.gameMode.boardMode == "splitscreen") {
            board = (
                <div className="game-layout-container splitscreen">
                    <BoardWrap player="1" settings={{ ...appState, inputMode: "gamepad" }} restart={restart} deck={deck.copy()} />
                    <BoardWrap player="2" settings={{ ...appState, inputMode: "keyboard" }} restart={restart} deck={deck.copy()} />
                </div>
            );
        }
        return <PauseProvider started={started}>{board}</PauseProvider>;
    }

    return <StartMenu start={start} />;
};
export default App;
