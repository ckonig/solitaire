import { AppState } from "../Common";
import BoardWrap from "./Game/BoardWrap";
import Deck from "../Model/Deck/Deck";
import React from "react";
import StartScreen from "./UI/StartScreen/StartScreen";

const getSinglePlayerBoard = (appState: AppState, restart: () => void, deck: Deck) => (
    <div className="game-layout-container singleplayer">
        <BoardWrap player="1" settings={appState} restart={restart} deck={deck} />
    </div>
);

const getSplitScreenBoard = (appState: AppState, restart: () => void, deck: Deck) => (
    <div className="game-layout-container splitscreen">
        <BoardWrap player="1" settings={appState} restart={restart} deck={deck.copy()} />
        <BoardWrap player="2" settings={{ ...appState, inputMode: "keyboard" }} restart={restart} deck={deck.copy()} />
    </div>
);

export interface GameMode {
    key: string;
    title: string;
    boardMode: string;
    getBoard: (appState: AppState, restart: () => void, deck: Deck) => any;
    getStartScreen: (appState: AppState, start: (settings: AppState) => void) => any;
}

const getQuickStartScreen = (appState: AppState, start: (settings: AppState) => void) => {
    return <StartScreen title={"Quick Game"} initialState={appState} start={start} autoConfig={true} />;
};
const getCustomStartScreen = (appState: AppState, start: (settings: AppState) => void) => (
    <StartScreen title={"Custom Game"} initialState={appState} start={start} autoConfig={false} />
);
const getVersusStartScreen = (appState: AppState, start: (settings: AppState) => void) => (
    <StartScreen title={"Versus"} initialState={appState} start={start} autoConfig={false} />
);

export default class GameModes {
    static QUICK: GameMode = {
        key: "QUICK",
        title: "Quick Game",
        boardMode: "singleplayer",
        getStartScreen: getQuickStartScreen,
        getBoard: getSinglePlayerBoard,
    };
    static CUSTOM: GameMode = {
        key: "CUSTOM",
        title: "Custom Game",
        boardMode: "singleplayer",
        getStartScreen: getCustomStartScreen,
        getBoard: getSinglePlayerBoard,
    };
    static VERSUS: GameMode = {
        key: "VERSUS",
        title: "Versus",
        boardMode: "splitscreen",
        getStartScreen: getVersusStartScreen,
        getBoard: getSplitScreenBoard,
    };
    static NULL: GameMode = {
        key: "",
        title: "",
        boardMode: "",
        getStartScreen: () => null,
        getBoard: () => null,
    };
}
