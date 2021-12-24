import { mdiFlagOutline, mdiHandBackLeft, mdiPlay } from "@mdi/js";

import MenuButton from "./StartScreen/Menu/MenuButton";
import MenuTitle from "./StartScreen/Menu/MenuTitle";
import MenuTree from "./StartScreen/Menu/MenuTree";
import { NavigationProvider } from "./StartScreen/Navigation/NavigationContext";
import React from "react";
import { Universal } from "../../common/KeyboardLayouts";
import useGlobalContext from "../GlobalContext";
import usePauseContext from "../Context/PauseContext";
import useTokenEffect from "../useGlobalTokenEffect";

const PossibleFailScreen = () => {
    const { state } = useGlobalContext();
    const [refused, setRefused] = React.useState<{ refused: boolean; since: number }>({ refused: false, since: 0 });
    const refuse = (val: boolean) => {
        setRefused({
            refused: refused.since >= 3 ? false : val,
            since: refused.since >= 3 ? 0 : refused.since + 1,
        });
    };
    useTokenEffect(() => {
        if (!state.hand.currentCard() && refused.refused) {
            refuse(true);
        }
    });
    const pause = usePauseContext();
    //@todo
    //instead of immediate quit, use gamestate.giveUp, then allow quitting via EndScreen
    //in versus this lets the other player gloat and confirm before exiting game
    const { restart } = useGlobalContext();
    React.useEffect(() => {
        if (!pause.state.showMenu) {
            pause.toggleMenu(true);
        }
        return () => pause.toggleMenu(false);
        //@todo antipattern?
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refused.refused]);
    return !refused.refused ? (
        <NavigationProvider>
            <div className="gamemenu menu dialog">
                <div className="startscreen-jail">
                    <div className="innermenu">
                        <MenuTitle icon={mdiHandBackLeft} />
                        <div className="announcement">The game might be over</div>
                        <MenuTree keyboardLayout={Universal}>
                            <MenuButton
                                icon={mdiPlay}
                                title="Keep trying"
                                onClick={() => {
                                    refuse(true);
                                }}
                            />
                            <MenuButton icon={mdiFlagOutline} title="Give up" onClick={() => restart()} />
                        </MenuTree>
                    </div>
                </div>
            </div>
        </NavigationProvider>
    ) : null;
};
export default PossibleFailScreen;
