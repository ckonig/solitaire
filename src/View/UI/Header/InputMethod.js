import GlobalContext from "../../Context";
import React from "react";

const InputMethod = () => {
    //⌨️
    //🎮
    //
    const { state } = React.useContext(GlobalContext);
    let icon = "🖱️";
    icon = state.settings.launchSettings.inputMode == "keyboard" ? "⌨️" : icon;
    icon = state.settings.launchSettings.inputMode == "gamepad" ? "🎮" : icon;

    return <div><button>{icon}</button></div>;
};

export default InputMethod;
