import "./View/Style/App.css";
import "./View/Style/UI.css";

import { AppState, StartScreenState } from "./Common";
import GameModes, { GameMode } from "./View/GameModes";

import BoardWrap from "./View/Game/BoardWrap";
import Deck from "./Model/Deck/Deck";
import DifficultyOptions from "./View/UI/StartScreen/DifficultyOptions";
import GamePad from "./View/Game/GamePad";
import Keyboard from "./View/Game/Keyboard";
import MenuButton from "./View/UI/Menu/MenuButton";
import MenuTitle from "./View/UI/Menu/MenuTitle";
import { PauseProvider } from "./View/PauseContext";
import { Provider } from "./View/UI/StartScreen/Context";
import RatingPresets from "./View/UI/StartScreen/RatingOptions";
import React from "react";
import Screen from "./View/UI/StartScreen/Screen";
import TouchDetector from "./View/UI/StartScreen/TouchDetector";
import VerticalMenu from "./View/UI/Menu/VerticalMenu";

interface IButton {
    getClickable: () => IButton[];
    updateMap: (x: number, y: number) => void;
    onClick: () => void;
}

class Button {
    isRoot: any;
    id: any;
    active: any;
    icon: any;
    title: any;
    onClick: () => void;
    blink: boolean;
    toggled: boolean;
    children: Button[];
    x: number;
    y: number;

    constructor() {
        this.isRoot = false;
        this.id = "not null";
        this.active = false;
        this.icon = "";
        this.title = "";
        this.onClick = () => {};
        this.blink = false;
        this.toggled = false;
        this.children = [];
        this.x = 0;
        this.y = 0;
    }
}

class MenuLeafButton extends Button implements IButton {
    constructor(id: string, icon: string, title: string) {
        super();
        this.id = id;
        this.icon = icon;
        this.title = title;
    }
    updateMap: (x: number, y: number) => void = (x: number, y: number) => {
        this.x = x;
        this.y = y;
    };
    getClickable: () => IButton[] = () => {
        return [this];
    };
}

class MenuNodeButton extends Button implements IButton {
    children: any;
    toggled: any;
    constructor(children: IButton[]) {
        super();
        this.children = children;
        this.toggled = false;
    }
    updateMap: (x: number, y: number) => void = (x: number, y: number) => {
        this.x = x;
        this.y = y;
        this.children.forEach((child: IButton, index: number) => child.updateMap(x, index + 1));
    };
    getClickable: () => IButton[] = () => {
        return !this.toggled ? [this] : [this, ...this.children.map((child: IButton) => child.getClickable())].flat();
    };
}

class MenuSectionButton extends MenuNodeButton {
    gameMode: GameMode;
    constructor(
        id: string,
        icon: string,
        title: string,
        gameMode: GameMode,
        currentGameMode: string,
        toggleMainMenu: (val: GameMode) => void,
        children: IButton[]
    ) {
        super(children);
        this.id = id;
        this.icon = icon;
        this.title = title;
        this.gameMode = gameMode;
        this.onClick = () => toggleMainMenu(gameMode);
        this.toggled = gameMode.key == currentGameMode;
    }
    moveDown = (x: number, y: number, next: number) => {
        //const current = this.children[y];
        if (this.children.length > y) {
            return { x: x, y: y + 1 };
        } else {
            return { x: next, y: 0 };
        }
    };
    moveUp = (x: number, y: number, previous: number) => {
        //const current = this.children[y];
        if (y > 1) {
            return { x: x, y: y - 1 };
        } else {
            return { x: previous, y: 0 };
        }
    };
}

class MenuPageButton extends MenuLeafButton {
    constructor(id: string, icon: string, title: string, screen: string, setScreen: (s: string) => void) {
        super(id, icon, title);
        this.active = id == screen;
        this.onClick = () => setScreen(this.id);
    }
}

interface XY {
    x: number;
    y: number;
}

interface NavHandler {
    moveUp: (x: number, y: number) => XY;
    moveDown: (x: number, y: number) => XY;
    moveLeft: (x: number, y: number) => XY;
    moveRight: (x: number, y: number) => XY;
    action: (x: number, y: number) => void;
}

class MenuRootButton extends MenuNodeButton implements NavHandler {
    escape: () => void;
    constructor(escape: () => void, children: IButton[]) {
        super(children);
        this.isRoot = true;
        this.children = children;
        this.escape = escape;
    }
    getClickable: () => IButton[] = () => [...this.children.map((child: IButton) => child.getClickable())].flat();
    withMap = () => {
        this.children.forEach((child: IButton, i: number) => child.updateMap(i, 0));
        return this;
    };
    moveRight = () => {
        //switch to screen handler if possible
        throw new Error("cant go right");
    };
    moveLeft = (x: number, y: number) => {
        //ignore
        return { x, y };
    };
    moveDown = (x: number, y: number) => {
        const current = this.children[x];
        if (y > 0) {
            const next = this.children.length - 1 == x ? 0 : x + 1;
            return current.moveDown(x, y, next);
        }

        if (current.getClickable().length > 1) {
            return { x, y: y + 1 };
        }

        if (this.children.length > x + 1) {
            return { x: x + 1, y: 0 };
        } else {
            return { x: 0, y: 0 };
        }
    };
    moveUp = (x: number, y: number) => {
        const current = this.children[x];
        if (y > 0) {
            const previous = x == 0 ? this.children.length : x;
            return current.moveUp(x, y, previous);
        }
        const previous = x == 0 ? this.children.length - 1 : x - 1;
        return { x: previous, y: this.children[previous].getClickable().length - 1 };
    };
    action = (x: number, y: number) => {
        const current = this.children[x];
        if (y > 0) {
            current.children[y - 1].onClick();
        } else {
            current.onClick();
        }
    };
}

