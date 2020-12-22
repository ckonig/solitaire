import GlobalContext from "../../Context";
import PauseContext from "../../PauseContext";
import React from "react";

const ToggleMenu = () => {
    const { state, updateContext } = React.useContext(GlobalContext);

    const pause = React.useContext(PauseContext);

    const toggleMenu = (menu) => {
        updateContext((state) => {
            if (state.settings.showMenu == menu) {
                state.settings.showMenu = !state.settings.showMenu;
                pause.togglePause(!state.settings.showMenu, state.player);
            }
        });
    };

    return (
        <div>
            <button disabled={pause.state.pauses.length >= pause.state.allowed} title="Settings" onClick={() => toggleMenu(state.settings.showMenu)}>
                ⚙️
            </button>
        </div>
    );
};

export default ToggleMenu;
