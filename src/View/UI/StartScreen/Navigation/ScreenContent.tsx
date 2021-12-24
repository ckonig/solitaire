import React from "react";
import ScreenNavWrapper from "./ScreenNavWrapper";
import { ScreenNavigator } from "./ScreenNavigator";

const ScreenContent = (props: { id: string; children: any[] }) => {
    const navigator = new ScreenNavigator();
    let _index = -1;
    let _i = -1;
    const addRow = (child: any) => {
        _i++;
        if (!child.props.skip) {
            _index++;
            navigator.rows[_index] = { buttons: [] };
        }
        return React.cloneElement(child, { key: _i, x: 0, y: _index, navigator: navigator });
    };
    return (
        <div className="content">
            {props.children.map((child) => addRow(child))}
            <ScreenNavWrapper navigator={navigator} screen="rating" />
        </div>
    );
};

export default ScreenContent;