class ScreenNavigator implements NavHandler {
    escape: () => void;
    constructor(escape: () => void) {
        this.escape = escape;
    }
    moveUp: (x: number, y: number) => XY = (x: number, y: number) => ({ x: x, y: y });
    moveDown: (x: number, y: number) => XY = (x: number, y: number) => ({ x: x, y: y });
    moveLeft: (x: number, y: number) => XY = () => {
        throw new Error("cant go left");
    };
    moveRight: (x: number, y: number) => XY = (x: number, y: number) => ({ x: x, y: y });
    action: (x: number, y: number) => void = () => {};
}

class MenuStartButton extends MenuLeafButton {
    static getTitle = (gameMode: GameMode) => {
        if (gameMode.key == GameModes.CUSTOM.key) {
            return "Start Custom";
        }
        if (gameMode.key == GameModes.VERSUS.key) {
            return "Start Versus";
        }
        return "Quick Start";
    };
    constructor(gameMode: GameMode, start: () => void) {
        super("start", "🎲", MenuStartButton.getTitle(gameMode));
        this.blink = true;
        this.onClick = start;
    }
}

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
                //@todo also move cursor to rating
            }
        } else {
            setMainMenu(GameModes.QUICK);
            setScreen("");
            //@todo also move cursor to QUICK
            //? should screen, mainmenu and cursor be part of the same state object ?
        }
    };
    const [screen, setScreen] = React.useState<string>("");
    const [state, setState] = React.useState<StartScreenState>({
        ratingSettings: { ...RatingPresets.all[1].settings },
        difficultySettings: 1,
        ratingPreset: 1,
        quickDeal: TouchDetector(),
        entropySettings: {
            baseEntropy: TouchDetector() ? 1 : 2,
            interactionEntropy: TouchDetector() ? 1 : 2,
        },
        menu: {
            x: 0,
            y: 0,
        },
        screen: {
            x: 0,
            y: 0,
        },
        focus: "menu",
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
            ...state.entropySettings,
            quickDeal: state.quickDeal,
            gameMode: mainMenu.boardMode,
            initialized: true,
        };
        setAppState(settings);
        setStarted(Date.now());
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
                    <BoardWrap player="1" settings={{ ...appState, inputMode: "gamepad" }} restart={restart} deck={deck.copy()} />
                    <BoardWrap player="2" settings={{ ...appState, inputMode: "keyboard" }} restart={restart} deck={deck.copy()} />
                </div>
            );
        }
        return <PauseProvider started={started}>{board}</PauseProvider>;
    }

    const switchToScreen = () => {
        if (screen) {
            setState({ ...state, focus: "screen" });
        }
    };

    const switchToMenu = () => {
        setState({ ...state, focus: "menu" });
    };

    const getNavigator = () => (state.focus == "menu" ? buttons() : new ScreenNavigator(switchToMenu));
    const assignState = (result: XY) => {
        if (state.focus == "menu") {
            setState({ ...state, menu: result });
        }
        if (state.focus == "screen") {
            setState({ ...state, screen: result });
        }
    };

    const getPos = () => (state.focus == "menu" ? state.menu : state.screen);
    const onUp = () => {
        const result = getNavigator().moveUp(getPos().x, getPos().y);
        assignState(result);
    };
    const onDown = () => {
        const result = getNavigator().moveDown(getPos().x, getPos().y);
        assignState(result);
    };

    const onLeft = () => {
        try {
            const result = getNavigator().moveLeft(getPos().x, getPos().y);
            assignState(result);
        } catch (e) {
            getNavigator().escape();
        }
    };

    const onRight = () => {
        try {
            const result = getNavigator().moveRight(getPos().x, getPos().y);
            assignState(result);
        } catch (e) {
            getNavigator().escape();
            console.error(e);
        }
    };

    const onAction = () => {
        getNavigator().action(getPos().x, getPos().y);
    };

    const buttons = (): MenuRootButton =>
        new MenuRootButton(switchToScreen, [
            new MenuStartButton(mainMenu, start),
            new MenuSectionButton("custom", "⚙️", "Custom Game", GameModes.CUSTOM, mainMenu.key, toggleMainMenu, [
                new MenuPageButton("rating", "🎲", "Rating", screen, setScreen),
                new MenuPageButton("difficulty", "💪", "Difficulty", screen, setScreen),
                new MenuPageButton("settings", "🔧", "Settings", screen, setScreen),
            ]),
            new MenuSectionButton("versus", "🏆", "Versus", GameModes.VERSUS, mainMenu.key, toggleMainMenu, [
                new MenuPageButton("rating", "🎲", "Rating", screen, setScreen),
                new MenuPageButton("difficulty", "💪", "Difficulty", screen, setScreen),
                new MenuPageButton("settings", "🔧", "Settings", screen, setScreen),
                new MenuPageButton("controls", "🎮", "Controls", screen, setScreen),
            ]),
        ]).withMap();

    const ButtonRenderer = (props: any) => {
        const render = (c: Button) => {
            return (
                <MenuButton
                    key={c.x + "-" + c.y}
                    x={c.x}
                    y={c.y}
                    active={c.active}
                    onClick={c.onClick}
                    icon={c.icon}
                    title={c.title}
                    toggled={c.toggled}
                    blink={c.blink}
                ></MenuButton>
            );
        };

        return <>{props.buttons.map(render)}</>;
    };

    return (
        <Provider value={{ state, setState }}>
            <VerticalMenu>
                <MenuTitle label="Solitaire" />
                <ButtonRenderer buttons={buttons().getClickable()} />
            </VerticalMenu>
            <Screen screen={screen} mainMenu={mainMenu} />
            <Keyboard onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} />
            <GamePad onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} />
        </Provider>
    );
};
export default App;
