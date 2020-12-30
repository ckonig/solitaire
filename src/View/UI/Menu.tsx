import "../Style/Menu.scss";

import React from "react";
import MenuTitle from "./StartScreen/Menu/MenuTitle";
import MenuTree from "./StartScreen/Menu/MenuTree";
import MenuButton from "./StartScreen/Menu/MenuButton";
import { NavigationContext, NavigationProvider, NavigationState } from "./StartScreen/Context";
import { XY } from "./XY";
import GlobalContext from "../Context";
import PauseContext from "../PauseContext";
import BusinessModel from "../../Business/BusinessModel";
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
    const isVisible = (state: BusinessModel) => state.settings.suggestionMode.supportsHints || state.settings.suggestionMode.isTemporary;
    const isDisabled = (state: BusinessModel) => state.settings.suggestionMode.isTemporary;

    const suggestOnce = () => {
        updateContext((state) => {
            if (isVisible(state) && !isDisabled(state)) {
                state.settings.enableHint();
            }
        });
    };

    //@todo persist game settings in local storage too and use for initialization
    // const setSuggestionMode = (sm) => updateContext((state) => state.settings.setSuggestionMode(sm));
    // const setBaseEntropy = (lvl) => updateContext((state) => state.setEntropy(lvl));
    // const setInteractionEntropy = (lvl) => updateContext((state) => (state.settings.interactionEntropy = lvl));
    // const setMouseMode = (mm) => updateContext((state) => (state.settings.mouseMode = mm));

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

    if (!state?.settings.showMenu) {
        return null;
    }
    const onfocus = (pos: XY) => {
        setNavigation({ ...navigation, menu: pos });
    };

    const pause = React.useContext(PauseContext);
    const remaining = pause.state.allowed - pause.state.pauses.length - 1;

    //@todo proper I18N
    let announcement = `You can pause the game ${remaining} more times.`;
    if (remaining == 1) {
        announcement = `You can pause the game ${remaining} more time.`;
    }
    if (remaining == 0) {
        announcement = "This is the last remaining pause. If you continue, no more pause will be possible.";
    }
    if (remaining < 0) [
        announcement = "The game is not paused."
    ]

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
                        <MenuButton icon="⏪" title="Undo last move" onClick={() => {}} onFocus={onfocus} />
                        <MenuButton
                            icon="💡"
                            title="Hint"
                            onClick={() => suggestOnce()}
                            onFocus={onfocus}
                            skip={!isVisible(state)}
                            disabled={isDisabled(state) || !isVisible(state)}
                        />
                        <MenuButton icon="💡" title="Suggestions" onClick={() => {}} onFocus={onfocus} />
                        <MenuButton icon="⚙️" title="Entropy" onClick={() => {}} onFocus={onfocus}>
                            <MenuButton icon="⚙️" title="Base Entropy: low" onClick={() => {}} onFocus={onfocus} />
                            <MenuButton icon="⚙️" title="Action Entropy: low" onClick={() => {}} onFocus={onfocus} />
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
