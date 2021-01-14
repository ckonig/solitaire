import { ConsentObject } from "../StorageManager";
import MenuButton from "./Menu/MenuButton";
import MenuTitle from "./Menu/MenuTitle";
import MenuTree from "./Menu/MenuTree";
import { NavigationProvider } from "./NavigationContext";
import React from "react";
import { Universal } from "../../../common/KeyboardLayouts";
import useCookieContext from "../CookieContext";
import { useOverlayContext } from "../../../common/Overlay";

const ConsentDialog = (props: { consent: ConsentObject }) => {
    const { setConsented } = useCookieContext();
    const { toggleOverlay } = useOverlayContext();
    //@todo depending on state, use different colors and order of items.
    //also show different labels on buttons
    //@todo custom css classes for dialog menus, no minimum height
    return (
        <NavigationProvider>
            <div className="overlay gamemenu menu dialog">
                <div className="startscreen-jail">
                    <div className="innermenu">
                        <MenuTitle label="🍪" />
                        <div className="announcement">{props.consent.prompt}</div>
                        <MenuTree keyboardLayout={Universal}>
                            <MenuButton
                                icon="👍"
                                title="I Accept"
                                onClick={() => {
                                    setConsented(props.consent.confirm());
                                    toggleOverlay();
                                    //@todo @bug after closing overlay, up & down nav works but not the action button
                                }}
                            />
                            <MenuButton icon="👎" title="No Thanks" onClick={() => toggleOverlay()} />
                        </MenuTree>
                    </div>
                </div>
            </div>
        </NavigationProvider>
    );
};
export default ConsentDialog;
