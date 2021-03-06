import KeyboardLayout from "../../../../common/KeyboardLayouts";
import React from "react";
import TreeNavWrapper from "./TreeNavWrapper";
import { TreeNavigator } from "./TreeNavigator";

const MenuTree = (props: { children: any[]; keyboardLayout: KeyboardLayout; disabled?: boolean }) => {
    const navigator = new TreeNavigator();
    navigator.rows = [];
    let index = -1;
    let _i = -1;
    const addItem = (child: any) => {
        _i++;
        if (!child.props.skip) {
            index++;
            navigator.rows[index] = { x: index, y: 0, ...child.props, buttons: [] };
        }
        return React.cloneElement(child, { key: _i, x: index, y: 0, navigator: navigator });
    };
    return (
        <>
            {props.children.map(addItem)}
            <TreeNavWrapper disabled={props.disabled} navigator={navigator} keyboardLayout={props.keyboardLayout} />
        </>
    );
};
export default MenuTree;
