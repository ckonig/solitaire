import GameModes, { GameMode } from "../../../GameModes";
import { XY } from "./Menu/Tree";

import DifficultyOptions from "./DifficultyOptions";
import MenuButton, { StaticMenuButtonProps } from "../Menu/MenuButton";
import MenuTitle from "../Menu/MenuTitle";
import StartScreenContext, { NavigationContext } from "./Context";
import React from "react";
import VerticalMenu from "../Menu/VerticalMenu";
import SuggestionModes from "../../../Model/Game/Settings/SuggestionModes";
import StorageManager from "../StorageManager";
import { CookieContext } from "../../Context";
import { TreeNavWrapper } from "./Screens/NavWrapper";
import { TreeNavigator } from "./Screens/ScreenNavigator";

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

    const switchToScreen = (s: string, pos: XY) =>
        setNavigation({ ...navigation, focus: "screen", screeen: s, screen: { x: -1, y: -1 }, menu: { ...pos } });

    const switchToMenu = (menu: string, pos: XY) =>
        setNavigation({ ...navigation, focus: "menu", screeen: "", mainMenu: menu, menu: { ...pos } });

    const MenuTree = (props: { children: any[] }) => {
        const navigator = new TreeNavigator();
        navigator.rows = [];
        const addItem = (child: any, index: number) => {
            navigator.rows[index] = { x: index, y: 0, ...child.props, buttons: [] };
            return React.cloneElement(child, { x: index, y: 0, navigator: navigator });
        };
        return (
            <>
                {props.children.map(addItem)}
                <TreeNavWrapper navigator={navigator} />
            </>
        );
    };

    interface _MenuButtonProps extends StaticMenuButtonProps {
        //@todo keyboard navigation in a tree
        x?: number;
        y?: number;
        navigator?: TreeNavigator;
    }

    const _MenuButton = (props: _MenuButtonProps) => {
        if (typeof props.x == "undefined" || typeof props.y == "undefined") {
            return null;
        }

        const addItem = (child: any, index: number) => {
            const assign = (n: any[]) => {
                n[props.x || 0].buttons[index + 1] = { ...props };
            };
            assign(props.navigator?.rows || []);
            return React.cloneElement(child, { x: props.x, y: index + 1, navigator: props.navigator });
        };

        return (
            <MenuButton
                title={props.title}
                x={props.x || 0}
                y={props.y || 0}
                icon={props.icon}
                menuX={navigation.menu.x}
                menuY={navigation.menu.y}
                menuFocus={navigation.focus}
                active={false}
                onFocus={props.onFocus}
                onClick={props.onClick}
                toggled={!!props.toggled}
            >
                {props.children?.map(addItem)}
            </MenuButton>
        );
    };

    const onfocus = (pos: XY) => {
        setNavigation({ ...navigation, menu: pos });
    };

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

    const storage = new StorageManager();

    return (
        <>
            <VerticalMenu>
                <MenuTitle label="♦ Solitaire" />
                <MenuTree>
                    <_MenuButton icon="🎲" title="Single Player" onClick={() => start(GameModes.CUSTOM)} onFocus={onfocus} />
                    <_MenuButton
                        icon="⚔️"
                        title="Versus"
                        onClick={(pos: XY) => toggleMainMenu("versus", pos)}
                        onFocus={onfocus}
                        toggled={navigation.mainMenu == "versus"}
                    >
                        <_MenuButton
                            icon="🎮"
                            title="Player 1"
                            onClick={(pos: XY) => toggleScreen("controls0", pos)}
                            onFocus={onfocus}
                            toggled={navigation.screeen == "controls0"}
                        />
                        <_MenuButton
                            icon="🎮"
                            title="Player 2"
                            onClick={(pos: XY) => toggleScreen("controls1", pos)}
                            onFocus={onfocus}
                            toggled={navigation.screeen == "controls1"}
                        />
                        <_MenuButton icon="🎲" title="Start" onClick={() => start(GameModes.VERSUS)} onFocus={onfocus} />
                    </_MenuButton>
                    <_MenuButton
                        icon="⚙️"
                        title="Options"
                        onClick={(pos: XY) => toggleMainMenu("custom", pos)}
                        onFocus={onfocus}
                        toggled={navigation.mainMenu == "custom"}
                    >
                        <_MenuButton
                            icon="💪"
                            title="Difficulty"
                            onClick={(pos: XY) => toggleScreen("difficulty", pos)}
                            onFocus={onfocus}
                            toggled={navigation.screeen == "difficulty"}
                        />
                        <_MenuButton
                            icon="⚖️"
                            title="Penalties"
                            onClick={(pos: XY) => toggleScreen("rating", pos)}
                            onFocus={onfocus}
                            toggled={navigation.screeen == "rating"}
                        />
                        <_MenuButton
                            icon="🧰"
                            title="Various"
                            onClick={(pos: XY) => toggleScreen("settings", pos)}
                            onFocus={onfocus}
                            toggled={navigation.screeen == "settings"}
                        />
                    </_MenuButton>
                    <_MenuButton
                        icon="🍪"
                        title={consented ? "Revoke Consent" : "Give Consent"}
                        onClick={
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
                                  }
                        }
                        onFocus={onfocus}
                        toggled={false}
                    />
                </MenuTree>
            </VerticalMenu>
            {/* {navigation.focus == "menu" && <Keyboard onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} />}
            {navigation.focus == "menu" && <GamePad onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} />} */}
        </>
    );
};
export default StartMenu;
