import MenuButton from "../UI/StartScreen/Menu/MenuButton";
import MenuTitle from "../UI/StartScreen/Menu/MenuTitle";
import MenuTree from "../UI/StartScreen/Menu/MenuTree";
import { NavigationProvider } from "../UI/StartScreen/NavigationContext";
import React from "react";
import { Universal } from "../../common/KeyboardLayouts";
import useGlobalContext from "../GlobalContext";
import usePauseContext from "./PauseContext";

const PossibleFailScreen = () => {
    const { state } = useGlobalContext();
    const [refused, setRefused] = React.useState<boolean>(false);
    const [refusedSince, setRefusedSince] = React.useState<number>(0);
    React.useEffect(() => {
        if (!state.hand.currentCard()) {
            if (refused) {
                setRefusedSince(refusedSince + 1);
            }
            //@todo allow backoff controlling via props
            //certain fail: 3, potential fail: 10
            if (refusedSince >= 2) {
                setRefusedSince(0);
                setRefused(false);
            }
        }
    }, [state.token]);
    const pause = usePauseContext();
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
