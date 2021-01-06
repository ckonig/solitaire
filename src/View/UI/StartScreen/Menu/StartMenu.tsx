import { CookieContext } from "../../../Context";
import GameModes from "../../../../GameModes";
import MenuButton from "./MenuButton";
import MenuTitle from "./MenuTitle";
import MenuTree from "./MenuTree";
import { NavigationContext } from "../Context";
import React from "react";
import StorageManager from "../../StorageManager";
import VerticalMenu from "./VerticalMenu";
import { XY } from "../../XY";

const StartMenu = (props: { start: (boardMode: string) => void }) => {
    const { navigation, setNavigation } = React.useContext(NavigationContext);
    const { consented, setConsented } = React.useContext(CookieContext);

    const switchToScreen = (s: string, pos: XY) =>
        setNavigation({ ...navigation, focus: "screen", screeen: s, screen: { x: -1, y: -1 }, menu: { ...pos } });

    const switchToMenu = (menu: string, pos: XY) =>
        setNavigation({ ...navigation, focus: "menu", screeen: "", mainMenu: menu, menu: { ...pos } });

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
        <VerticalMenu>
            <MenuTitle label="♦ Solitaire" />

            <MenuTree>
                <MenuButton icon="🎲" title="Single Player" onClick={() => props.start(GameModes.CUSTOM.boardMode)} onFocus={onfocus} />
                <MenuButton
                    icon="⚔️"
                    title="Versus"
                    onClick={(pos: XY) => toggleMainMenu("versus", pos)}
                    onFocus={onfocus}
                    toggled={navigation.mainMenu == "versus"}
                >
                    <MenuButton
                        icon="🎮"
                        title="Player 1"
                        onClick={(pos: XY) => toggleScreen("controls0", pos)}
                        onFocus={onfocus}
                        toggled={navigation.screeen == "controls0"}
                    />
                    <MenuButton
                        icon="🎮"
                        title="Player 2"
                        onClick={(pos: XY) => toggleScreen("controls1", pos)}
                        onFocus={onfocus}
                        toggled={navigation.screeen == "controls1"}
                    />
                    <MenuButton icon="🎲" title="Start" onClick={() => props.start(GameModes.VERSUS.boardMode)} onFocus={onfocus} />
                </MenuButton>
                <MenuButton
                    icon="⚙️"
                    title="Options"
                    onClick={(pos: XY) => toggleMainMenu("custom", pos)}
                    onFocus={onfocus}
                    toggled={navigation.mainMenu == "custom"}
                >
                    <MenuButton
                        icon="💪"
                        title="Difficulty"
                        onClick={(pos: XY) => toggleScreen("difficulty", pos)}
                        onFocus={onfocus}
                        toggled={navigation.screeen == "difficulty"}
                    />
                    <MenuButton
                        icon="⚖️"
                        title="Penalties"
                        onClick={(pos: XY) => toggleScreen("rating", pos)}
                        onFocus={onfocus}
                        toggled={navigation.screeen == "rating"}
                    />
                    <MenuButton
                        icon="🧰"
                        title="Various"
                        onClick={(pos: XY) => toggleScreen("settings", pos)}
                        onFocus={onfocus}
                        toggled={navigation.screeen == "settings"}
                    />
                </MenuButton>
                <MenuButton
                    icon="🍪"
                    title={consented ? "Delete Cookie" : "Allow Cookie"}
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
    );
};
export default StartMenu;
