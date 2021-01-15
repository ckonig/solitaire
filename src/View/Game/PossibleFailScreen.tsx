import MenuButton from "../UI/StartScreen/Menu/MenuButton";
import MenuTitle from "../UI/StartScreen/Menu/MenuTitle";
import MenuTree from "../UI/StartScreen/Menu/MenuTree";
import { NavigationProvider } from "../UI/StartScreen/NavigationContext";
import PauseContext from "./PauseContext";
import React from "react";
import { Universal } from "../../common/KeyboardLayouts";
import useGlobalContext from "../GlobalContext";

const PossibleFailScreen = () => {
    //@todo allow tracking refusal via props, for less certain cases.
    //this implementation will re-show the component after every move which is fine for now.
    const [refused, setRefused] = React.useState<boolean>(false);
    const pause = React.useContext(PauseContext);
    //instead of immediate quit, use gamestate.giveUp
    //quitting via EndScreen
    //in versus this lets the other player gloat and confirm before exiting game
    const { restart } = useGlobalContext();
    React.useEffect(() => {
        if (!pause.state.showMenu) {
            pause.toggleMenu(true);
        }
        return () => pause.toggleMenu(false);
    }, [refused]);
    return !refused ? (
        <NavigationProvider>
            <div className="gamemenu menu dialog">
                <div className="startscreen-jail">
                    <div className="innermenu">
                        <MenuTitle label="✋" />
                        <div className="announcement">The game might be over</div>
                        <MenuTree keyboardLayout={Universal}>
                            <MenuButton
                                icon="▶️"
                                title="Keep trying"
                                onClick={() => {
                                    setRefused(true);
                                }}
                            />
                            <MenuButton icon="🏳️" title="Give up" onClick={() => restart()} />
                        </MenuTree>
                    </div>
                </div>
            </div>
        </NavigationProvider>
    ) : null;
};
export default PossibleFailScreen;
