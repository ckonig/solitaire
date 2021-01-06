import "../../Style/Header.css";

import Clock from "./Clock";
import Hearts from "./Hearts";
import Hint from "./Hint";
import Points from "./Points";
import React from "react";
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
            <Hint />
            <Undo />
            <ToggleMenu />
        </div>
    </div>
);

export default Header;
