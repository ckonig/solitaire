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
import { getDifficultyRows } from "./View/UI/StartScreen/Difficulty";
import { getRatingRows } from "./View/UI/StartScreen/Rating";
import { getSettingRows } from "./View/UI/StartScreen/QuickStart";

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
    constructor(id: string, icon: string, title: string, onClick: () => void, toggled: boolean, children: IButton[]) {
        super(children);
        this.id = id;
        this.icon = icon;
        this.title = title;
        this.onClick = onClick;
        this.toggled = toggled;
    }
    moveDown = (x: number, y: number, next: number) => {
        if (this.children.length > y) {
            return { x: x, y: y + 1 };
        } else {
            return { x: next, y: 0 };
        }
    };
    moveUp = (x: number, y: number, previous: number) => {
        if (y > 1) {
            return { x: x, y: y - 1 };
        } else {
            return { x: previous, y: 0 };
        }
    };
}

class MenuActionButton extends MenuLeafButton {
    constructor(id: string, icon: string, title: string, active: boolean, onClick: () => void) {
        super(id, icon, title);
        this.active = active;
        this.onClick = onClick;
    }
}
class StartMenuPageButton extends MenuActionButton {
    constructor(id: string, icon: string, title: string, screen: string, setScreen: (s: string) => void) {
        super(id, icon, title, id == screen, () => setScreen(this.id));
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
    screen: string;
    state: StartScreenState;
    constructor(escape: () => void, screen: string, state: StartScreenState) {
        this.escape = escape;
        this.screen = screen;
        this.state = state;
    }
    getRows = () => {
        if (this.screen == "rating") {
            return getRatingRows();
        }
        if (this.screen == "settings") {
            return getSettingRows(this.state);
        }
        if (this.screen == "difficulty") {
            return getDifficultyRows();
        }
        return [];
    };
    getRow = (x: number) => this.getRows()[x];
    moveUp: (x: number, y: number) => XY = (x: number, y: number) => {
        const rows = this.getRows();
        console.debug(rows, x, y);
        if (rows.length < 2) {
            return { x: x, y: y };
        }
        if (y == 0) {
            return { x: x, y: rows.length - 1 };
        }
        return { x: x, y: y - 1 };
    };
    moveDown: (x: number, y: number) => XY = (x: number, y: number) => {
        const rows = this.getRows();
        console.debug(rows, x, y);
        if (rows.length < 2) {
            return { x: x, y: y };
        }
        if (y == rows.length - 1) {
            return { x: x, y: 0 };
        }
        return { x: x, y: y + 1 };
    };
    moveLeft: (x: number, y: number) => XY = (x: number, y: number) => {
        const row = this.getRow(y);
        console.debug(row, x, y);
        if (x == 0) {
            throw new Error("cant go left");
        }
        return { x: x - 1, y: y };
    };
    moveRight: (x: number, y: number) => XY = (x: number, y: number) => {
        const row = this.getRow(y);
        console.debug(row, x, y);
        if (x == row.buttons.length - 1) {
            return { x: 0, y: y };
        }
        return { x: x + 1, y: y };
    };
    action: (x: number, y: number) => void = () => {};
}

class MenuStartButton extends MenuLeafButton {
    constructor(title: string, icon: string, start: () => void) {
        super("start", icon, title);
        this.onClick = start;
    }
}

const App = () => {
    const [started, setStarted] = React.useState<number>(0);
    const [paused, setPaused] = React.useState<boolean>(false);
    const defaultState = { gameMode: GameModes.CUSTOM, inputMode: "mouse", paused, setPaused, initialized: false };
    const [appState, setAppState] = React.useState<AppState>(defaultState);
    const [mainMenu, setMainMenu] = React.useState<string>("");

    const toggleMainMenu = (val: string) => {
        if (mainMenu !== val) {
            setMainMenu(val);
        } else {
            setMainMenu("");
            setScreen("");
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
    const start = (gameMode: GameMode) => {
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

    const switchToScreen = () => {
        if (screen) {
            setState({ ...state, focus: "screen" });
        }
    };

    const switchToMenu = () => {
        setState({ ...state, focus: "menu" });
    };

    const getNavigator = () => (state.focus == "menu" ? buttons() : new ScreenNavigator(switchToMenu, screen, state));
    const assignState = (result: XY) => {
        if (state.focus == "menu") {
            setState({ ...state, menu: result });
        }
        if (state.focus == "screen") {
            setState({
                ...state,
                screen: result,
                currentButton: new ScreenNavigator(switchToMenu, screen, state).getRows()[state.screen.y].buttons[state.screen.x],
            });
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

    //@todo separate start button for each mode.

    const buttons = (): MenuRootButton =>
        new MenuRootButton(switchToScreen, [
            new MenuStartButton("Single Player", "🎲", () => start(GameModes.CUSTOM)),
            new MenuStartButton("Versus", "🏆", () => start(GameModes.VERSUS)),
            new MenuSectionButton("custom", "⚙️", "Customize", () => toggleMainMenu("custom"), mainMenu == "custom", [
                new StartMenuPageButton("rating", "🎲", "Rating", screen, setScreen),
                new StartMenuPageButton("difficulty", "💪", "Difficulty", screen, setScreen),
                new StartMenuPageButton("settings", "🔧", "Settings", screen, setScreen),
            ]),
            new MenuSectionButton("controls", "🎮", "Controls", () => toggleMainMenu("controls"), mainMenu == "controls", [
                new StartMenuPageButton("controls", "🎮", "Player 1", screen, setScreen),
                new StartMenuPageButton("controls", "🎮", "Player 2", screen, setScreen),
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
            <Screen screen={screen} gameMode={appState.gameMode} />
            <Keyboard onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} />
            <GamePad onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} />
        </Provider>
    );
};
export default App;
