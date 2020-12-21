import "./Style/App.css";
import "./Style/UI.css";

import { AppState } from "../Common";
import BoardWrap from "./Game/BoardWrap";
import Deck from "../Model/Deck/Deck";
import React from "react";
import StartScreen from "./UI/StartScreen/StartScreen";

const SinglePlayer = () => {
    const defaultState = { mode: "singleplayer", inputMode: "mouse" };
    const [appState, setAppState] = React.useState<AppState>(defaultState);
    //@todo add parent for keyboard navigation
    const start = (settings: AppState) =>
        setAppState({
            ...settings,
            initialized: true,
        });
    const restart = () => setAppState(defaultState);
    const deck = new Deck().shuffle();
    return !appState.initialized ? (
        <StartScreen initialState={appState} start={start} />
    ) : (
        <BoardWrap settings={appState} restart={restart} deck={deck} mode="singleplayer" />
    );
};
export default SinglePlayer;
