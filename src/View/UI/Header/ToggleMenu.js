import GlobalContext from "../../Context";
import React from "react";

const ToggleMenu = () => {
    const { state, updateContext } = React.useContext(GlobalContext);

    const toggleMenu = (menu) => {
        updateContext((state) => {
            if (state.settings.showMenu == menu) {
                state.settings.showMenu = !state.settings.showMenu;
            }
        });
    };

    return (
        <div>
            <button title="Settings" onClick={() => toggleMenu(state.settings.showMenu)}>
            <span className="icon">☰</span>
            </button>
        </div>
    );
};

export default ToggleMenu;
