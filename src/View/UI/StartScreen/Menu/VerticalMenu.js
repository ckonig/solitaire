import React from "react";

const VerticalMenu = (props) => {
    return (
        <div className="ui menu">
            <div className="startscreen-jail">
                <div className="innermenu">{props.children}</div>
            </div>
        </div>
    );
};
export default VerticalMenu;
