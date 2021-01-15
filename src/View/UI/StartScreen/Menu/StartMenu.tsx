import "../Menu.scss";

import ConsentDialog from "../ConsentDialog";
import GameModes from "../../../../GameModes";
import MenuButton from "./MenuButton";
import MenuTitle from "./MenuTitle";
import MenuTree from "./MenuTree";
import React from "react";
import { Universal } from "../../../../common/KeyboardLayouts";
import VerticalMenu from "./VerticalMenu";
import { XY } from "../../XY";
import useCookieContext from "../../CookieContext";
import useNavigationContext from "../NavigationContext";
import { useOverlayContext } from "../../../../common/Overlay";

const StartMenu = (props: { start: (boardMode: string) => void }) => {
    const { navigation, setNavigation } = useNavigationContext();
    const { consented } = useCookieContext();

    const switchToScreen = (s: string, pos: XY) =>
        setNavigation({
            ...navigation,
            focus: "screen",
            screeen: s,
            screen: { x: -1, y: -1 },
            menu: { ...pos },
        });

    const switchToMenu = (menu: string, pos: XY) =>
        setNavigation({
            ...navigation,
            focus: "menu",
            screeen: "",
            mainMenu: menu,
            menu: { ...pos },
        });

    const toggleScreen = (s: string, pos: XY) => {
        if (navigation.screeen !== s) {
            switchToScreen(s, pos);
        } else {
            switchToMenu(navigation.mainMenu, pos);
        }
    };

    const toggleMainMenu = (val: string, pos: XY) => switchToMenu(navigation.mainMenu !== val ? val : "", pos);

    const { toggleOverlay, overlayActive } = useOverlayContext();
    const _toggleOverlay = (children: any) => {
        toggleOverlay(
            children,
            () => {
                setNavigation({ ...navigation, focus: "dialog" });
            },
            () => {
                setNavigation({ ...navigation, focus: "menu" });
            }
        );
    };

    return (
        <VerticalMenu>
            <MenuTitle label="♦ Solitaire" />
            <MenuTree keyboardLayout={Universal} disabled={overlayActive}>
                <MenuButton icon="🎲" title="Single Player" onClick={() => props.start(GameModes.SINGLEPLAYER)} />
                <MenuButton
                    icon="⚔️"
                    title="Versus"
                    onClick={(pos: XY) => toggleMainMenu("versus", pos)}
                    toggled={navigation.mainMenu === "versus"}
                >
                    <MenuButton
                        icon="🎮"
                        title="Player 1"
                        onClick={(pos: XY) => toggleScreen("controls0", pos)}
                        toggled={navigation.screeen === "controls0"}
                    />
                    <MenuButton
                        icon="🎮"
                        title="Player 2"
                        onClick={(pos: XY) => toggleScreen("controls1", pos)}
                        toggled={navigation.screeen === "controls1"}
                    />
                    <MenuButton icon="🎲" title="Start" onClick={() => props.start(GameModes.VERSUS)} />
                </MenuButton>
                <MenuButton
                    icon="⚙️"
                    title="Options"
                    onClick={(pos: XY) => toggleMainMenu("custom", pos)}
                    toggled={navigation.mainMenu === "custom"}
                >
                    <MenuButton
                        icon="💪"
                        title="Difficulty"
                        onClick={(pos: XY) => toggleScreen("difficulty", pos)}
                        toggled={navigation.screeen === "difficulty"}
                    />
                    <MenuButton
                        icon="⚖️"
                        title="Penalties"
                        onClick={(pos: XY) => toggleScreen("rating", pos)}
                        toggled={navigation.screeen === "rating"}
                    />
                    <MenuButton
                        icon="💡"
                        title="Suggestions"
                        onClick={(pos: XY) => toggleScreen("suggestions", pos)}
                        toggled={navigation.screeen === "suggestions"}
                    />
                    <MenuButton
                        icon="🤖"
                        title="Support"
                        onClick={(pos: XY) => toggleScreen("support", pos)}
                        toggled={navigation.screeen === "support"}
                    />
                    <MenuButton
                        icon="🌪️"
                        title="Entropy"
                        onClick={(pos: XY) => toggleScreen("settings", pos)}
                        toggled={navigation.screeen === "settings"}
                    />
                </MenuButton>
                <MenuButton
                    icon="🍪"
                    title={consented ? "Delete Cookie" : "Allow Cookie"}
                    onClick={() => _toggleOverlay(<ConsentDialog />)}
                />
            </MenuTree>
        </VerticalMenu>
    );
};
export default StartMenu;
