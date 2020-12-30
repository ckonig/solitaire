import "../Style/Menu.scss";

import React from "react";
import MenuTitle from "./StartScreen/Menu/MenuTitle";
import MenuTree from "./StartScreen/Menu/MenuTree";
import MenuButton from "./StartScreen/Menu/MenuButton";
import { NavigationContext, NavigationProvider, NavigationState } from "./StartScreen/Context";
import { XY } from "./XY";
import GlobalContext from "../Context";
import PauseContext from "../PauseContext";
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
    const { state, updateContext } = React.useContext(GlobalContext);
    const { togglePause } = React.useContext(PauseContext);

    //@todo persist game settings in local storage too and use for initialization
    // const setSuggestionMode = (sm) => updateContext((state) => state.settings.setSuggestionMode(sm));
    // const setBaseEntropy = (lvl) => updateContext((state) => state.setEntropy(lvl));
    // const setInteractionEntropy = (lvl) => updateContext((state) => (state.settings.interactionEntropy = lvl));
    // const setMouseMode = (mm) => updateContext((state) => (state.settings.mouseMode = mm));

    const toggleMenu = (menu: boolean) => {
        updateContext((state) => {
            if (state.settings.showMenu == menu) {
                state.settings.showMenu = !state.settings.showMenu;
                togglePause(!state.settings.showMenu);
            }
        });
    };

    if (!state?.settings.showMenu) {
        return null;
    }

    const { navigation, setNavigation } = React.useContext(NavigationContext);
    const onfocus = (pos: XY) => {
        setNavigation({ ...navigation, menu: pos });
    };

    return (
        <div className="gamemenu menu">
            <div className="startscreen-jail">
                <div className="innermenu">
                    <MenuTitle label="😴" />
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
                        <MenuButton icon="💡" title="Hint" onClick={() => {}} onFocus={onfocus}/>
                        <MenuButton icon="💡" title="Suggestions" onClick={() => {}} onFocus={onfocus}/>
                        <MenuButton icon="⚙️" title="Entropy" onClick={() => {}} onFocus={onfocus}>
                            <MenuButton icon="⚙️" title="Base Entropy: low" onClick={() => {}} onFocus={onfocus} />
                            <MenuButton icon="⚙️" title="Action Entropy: low" onClick={() => {}} onFocus={onfocus} />
                        </MenuButton>
                        <MenuButton icon="♻️" title="Restart Game" onClick={() => {}} onFocus={onfocus} />
                        <MenuButton icon="🗑️" title="Quit Game" onClick={() => {}} onFocus={onfocus} />
                    </MenuTree>
                </div>
            </div>
        </div>
    );
};
export default _Menu;
