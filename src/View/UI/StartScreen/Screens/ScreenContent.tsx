import NavWrapper from "./NavWrapper";
import { ScreenNavigator } from "./ScreenNavigator";
import React from "react";

const ScreenContent = (props: { id: string; children: any[] }) => {
    const navigator = new ScreenNavigator();
    let _index = -1;
    const addRow = (child: any) => {
        if (!child.props.skip) {
            _index++;
            navigator.rows[_index] = { buttons: [] };
        }
        return React.cloneElement(child, { key: _index, x: 0, y: _index, navigator: navigator });
    };
    return (
        <div className="content">
            {props.children.map((child) => addRow(child))}
            <NavWrapper navigator={navigator} screen="rating" />
        </div>
    );
};

export default ScreenContent;
