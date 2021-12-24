import { mdiCookie, mdiThumbDown, mdiThumbUp } from "@mdi/js";

import MenuButton from "./Menu/MenuButton";
import MenuTitle from "./Menu/MenuTitle";
import MenuTree from "./Menu/MenuTree";
import { NavigationProvider } from "./Navigation/NavigationContext";
import React from "react";
import StorageManager from "../StorageManager";
import { Universal } from "../../../common/KeyboardLayouts";
import useCookieContext from "../CookieContext";
import { useOverlayContext } from "../../../common/Overlay";

const ConsentDialog = () => {
    const { setConsented, consented } = useCookieContext();
    const storage = StorageManager.getInstance();
    const consent = storage.getDialog();
    const { toggleOverlay } = useOverlayContext();
    //@todo depending on state, use different colors and order of items.
    //also show different labels on buttons
    return (
        <NavigationProvider>
            <div className="gamemenu menu dialog">
                <div className="startscreen-jail">
                    <div className="innermenu">
                        <MenuTitle icon={mdiCookie  } />
                        <div className="announcement">{consent.prompt}</div>
                        <MenuTree keyboardLayout={Universal}>
                            <MenuButton
                                icon={mdiThumbUp}
                                title={consented ? "Delete cookie": "Allow cookie"}
                                onClick={() => {
                                    setConsented(consent.confirm());
                                    toggleOverlay();
                                    //@todo @bug after closing overlay, up & down nav works but not the action button
                                }}
                            />
                            <MenuButton icon={mdiThumbDown } title="Cancel" onClick={() => toggleOverlay()} />
                        </MenuTree>
                    </div>
                </div>
            </div>
        </NavigationProvider>
    );
};
export default ConsentDialog;
