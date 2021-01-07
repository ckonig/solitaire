import "../Style/Menu.scss";

import { NavigationContext, NavigationProvider, NavigationState } from "./StartScreen/Context";

import EntropyLevels from "../../Model/Game/EntropyLevels";
import GlobalContext from "../Context";
import MenuButton from "./StartScreen/Menu/MenuButton";
import MenuTitle from "./StartScreen/Menu/MenuTitle";
import MenuTree from "./StartScreen/Menu/MenuTree";
import PauseContext from "../PauseContext";
import React from "react";
import SuggestionModes from "../../Model/Game/Settings/SuggestionModes";
import { XY } from "./XY";

const _Menu = () => {
    const [navigation, setNavigation] = React.useState<NavigationState>({
        menu: {
            x: 0,
            y: 0,
        },
        screen: {
            x: 0,
            y: 0,
        },
        focus: "menu",
        mainMenu: "",
        screeen: "",
    });
    const navigationContext = {
        navigation,
        setNavigation,
    };
    return (
        <NavigationProvider value={navigationContext}>
            <Menu />
        </NavigationProvider>
    );
};
const Menu = () => {
    const { state, updateContext, replaceContext, restart } = React.useContext(GlobalContext);
    const { togglePause } = React.useContext(PauseContext);
    const reset = () => {
        togglePause(true, true);
        replaceContext((state) => (state.game.timemachine.previousStates ? state.game.timemachine.previousStates[0] : null));
    };

    //@todo persist game settings in local storage too and use for initialization
    const setSuggestionMode = (sm: string) => updateContext((state) => state.settings.setSuggestionMode(sm));
    const setBaseEntropy = (lvl: number) => updateContext((state) => state.setEntropy(lvl));
    const setInteractionEntropy = (lvl: number) => updateContext((state) => (state.settings.interactionEntropy = lvl));

    const toggleMenu = (menu: boolean) => {
        togglePause(!state?.settings.showMenu, true);
        updateContext((state) => {
            if (state.settings.showMenu == menu) {
                state.settings.showMenu = !state.settings.showMenu;
            }
        });
    };

    React.useEffect(() => {
        if (state?.settings.showMenu) {
            togglePause(false, true);
        }
        return () => {
            if (!state?.settings.showMenu) {
                togglePause(true, true);
            }
        };
    });

    const { navigation, setNavigation } = React.useContext(NavigationContext);

    const switchToMenu = (menu: string, pos: XY) =>
        setNavigation({ ...navigation, focus: "menu", screeen: "", mainMenu: menu, menu: { ...pos } });

    const toggleMainMenu = (val: string, pos: XY) => {
        if (navigation.mainMenu !== val) {
            switchToMenu(val, pos);
        } else {
            switchToMenu("", pos);
        }
    };

    if (!state?.settings.showMenu) {
        return null;
    }
    const onfocus = (pos: XY) => {
        setNavigation({ ...navigation, menu: pos });
    };

    const pause = React.useContext(PauseContext);
    const remaining = pause.state.allowed - pause.state.pauses.length - 1;

    let announcement = `You can pause the game ${remaining} more times.`;
    if (remaining == 1) {
        announcement = `You can pause the game ${remaining} more time.`;
    }
    if (remaining == 0) {
        announcement = "This is the last remaining pause. If you continue, no more pause will be possible.";
    }
    if (remaining < 0) [(announcement = "The game is not paused.")];

    return (
        <div className="gamemenu menu">
            <div className="startscreen-jail">
                <div className="innermenu">
                    <MenuTitle label="😴" />

                    <div className="announcement">{announcement}</div>
                    <MenuTree>
                        <MenuButton
                            icon="▶️"
                            title="Resume"
                            onClick={() => {
                                toggleMenu(state.settings.showMenu);
                            }}
                            onFocus={onfocus}
                        />
                        <MenuButton
                            icon={state.settings.suggestionMode.icon}
                            title={`Suggestions: ${state.settings.suggestionMode.label}`}
                            onClick={() => {
                                setSuggestionMode(SuggestionModes.next(state.settings.suggestionMode).key);
                            }}
                            onFocus={onfocus}
                        />
                        <MenuButton
                            icon="🌪️"
                            title="Entropy"
                            onClick={(pos: XY) => toggleMainMenu("entropy", pos)}
                            onFocus={onfocus}
                            toggled={navigation.mainMenu == "entropy"}
                        >
                            <MenuButton
                                icon="🌪️"
                                title={`Base Entropy: ${EntropyLevels[state.settings.baseEntropy]}`}
                                onClick={() => {
                                    setBaseEntropy(
                                        state.settings.baseEntropy < EntropyLevels.length - 1 ? state.settings.baseEntropy + 1 : 0
                                    );
                                }}
                                onFocus={onfocus}
                            />
                            <MenuButton
                                icon="🌬️"
                                title={`Action Entropy: ${EntropyLevels[state.settings.interactionEntropy]}`}
                                onClick={() => {
                                    setInteractionEntropy(
                                        state.settings.interactionEntropy < EntropyLevels.length - 1
                                            ? state.settings.interactionEntropy + 1
                                            : 0
                                    );
                                }}
                                onFocus={onfocus}
                            />
                        </MenuButton>
                        <MenuButton
                            icon="♻️"
                            title="Restart Game"
                            onClick={() => reset()}
                            onFocus={onfocus}
                            skip={!state.game.timemachine.previousStates.length}
                        />
                        <MenuButton icon="🗑️" title="Quit Game" onClick={() => restart()} onFocus={onfocus} />
                    </MenuTree>
                </div>
            </div>
        </div>
    );
};
export default _Menu;
