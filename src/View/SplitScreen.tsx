import "./Style/App.css";
import "./Style/UI.css";

import { AppState } from "../Common";
import BoardWrap from "./Game/BoardWrap";
import Deck from "../Model/Deck/Deck";
import React from "react";
import StartScreen from "./UI/StartScreen/StartScreen";

const SplitScreen = () => {
    const defaultState = { mode: "splitscreen", inputMode: "gamepad" };
    const [appState, setAppState] = React.useState<AppState>(defaultState);
    //@todo add parent for keyboard navigation
    const start = (settings: AppState) =>
        setAppState({
            ...settings,
            initialized: true,
        });
    const restart = () => setAppState(defaultState);
    const deck = new Deck().shuffle();
    //@todo special StartScreen for SplitScreen settings
    return !appState.initialized ? (
        <StartScreen initialState={appState} start={start} />
    ) : (
        <div className="game-layout-container">
            <BoardWrap settings={appState} restart={restart} deck={deck.copy()} mode="splitscreen" />
            <BoardWrap settings={{ ...appState, inputMode: "keyboard" }} restart={restart} deck={deck.copy()} mode="splitscreen" />
        </div>
    );
};
export default SplitScreen;
