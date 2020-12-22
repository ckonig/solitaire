import "./Style/App.css";
import "./Style/UI.css";

import { AppState } from "../Common";
import BoardWrap from "./Game/BoardWrap";
import Deck from "../Model/Deck/Deck";
import { PauseProvider } from "./PauseContext";
import React from "react";
import StartScreen from "./UI/StartScreen/StartScreen";

const SplitScreen = () => {
    const [paused, setPaused] = React.useState<boolean>(false);
    const defaultState = { mode: "splitscreen", inputMode: "gamepad", paused, setPaused };
    const [appState, setAppState] = React.useState<AppState>(defaultState);
    const [started, setStarted] = React.useState<number>(0);
    //@todo add parent for keyboard navigation
    const start = (settings: AppState) => {
        setStarted(Date.now());
        setAppState({
            ...settings,
            initialized: true,
        });
    };
    const restart = () => setAppState(defaultState);
    const deck = new Deck().shuffle();
    //@todo special StartScreen for SplitScreen settings
    return !appState.initialized ? (
        <StartScreen initialState={appState} start={start} />
    ) : (
        <PauseProvider started={started}>
            <div className="game-layout-container">
                <BoardWrap settings={appState} restart={restart} deck={deck.copy()} mode="splitscreen" />
                <BoardWrap settings={{ ...appState, inputMode: "keyboard" }} restart={restart} deck={deck.copy()} mode="splitscreen" />
            </div>
        </PauseProvider>
    );
};
export default SplitScreen;
