import React from "react";
import ScreenContext from "./ScreenContext";

const CloseButton = () => {
    const { closeScreen } = React.useContext(ScreenContext);
    return (
        <div className="closer">
            <button onClick={closeScreen}>🗙</button>
        </div>
    );
};

export default CloseButton;
