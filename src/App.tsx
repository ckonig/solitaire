import "./View/Style/App.css";
import "./View/Style/UI.css";

import { AppState } from "./Common";
import BoardWrap from "./View/Game/BoardWrap";
import Deck from "./Model/Deck/Deck";
import GameModes from "./View/GameModes";
import MenuButton from "./View/UI/Menu/MenuButton";
import MenuTitle from "./View/UI/Menu/MenuTitle";
import { PauseProvider } from "./View/PauseContext";
import React from "react";
import StartScreen from "./View/UI/StartScreen/StartScreen";
import VerticalMenu from "./View/UI/Menu/VerticalMenu";

const App = () => {
    const [mainMenu, setMainMenu] = React.useState<string>("");
    const [started, setStarted] = React.useState<number>(0);
    const [paused, setPaused] = React.useState<boolean>(false);
    const defaultState = { gameMode: "singleplayer", inputMode: "mouse", paused, setPaused, initialized: false };

    const [appState, setAppState] = React.useState<AppState>(defaultState);
    const restart = () => {
        setAppState(defaultState);
        if (mainMenu == GameModes.QUICK) {
            setMainMenu("");
        }
    };

    const deck = new Deck().shuffle();
    const start = (settings: AppState) => {
        deck.shuffle();
        setAppState({
            ...settings,
            gameMode: GameModes.getBoardMode(mainMenu),
            initialized: true,
        });
        setStarted(Date.now());
    };

    const getScreen = () => {
        switch (mainMenu) {
            case GameModes.QUICK:
                return <StartScreen title={GameModes.getTitle(mainMenu)} initialState={appState} start={start} autoConfig={true} />;
            case GameModes.CUSTOM:
                return <StartScreen title={GameModes.getTitle(mainMenu)} initialState={appState} start={start} autoConfig={false} />;
            case GameModes.VERSUS:
                return <StartScreen title={GameModes.getTitle(mainMenu)} initialState={appState} start={start} autoConfig={false} />;
            default:
                return null;
        }
    };

    const getBoard = () => {
        switch (mainMenu) {
            case GameModes.QUICK:
            case GameModes.CUSTOM:
                return (
                    <div className="game-layout-container singleplayer">
                        <BoardWrap player="1" settings={appState} restart={restart} deck={deck} />
                    </div>
                );
            case GameModes.VERSUS:
                return (
                    <div className="game-layout-container splitscreen">
                        <BoardWrap player="1" settings={appState} restart={restart} deck={deck.copy()} />
                        <BoardWrap player="2" settings={{ ...appState, inputMode: "keyboard" }} restart={restart} deck={deck.copy()} />
                    </div>
                );
            default:
                return null;
        }
    };

    if (appState.initialized) {
        return <PauseProvider started={started}>{getBoard()}</PauseProvider>;
    }

    return (
        <>
            <VerticalMenu>
                <MenuTitle label="Solitaire" />
                <MenuButton icon="🎲" title="Quick Start" onClick={() => setMainMenu(GameModes.QUICK)} blink={true} />
                <MenuButton icon="⚙️" title="Custom Game" onClick={() => setMainMenu(GameModes.CUSTOM)} />
                <MenuButton icon="🏆" title="Versus" onClick={() => setMainMenu(GameModes.VERSUS)} />
            </VerticalMenu>
            <div>{getScreen()}</div>
        </>
    );
};
export default App;
