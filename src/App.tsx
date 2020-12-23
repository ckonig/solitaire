import "./View/Style/App.css";
import "./View/Style/UI.css";

import { AppState, StartScreenState } from "./Common";
import GameModes, { GameMode } from "./View/GameModes";

import BoardWrap from "./View/Game/BoardWrap";
import Controls from "./View/UI/StartScreen/Controls";
import Deck from "./Model/Deck/Deck";
import Difficulty from "./View/UI/StartScreen/Difficulty";
import DifficultyOptions from "./View/UI/StartScreen/DifficultyOptions";
import MenuButton from "./View/UI/Menu/MenuButton";
import MenuTitle from "./View/UI/Menu/MenuTitle";
import { PauseProvider } from "./View/PauseContext";
import { Provider } from "./View/UI/StartScreen/Context";
import QuickStart from "./View/UI/StartScreen/QuickStart";
import Rating from "./View/UI/StartScreen/Rating";
import RatingPresets from "./View/UI/StartScreen/RatingOptions";
import React from "react";
import TouchDetector from "./View/UI/StartScreen/TouchDetector";
import VerticalMenu from "./View/UI/Menu/VerticalMenu";

const App = () => {
    const [started, setStarted] = React.useState<number>(0);
    const [paused, setPaused] = React.useState<boolean>(false);
    const defaultState = { gameMode: "singleplayer", inputMode: "mouse", paused, setPaused, initialized: false };
    const [appState, setAppState] = React.useState<AppState>(defaultState);
    const [mainMenu, setMainMenu] = React.useState<GameMode>(GameModes.QUICK);
    const toggleMainMenu = (val: GameMode) => {
        if (mainMenu.key !== val.key) {
            setMainMenu(val);
            if (!val.autoConfig) {
                setScreen("rating");
            }
        } else {
            setMainMenu(GameModes.QUICK);
            setScreen("");
        }
    };
    const [screen, setScreen] = React.useState<String>("");
    const [state, setState] = React.useState<StartScreenState>({
        ratingSettings: { ...RatingPresets.all[1].settings },
        difficultySettings: 1,
        ratingPreset: 1,
        isTouch: TouchDetector(),
    });
    const restart = () => {
        setAppState(defaultState);
    };

    const deck = new Deck().shuffle();
    const start = () => {
        deck.shuffle();
        const settings = {
            ...appState,
            ...DifficultyOptions[state.difficultySettings].settings,
            ...state.ratingSettings,
            isTouch: state.isTouch,
            gameMode: mainMenu.boardMode,
            initialized: true,
        };
        setAppState(settings);
        setStarted(Date.now());
    };

    const getScreen = () => {
        switch (screen) {
            case "rating":
                return <Rating head={mainMenu.title} />;
            case "difficulty":
                return <Difficulty head={mainMenu.title} />;
            case "settings":
                return <QuickStart head={mainMenu.title} />;
            case "controls":
                return <Controls head={mainMenu.title} />;
            default:
                return null;
        }
    };

    if (appState.initialized) {
        let board = null;
        if (mainMenu.boardMode == "singleplayer") {
            board = (
                <div className="game-layout-container singleplayer">
                    <BoardWrap player="1" settings={appState} restart={restart} deck={deck} />
                </div>
            );
        }
        if (mainMenu.boardMode == "splitscreen") {
            board = (
                <div className="game-layout-container splitscreen">
                    <BoardWrap player="1" settings={appState} restart={restart} deck={deck.copy()} />
                    <BoardWrap player="2" settings={{ ...appState, inputMode: "keyboard" }} restart={restart} deck={deck.copy()} />
                </div>
            );
        }
        return <PauseProvider started={started}>{board}</PauseProvider>;
    }

    const startButton = () => {
        if (mainMenu.key == GameModes.CUSTOM.key) {
            return <MenuButton icon="🎲" title="Start Custom" onClick={start} blink={true} />;
        }
        if (mainMenu.key == GameModes.VERSUS.key) {
            return <MenuButton icon="🎲" title="Start Versus" onClick={start} blink={true} />;
        }
        return <MenuButton icon="🎲" title="Quick Start" onClick={start} blink={true} />;
    };

    return (
        <Provider value={{ state, setState }}>
            <VerticalMenu>
                <MenuTitle label="Solitaire" />
                {startButton()}
                <MenuButton
                    toggled={mainMenu.key == GameModes.CUSTOM.key}
                    icon="⚙️"
                    title="Custom Game"
                    onClick={() => toggleMainMenu(GameModes.CUSTOM)}
                >
                    <MenuButton active={screen == "rating"} icon="🎲" title="Rating" onClick={() => setScreen("rating")} />
                    <MenuButton active={screen == "difficulty"} icon="⚙️" title="Difficulty" onClick={() => setScreen("difficulty")} />
                    <MenuButton active={screen == "settings"} icon="🏆" title="Settings" onClick={() => setScreen("settings")} />
                </MenuButton>
                <MenuButton
                    toggled={mainMenu.key == GameModes.VERSUS.key}
                    icon="🏆"
                    title="Versus"
                    onClick={() => toggleMainMenu(GameModes.VERSUS)}
                >
                    <MenuButton active={screen == "rating"} icon="🎲" title="Rating" onClick={() => setScreen("rating")} />
                    <MenuButton active={screen == "difficulty"} icon="⚙️" title="Difficulty" onClick={() => setScreen("difficulty")} />
                    <MenuButton active={screen == "settings"} icon="🏆" title="Settings" onClick={() => setScreen("settings")} />
                    <MenuButton active={screen == "controls"} icon="🎮" title="Controls" onClick={() => setScreen("controls")} />
                </MenuButton>
            </VerticalMenu>
            {screen && (
                <div className="startscreen-layout">
                    <div className="startscreen-jail">{getScreen()}</div>
                </div>
            )}
        </Provider>
    );
};
export default App;
