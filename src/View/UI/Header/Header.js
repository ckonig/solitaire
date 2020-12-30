import "../../Style/Header.css";

import Clock from "./Clock";
import Hearts from "./Hearts";
import Points from "./Points";
import React from "react";
import ToggleMenu from "./ToggleMenu";

const Header = (props) => (
    <div className={"header " + props.mode}>
        <div className="header-title">
            <Hearts />
            <Points />
        </div>
        <Clock />
        <div className="header-buttons">
            <ToggleMenu />
        </div>
    </div>
);

export default Header;
