import GameModes, { GameMode } from "./GameModes";

import GamePad from "./Game/GamePad";
import Keyboard from "./Game/Keyboard";
import MenuButton from "./UI/Menu/MenuButton";
import MenuTitle from "./UI/Menu/MenuTitle";
import { Provider } from "./UI/StartScreen/Context";
import RatingPresets from "./UI/StartScreen/RatingOptions";
import React from "react";
import Screen from "./UI/StartScreen/Screen";
import { StartScreenState } from "../Common";
import TouchDetector from "./UI/StartScreen/TouchDetector";
import VerticalMenu from "./UI/Menu/VerticalMenu";
import { getDifficultyRows } from "./UI/StartScreen/Difficulty";
import { getRatingRows } from "./UI/StartScreen/Rating";
import { getSettingRows } from "./UI/StartScreen/QuickStart";

interface IButton {
    getClickable: () => IButton[];
    updateMap: (x: number, y: number) => void;
    onClick: () => void;
}

export class Button {
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
export class MenuSectionButton extends MenuNodeButton {
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

export interface XY {
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

class MenuActionButton extends MenuLeafButton {
    constructor(id: string, icon: string, title: string, active: boolean, onClick: () => void) {
        super(id, icon, title);
        this.active = active;
        this.onClick = onClick;
    }
}

export class MenuRootButton extends MenuNodeButton implements NavHandler {
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

//---------------------------

export class StartMenuPageButton extends MenuActionButton {
    constructor(id: string, icon: string, title: string, screen: string, setScreen: (s: string) => void) {
        super(id, icon, title, id == screen, () => setScreen(this.id));
        this.active = id == screen;
        this.onClick = () => setScreen(this.id);
    }
}

export class ScreenNavigator implements NavHandler {
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

export class MenuStartButton extends MenuLeafButton {
    constructor(title: string, icon: string, start: () => void) {
        super("start", icon, title);
        this.onClick = start;
    }
}

const StartMenu = (props: { start: (gameMode: GameMode, state: StartScreenState) => void }) => {
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
    const switchToScreen = () => {
        if (screen) {
            setState({ ...state, focus: "screen" });
        }
    };

    const [screen, setScreen] = React.useState<string>("");
    const [mainMenu, setMainMenu] = React.useState<string>("");

    const toggleMainMenu = (val: string) => {
        if (mainMenu !== val) {
            setMainMenu(val);
        } else {
            setMainMenu("");
            setScreen("");
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
            //@todo catch error for control flow is not a good pattern in JS
        } catch (e) {
            getNavigator().escape();
        }
    };

    const onRight = () => {
        try {
            const result = getNavigator().moveRight(getPos().x, getPos().y);
            assignState(result);
            //@todo catch error for control flow is not a good pattern in JS
        } catch (e) {
            getNavigator().escape();
        }
    };

    const onAction = () => {
        getNavigator().action(getPos().x, getPos().y);
    };

    const buttons = (): MenuRootButton =>
        new MenuRootButton(switchToScreen, [
            new MenuStartButton("Single Player", "🎲", () => props.start(GameModes.CUSTOM, state)),
            new MenuStartButton("Versus", "🏆", () => props.start(GameModes.VERSUS, state)),
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
            <Screen screen={screen} />
            <Keyboard onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} />
            <GamePad onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} />
        </Provider>
    );
};
export default StartMenu;
