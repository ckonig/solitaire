import "../../Style/Header.css";

import Clock from "./Clock";
import EndGame from "./EndGame";
import Hearts from "./Hearts";
import Hint from "./Hint";
import InputMethod from "./InputMethod";
import Pause from "./Pause";
import Points from "./Points";
import React from "react";
import RestartGame from "./RestartGame";
import ToggleMenu from "./ToggleMenu";
import Undo from "./Undo";

const Header = (props) => (
    <div className={"header " + props.mode}>
        <div className="header-title">
            <Hearts />
            <Points />
        </div>
        <Clock />
        <div className="header-buttons">
            <InputMethod />
            <Hint />
            <Undo />
            <Pause />
            <RestartGame />
            <EndGame />
            <ToggleMenu />
        </div>
    </div>
);

export default Header;
