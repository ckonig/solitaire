import "./Style/App.css";
import "./Style/UI.css";

import { AppState } from "../Common";
import BoardWrap from "./Game/BoardWrap";
import Deck from "../Model/Deck/Deck";
import { PauseProvider } from "./PauseContext";
import React from "react";
import StartScreen from "./UI/StartScreen/StartScreen";

const SinglePlayer = () => {
    const defaultState = { mode: "singleplayer", inputMode: "mouse" };
    const [appState, setAppState] = React.useState<AppState>(defaultState);
    const [started, setStarted] = React.useState<number>(0);
    const start = (settings: AppState) => {
        setStarted(Date.now());
        setAppState({
            ...settings,
            initialized: true,
        });
    };
    const restart = () => setAppState(defaultState);
    const deck = new Deck().shuffle();
    return !appState.initialized ? (
        <StartScreen initialState={appState} start={start} />
    ) : (
        <PauseProvider started={started}>
            <BoardWrap settings={appState} restart={restart} deck={deck} mode="singleplayer" />
        </PauseProvider>
    );
};
export default SinglePlayer;
