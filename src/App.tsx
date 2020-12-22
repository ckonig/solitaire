import "./View/Style/App.css";
import "./View/Style/UI.css";

import GameModes, { GameMode } from "./View/GameModes";

import { AppState } from "./Common";
import Deck from "./Model/Deck/Deck";
import MenuButton from "./View/UI/Menu/MenuButton";
import MenuTitle from "./View/UI/Menu/MenuTitle";
import { PauseProvider } from "./View/PauseContext";
import React from "react";
import VerticalMenu from "./View/UI/Menu/VerticalMenu";

const App = () => {
    const [mainMenu, setMainMenu] = React.useState<GameMode>(GameModes.NULL);
    const [started, setStarted] = React.useState<number>(0);
    const [paused, setPaused] = React.useState<boolean>(false);
    const defaultState = { gameMode: "singleplayer", inputMode: "mouse", paused, setPaused, initialized: false };

    const [appState, setAppState] = React.useState<AppState>(defaultState);
    const restart = () => {
        setAppState(defaultState);
        if (mainMenu.key == GameModes.QUICK.key) {
            setMainMenu(GameModes.NULL);
        }
    };

    const deck = new Deck().shuffle();
    const start = (settings: AppState) => {
        deck.shuffle();
        setAppState({
            ...settings,
            gameMode: mainMenu.boardMode,
            initialized: true,
        });
        setStarted(Date.now());
    };

    if (appState.initialized) {
        return <PauseProvider started={started}>{mainMenu.getBoard(appState, restart, deck)}</PauseProvider>;
    }

    return (
        <>
            <VerticalMenu>
                <MenuTitle label="Solitaire" />
                <MenuButton icon="🎲" title="Quick Start" onClick={() => setMainMenu(GameModes.QUICK)} blink={true} />
                <MenuButton icon="⚙️" title="Custom Game" onClick={() => setMainMenu(GameModes.CUSTOM)} />
                <MenuButton icon="🏆" title="Versus" onClick={() => setMainMenu(GameModes.VERSUS)} />
            </VerticalMenu>
            <div>{mainMenu.getStartScreen(appState, start)}</div>
        </>
    );
};
export default App;
