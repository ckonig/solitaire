import GameModes, { GameMode } from "../../../GameModes";
import { MenuActionButton, MenuLeafButton, MenuRootButton, MenuSectionButton, XY } from "./Menu/Tree";

import DifficultyOptions from "./DifficultyOptions";
import GamePad from "../../Game/GamePad";
import Keyboard from "../../Game/Keyboard";
import MenuButton from "../Menu/MenuButton";
import MenuTitle from "../Menu/MenuTitle";
import { defaultStartScreenState, Provider, StartScreenState } from "./Context";
import React from "react";
import Screen, { getScreenStartPos } from "./Screens/Screen";
import VerticalMenu from "../Menu/VerticalMenu";
import SuggestionModes from "../../../Model/Game/Settings/SuggestionModes";

export class StartMenuPageButton extends MenuActionButton {
    constructor(id: string, icon: string, title: string, screen: string, onClick: (pos: XY) => void, onFocus: (pos: XY) => void) {
        super(id, icon, title, id == screen, onClick, onFocus);
        this.active = id == screen;
    }
}

export class MenuStartButton extends MenuLeafButton {
    constructor(title: string, icon: string, start: () => void, onFocus: (pos: XY) => void) {
        super("start", icon, title, start, onFocus);
    }
}

const StartMenu = (props: { start: (settings: any) => void }) => {
    const start = (gameMode: GameMode) => {
        const settings = {
            ...DifficultyOptions[state.difficultySettings].settings,
            ...state.ratingSettings,
            ...state.entropySettings,
            quickDeal: state.quickDeal,
            boardMode: gameMode.boardMode,
            initialized: true,
            suggestionMode: state.ratingSettings.hintPenalty ? SuggestionModes.NONE : state.suggestionMode,
        };
        props.start(settings);
    };

    const [state, setState] = React.useState<StartScreenState>(defaultStartScreenState);

    const [buttons, setButtons] = React.useState(new MenuRootButton([]));

    const assignState = (result: XY) => {
        if (state.focus == "menu") {
            setState({ ...state, menu: result });
        } else {
            throw "Invalid navigation action";
        }
    };

    const getPos = () => (state.focus == "menu" ? state.menu : state.screen);

    const onUp = () => assignState(buttons.moveUp(getPos().x, getPos().y));

    const onDown = () => assignState(buttons.moveDown(getPos().x, getPos().y));

    const onLeft = () => assignState(buttons.moveLeft(getPos().x, getPos().y));

    const onRight = () => assignState(buttons.moveRight(getPos().x, getPos().y));

    const onAction = () => buttons.action(getPos());

    const switchToScreen = (s: string, pos: XY) =>
        setState({ ...state, focus: "screen", screeen: s, screen: getScreenStartPos(s, state), menu: { ...pos } });

    const switchToMenu = (menu: string, pos: XY) => setState({ ...state, focus: "menu", screeen: "", mainMenu: menu, menu: { ...pos } });

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
                        x={props.x}
                        y={props.y}
                        active={c.active}
                        onClick={c.onClick}
                        onFocus={c.onFocus}
                        icon={c.icon}
                        title={c.title}
                        toggled={c.toggled}
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
            {state.focus == "menu" && <Keyboard onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} />}
            {state.focus == "menu" && <GamePad onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} />}
        </Provider>
    );
};
export default StartMenu;
