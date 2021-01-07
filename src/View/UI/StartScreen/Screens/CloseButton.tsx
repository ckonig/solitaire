import React from "react";
import ScreenContext from "./Context";

const CloseButton = () => {
    const { closeScreen } = React.useContext(ScreenContext);
    return (
        <div className="closer">
            <button onClick={closeScreen}>🗙</button>
        </div>
    );
};

export default CloseButton;
