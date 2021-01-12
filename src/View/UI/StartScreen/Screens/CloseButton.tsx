import React from "react";
import useNavigationContext from "../NavigationContext";

const CloseButton = () => {
    const { closeScreen } = useNavigationContext();
    return (
        <div className="closer">
            <button onClick={closeScreen}>🗙</button>
        </div>
    );
};

export default CloseButton;
