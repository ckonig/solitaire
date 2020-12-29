import GameModes, { GameMode } from "../../../GameModes";
import { MenuActionButton, MenuLeafButton, MenuRootButton, MenuSectionButton, XY } from "./Menu/Tree";

import DifficultyOptions from "./DifficultyOptions";
import GamePad from "../../Game/GamePad";
import Keyboard from "../../Game/Keyboard";
import MenuButton from "../Menu/MenuButton";
import MenuTitle from "../Menu/MenuTitle";
import StartScreenContext, { NavigationContext } from "./Context";
import React from "react";
import VerticalMenu from "../Menu/VerticalMenu";
import SuggestionModes from "../../../Model/Game/Settings/SuggestionModes";
import StorageManager from "../StorageManager";
import { CookieContext } from "../../Context";

class StartMenuPageButton extends MenuActionButton {
    constructor(id: string, icon: string, title: string, screen: string, onClick: (pos: XY) => void, onFocus: (pos: XY) => void) {
        super(id, icon, title, id == screen, onClick, onFocus);
        this.active = id == screen;
    }
}

class MenuStartButton extends MenuLeafButton {
    constructor(title: string, icon: string, start: () => void, onFocus: (pos: XY) => void) {
        super("start", icon, title, start, onFocus);
    }
}

class MenuConsentButton extends MenuActionButton {
    storage: StorageManager;
    constructor(id: string, consented: boolean, setConsented: (v: boolean) => void, onFocus: (pos: XY) => void, storage: StorageManager) {
        super(
            id,
            "🍪",
            consented ? "Revoke Consent" : "Give Consent",
            false,
            consented
                ? () => {
                      const revoke = storage.revokeConsent();
                      if (confirm(revoke.prompt)) {
                          revoke.confirm();
                          setConsented(false);
                      }
                  }
                : () => {
                      const consent = storage.giveConsent();
                      if (confirm(consent.prompt)) {
                          consent.confirm();
                          setConsented(true);
                      }
                  },
            onFocus
        );
        this.storage = storage;
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
    const { navigation, setNavigation } = React.useContext(NavigationContext);
    const { state } = React.useContext(StartScreenContext);
    const { consented, setConsented } = React.useContext(CookieContext);

    const assignState = (result: XY) => {
        if (navigation.focus == "menu") {
            setNavigation({ ...navigation, menu: result });
        } else {
            throw "Invalid navigation action";
        }
    };

    const [buttons, setButtons] = React.useState(new MenuRootButton([]));

    const getPos = () => (navigation.focus == "menu" ? navigation.menu : navigation.screen);

    const onUp = () => assignState(buttons.moveUp(getPos().x, getPos().y));

    const onDown = () => assignState(buttons.moveDown(getPos().x, getPos().y));

    const onLeft = () => assignState(buttons.moveLeft(getPos().x, getPos().y));

    const onRight = () => assignState(buttons.moveRight(getPos().x, getPos().y));

    const onAction = () => buttons.action(getPos());

    const switchToScreen = (s: string, pos: XY) =>
        setNavigation({ ...navigation, focus: "screen", screeen: s, screen: { x: -1, y: -1 }, menu: { ...pos } });

    const switchToMenu = (menu: string, pos: XY) =>
        setNavigation({ ...navigation, focus: "menu", screeen: "", mainMenu: menu, menu: { ...pos } });

    React.useEffect(() => {
        const toggleScreen = (s: string, pos: XY) => {
            if (navigation.screeen !== s) {
                switchToScreen(s, pos);
            } else {
                switchToMenu(navigation.mainMenu, pos);
            }
        };

        const toggleMainMenu = (val: string, pos: XY) => {
            if (navigation.mainMenu !== val) {
                switchToMenu(val, pos);
            } else {
                switchToMenu("", pos);
            }
        };

        const onfocus = (pos: XY) => {
            setNavigation({ ...navigation, menu: pos });
        };

        setButtons(
            new MenuRootButton([
                new MenuStartButton("Single Player", "🎲", () => start(GameModes.CUSTOM), onfocus),

                new MenuSectionButton(
                    "versus",
                    "⚔️",
                    "Versus",
                    (pos: XY) => toggleMainMenu("versus", pos),
                    onfocus,
                    navigation.mainMenu == "versus",
                    [
                        new StartMenuPageButton(
                            "controls0",
                            "🎮",
                            "Player 1",
                            navigation.screeen,
                            (pos: XY) => toggleScreen("controls0", pos),
                            onfocus
                        ),
                        new StartMenuPageButton(
                            "controls1",
                            "🎮",
                            "Player 2",
                            navigation.screeen,
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
                    navigation.mainMenu == "custom",
                    [
                        new StartMenuPageButton(
                            "difficulty",
                            "💪",
                            "Difficulty",
                            navigation.screeen,
                            (pos: XY) => toggleScreen("difficulty", pos),
                            onfocus
                        ),
                        new StartMenuPageButton(
                            "rating",
                            "⚖️",
                            "Penalties",
                            navigation.screeen,
                            (pos: XY) => toggleScreen("rating", pos),
                            onfocus
                        ),
                        new StartMenuPageButton(
                            "settings",
                            "🧰",
                            "Various",
                            navigation.screeen,
                            (pos: XY) => toggleScreen("settings", pos),
                            onfocus
                        ),
                    ]
                ),
                new MenuConsentButton("consent", consented, setConsented, onfocus, new StorageManager()),
            ])
        );
    }, [state, navigation.menu.x, navigation.menu.y, navigation.screeen, navigation.mainMenu, consented]);

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
                        menuX={navigation.menu.x}
                        menuY={navigation.menu.y}
                        menuFocus={navigation.focus}
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
        <>
            <VerticalMenu>
                <MenuTitle label="♦ Solitaire" />
                <ButtonRenderer button={buttons} x={0} y={0} menuX={navigation.menu.x} />
            </VerticalMenu>
            {navigation.focus == "menu" && <Keyboard onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} />}
            {navigation.focus == "menu" && <GamePad onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} />}
        </>
    );
};
export default StartMenu;