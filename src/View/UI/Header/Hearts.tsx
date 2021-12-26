import { mdiHeart, mdiHeartFlash, mdiHeartOff } from "@mdi/js";

import Icon from "@mdi/react";
import React from "react";
import useGlobalContext from "../../GlobalContext";

const Hearts = () => {
    const { state } = useGlobalContext();
    const getHearts = () => {
        const _icon = (path: string) => <Icon path={path} size=".9em" />;
        if (state.settings.launchSettings.recyclingMode === "infinite") {
            return <Icon path={mdiHeartFlash} size=".9em" />;
        }

        if (state.settings.launchSettings.recyclingMode === "1-pass") {
            return state.stock.passes > 0 ? _icon(mdiHeart) : _icon(mdiHeartOff);
        }

        if (state.settings.launchSettings.recyclingMode === "3-pass") {
            const createString = (length: number, icon: string) => Array.from(new Array(length).keys()).map((i) => _icon(icon));
            return [...createString(state.stock.passes, mdiHeart), ...createString(3 - state.stock.passes, mdiHeartOff)];
        }
        return null;
    };
    return <div className="heart-container">{getHearts()}</div>;
};
export default Hearts;
