import Icon from "@mdi/react";
import React from "react";

const MenuTitle = (props: { label?: string, icon: string }) => {
    return <div className="title maintitle"><Icon size=".8em" path={props.icon} />{props.label}</div>;
};
export default MenuTitle;
