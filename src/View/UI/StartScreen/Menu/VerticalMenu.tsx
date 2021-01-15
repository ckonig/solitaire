import React from "react";

const VerticalMenu = (props: any) => {
    return (
        <div className="ui start menu">
            <div className="startscreen-jail">
                <div className="innermenu">{props.children}</div>
            </div>
        </div>
    );
};
export default VerticalMenu;
