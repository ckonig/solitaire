import GameModes, { GameMode } from "../../GameModes";
import { MenuActionButton, MenuLeafButton, MenuRootButton, MenuSectionButton, NavHandler, XY } from "./Tree";

import DifficultyOptions from "./DifficultyOptions";
import GamePad from "../../Game/GamePad";
import Keyboard from "../../Game/Keyboard";
import MenuButton from "../Menu/MenuButton";
import MenuTitle from "../Menu/MenuTitle";
import { Provider } from "./Context";
import RatingPresets from "./RatingOptions";
import React from "react";
import Screen from "./Screen";
import { StartScreenState } from "../../../Common";
import TouchDetector from "./TouchDetector";
import VerticalMenu from "../Menu/VerticalMenu";
import { getDifficultyRows } from "./Difficulty";
import { getRatingRows } from "./Rating";
import { getSettingRows } from "./QuickStart";

export class StartMenuPageButton extends MenuActionButton {
    constructor(id: string, icon: string, title: string, screen: string, onClick: (pos: XY) => void, onfocus: (pos: XY) => void) {
        super(id, icon, title, id == screen, onClick);
        this.active = id == screen;
        this.onClick = onClick;
        this.onFocus = onfocus;
    }
}

export class ScreenNavigator implements NavHandler {
    screen: string;
    state: StartScreenState;
    constructor(screen: string, state: StartScreenState) {
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
            return { x: row.buttons.length - 1, y: y };
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
    //@todo implement
    action: (xy: XY) => void = () => {};
}

export class MenuStartButton extends MenuLeafButton {
    constructor(title: string, icon: string, start: () => void, onFocus: (pos: XY) => void) {
        super("start", icon, title, start);
        this.onFocus = onFocus;
    }
}

const StartMenu = (props: { start: (settings: any) => void }) => {
    const start = (gameMode: GameMode) => {
        const settings = {
            ...DifficultyOptions[state.difficultySettings].settings,
            ...state.ratingSettings,
            ...state.entropySettings,
            quickDeal: state.quickDeal,
            gameMode: gameMode,
            initialized: true,
        };
        props.start(settings);
    };
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
        screeen: "",
        mainMenu: "",
    });

    interface Subscriber {
        id: number;
        click: (pos: XY) => {};
    }

    const [subscriber, setSubscriber] = React.useState<Subscriber[]>([]);
    const subscribe = (s: Subscriber) => {
        subscriber[s.id] = s;
        setSubscriber(subscriber);
    };

    const [buttons, setButtons] = React.useState(new MenuRootButton([]));

    const getNavigator = () => (state.focus == "menu" ? buttons : new ScreenNavigator(state.screeen, state));

    const assignState = (result: XY) => {
        if (state.focus == "menu") {
            setState({ ...state, menu: result });
        }
        if (state.focus == "screen") {
            setState({
                ...state,
                screen: result,
                currentButton: new ScreenNavigator(state.screeen, state).getRows()[state.screen.y].buttons[state.screen.x],
            });
        }
    };

    const getPos = () => (state.focus == "menu" ? state.menu : state.screen);

    const onUp = () => {
        assignState(getNavigator().moveUp(getPos().x, getPos().y));
    };
    const onDown = () => {
        assignState(getNavigator().moveDown(getPos().x, getPos().y));
    };

    const onLeft = () => {
        assignState(getNavigator().moveLeft(getPos().x, getPos().y));
    };

    const onRight = () => {
        assignState(getNavigator().moveRight(getPos().x, getPos().y));
    };

    const onAction = () => {
        getNavigator().action(getPos());
    };

    const onCancel = () => {
        if (state.focus == "screen") {
            switchToMenu(state.mainMenu, state.menu);
        } else if (state.menu.y > 0) {
            switchToMenu(state.mainMenu, { ...state.menu, y: 0 });
        }
    };
    const switchToScreen = (s: string, pos: XY) => {
        setState({ ...state, focus: "screen", screeen: s, screen: { x: 0, y: 0 }, menu: { ...pos } });
    };
    const switchToMenu = (menu: string, pos: XY) => {
        setState({ ...state, focus: "menu", screeen: "", mainMenu: menu, menu: { ...pos } });
    };

    React.useEffect(() => {
        const toggleScreen = (s: string, pos: XY) => {
            if (state.screeen !== s) {
                switchToScreen(s, pos);
            } else {
                switchToMenu(state.mainMenu, pos);
            }
        };

        const toggleMainMenu = (val: string, pos: XY) => {
            if (state.mainMenu !== val) {
                switchToMenu(val, pos);
            } else {
                switchToMenu("", pos);
            }
        };

        const onfocus = (pos: XY) => {
            setState({ ...state, menu: pos });
        };

        setButtons(
            new MenuRootButton([
                new MenuStartButton("Single Player", "🎲", () => start(GameModes.CUSTOM), onfocus),

                new MenuSectionButton(
                    "versus",
                    "🏆",
                    "Versus",
                    (pos: XY) => toggleMainMenu("versus", pos),
                    onfocus,
                    state.mainMenu == "versus",
                    [
                        new StartMenuPageButton(
                            "controls0",
                            "🎮",
                            "Player 1",
                            state.screeen,
                            (pos: XY) => toggleScreen("controls0", pos),
                            onfocus
                        ),
                        new StartMenuPageButton(
                            "controls1",
                            "🎮",
                            "Player 2",
                            state.screeen,
                            (pos: XY) => toggleScreen("controls1", pos),
                            onfocus
                        ),
                        new MenuStartButton("Start", "🎲", () => start(GameModes.VERSUS), onfocus),
                    ]
                ),

                new MenuSectionButton(
                    "custom",
                    "⚙️",
                    "Options",
                    (pos: XY) => toggleMainMenu("custom", pos),
                    onfocus,
                    state.mainMenu == "custom",
                    [
                        new StartMenuPageButton(
                            "difficulty",
                            "💪",
                            "Difficulty",
                            state.screeen,
                            (pos: XY) => toggleScreen("difficulty", pos),
                            onfocus
                        ),
                        new StartMenuPageButton("rating", "🎲", "Rating", state.screeen, (pos: XY) => toggleScreen("rating", pos), onfocus),
                        new StartMenuPageButton(
                            "settings",
                            "🔧",
                            "Device",
                            state.screeen,
                            (pos: XY) => toggleScreen("settings", pos),
                            onfocus
                        ),
                    ]
                ),
            ])
        );
    }, [state, state.menu.x, state.menu.y, state.screeen, state.mainMenu]);

    const ButtonRenderer = (props: any) => {
        const c = props.button;
        return (
            <div>
                {!c.isRoot && (
                    <MenuButton
                        subscribe={subscribe}
                        x={props.x}
                        y={props.y}
                        active={c.active}
                        onClick={c.onClick}
                        onFocus={c.onFocus}
                        icon={c.icon}
                        title={c.title}
                        toggled={c.toggled}
                        blink={c.blink}
                        menuX={state.menu.x}
                        menuY={state.menu.y}
                        menuFocus={state.focus}
                    ></MenuButton>
                )}
                {c.isRoot &&
                    c.children.map((child: any, index: number) => (
                        <ButtonRenderer x={index} y={0} key={(props.x + 1) * 100 + index} button={child} />
                    ))}
                {c.toggled &&
                    c.children.map((child: any, index: number) => (
                        <ButtonRenderer key={(props.x + 1) * 100 + index} x={props.x} y={index + 1} button={child} />
                    ))}
            </div>
        );
    };

    return (
        <Provider value={{ state, setState }}>
            <VerticalMenu>
                <MenuTitle label="Solitaire" />
                <ButtonRenderer button={buttons} x={0} y={0} menuX={state.menu.x} />
            </VerticalMenu>
            <Screen screen={state.screeen} />
            <Keyboard onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} onCancel={onCancel} />
            <GamePad onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} onCancel={onCancel} />
        </Provider>
    );
};
export default StartMenu;
