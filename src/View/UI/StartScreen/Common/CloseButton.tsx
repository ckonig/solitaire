import React from "react";
import useNavigationContext from "../Navigation/NavigationContext";

const CloseButton = () => {
    const { closeScreen } = useNavigationContext();
    return (
        <div className="closer">
            <button onClick={closeScreen}>🗙</button>
        </div>
    );
};

export default CloseButton;
