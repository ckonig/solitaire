import "../../Style/Header.css";

import Clock from "./Clock";
import EndGame from "./EndGame";
import Hearts from "./Hearts";
import Hint from "./Hint";
import Points from "./Points";
import React from "react";
import RestartGame from "../RestartGame";
import ToggleMenu from "./ToggleMenu";
import Undo from "./Undo";

const Header = () => (
    <div className="header">
        <div className="header-title">
            <Hearts />
            <Points />
        </div>
        <Clock />
        <div className="header-buttons">
            <Hint />
            <Undo />
            <RestartGame />
            <EndGame />
            <ToggleMenu />
        </div>
    </div>
);

export default Header;
