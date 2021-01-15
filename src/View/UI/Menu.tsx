import "./StartScreen/Menu.scss";

import { Universal, getKeyboardLayout } from "../../common/KeyboardLayouts";
import useNavigationContext, { NavigationProvider } from "./StartScreen/NavigationContext";

import EntropyLevels from "../../Model/Game/Settings/EntropyLevels";
import GameModes from "../../GameModes";
import MenuButton from "./StartScreen/Menu/MenuButton";
import MenuTitle from "./StartScreen/Menu/MenuTitle";
import MenuTree from "./StartScreen/Menu/MenuTree";
import React from "react";
import SuggestionModes from "../../Model/Game/Settings/SuggestionModes";
import { XY } from "./XY";
import { useBoardContext } from "../Game/BoardContext";
import useGlobalContext from "../GlobalContext";
import usePauseContext from "../Game/PauseContext";

const _Menu = () => {
    return (
        <NavigationProvider>
            <Menu />
        </NavigationProvider>
    );
};
const Menu = () => {
    const { state, updateContext, replaceContext, restart } = useGlobalContext();
    const pause = usePauseContext();
    const { player } = useBoardContext();
    const reset = () => {
        //this is a bad hack?
        pause.togglePause(true, -1);
        replaceContext((state) => (state.game.timemachine.previousStates ? state.game.timemachine.previousStates[0] : null));
    };

    //@todo persist game settings in local storage too if consented and use for initialization
    const setSuggestionMode = (sm: string) => updateContext((state) => state.settings.setSuggestionMode(sm));
    const setBaseEntropy = (lvl: number) => updateContext((state) => state.setEntropy(lvl));
    const setInteractionEntropy = (lvl: number) => updateContext((state) => (state.settings.interactionEntropy = lvl));

    const toggleMenu = () => {
        pause.togglePause(false, -1);
    };

    const { navigation, setNavigation } = useNavigationContext();

    const switchToMenu = (menu: string, pos: XY) =>
        setNavigation({ ...navigation, focus: "menu", screeen: "", mainMenu: menu, menu: { ...pos } });

    const toggleMainMenu = (val: string, pos: XY) => {
        if (navigation.mainMenu !== val) {
            switchToMenu(val, pos);
        } else {
            switchToMenu("", pos);
        }
    };

    if (!pause.state.showMenu) {
        return null;
    }

    const remaining = pause.state.allowed - pause.state.pauses.length - 1;

    let announcement = `You can pause the game ${remaining} more times.`;
    if (remaining === 1) {
        announcement = `You can pause the game ${remaining} more time.`;
    }
    if (remaining === 0) {
        announcement = "This is the last remaining pause. If you continue, no more pause will be possible.";
    }
    if (remaining < 0) {
        announcement = "The game is not paused.";
    }

    const isSinglePlayer = state.settings.launchSettings.boardMode === GameModes.SINGLEPLAYER;
    const keyboardLayout = isSinglePlayer ? Universal : getKeyboardLayout(state.settings.launchSettings.players[player].inputLayout);

    if (pause.state.pausedBy !== player) {
        return (
            <div className="gamemenu menu">
                <div className="startscreen-jail">
                    <div className="innermenu">
                        <MenuTitle label="😴" />
                        {pause.state.pausedBy}
                        <div className="announcement">{announcement}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="gamemenu menu">
            <div className="startscreen-jail">
                <div className="innermenu">
                    <MenuTitle label="😴" />

                    <div className="announcement">{announcement}</div>
                    <MenuTree keyboardLayout={keyboardLayout}>
                        <MenuButton
                            icon="▶️"
                            title="Resume"
                            onClick={() => {
                                toggleMenu();
                            }}
                        />
                        <MenuButton
                            icon={state.settings.suggestionMode.icon}
                            title={`Suggestions: ${state.settings.suggestionMode.label}`}
                            onClick={() => {
                                setSuggestionMode(SuggestionModes.next(state.settings.suggestionMode).key);
                            }}
                        />
                        <MenuButton
                            icon="🌪️"
                            title="Entropy"
                            onClick={(pos: XY) => toggleMainMenu("entropy", pos)}
                            toggled={navigation.mainMenu === "entropy"}
                        >
                            <MenuButton
                                icon="🌪️"
                                title={`Base Entropy: ${EntropyLevels[state.settings.baseEntropy]}`}
                                onClick={() => {
                                    setBaseEntropy(
                                        state.settings.baseEntropy < EntropyLevels.length - 1 ? state.settings.baseEntropy + 1 : 0
                                    );
                                }}
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
                            />
                        </MenuButton>
                        <MenuButton
                            icon="♻️"
                            title="Restart Game"
                            onClick={() => reset()}
                            skip={!state.game.timemachine.previousStates.length}
                        />
                        <MenuButton icon="🗑️" title="Quit Game" onClick={() => restart()} />
                    </MenuTree>
                </div>
            </div>
        </div>
    );
};
export default _Menu;
