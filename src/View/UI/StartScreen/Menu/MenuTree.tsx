import KeyboardLayout from "../../../Game/KeyboardLayouts";
import React from "react";
import { TreeNavWrapper } from "../Screens/NavWrapper";
import { TreeNavigator } from "./TreeNavigator";

const MenuTree = (props: { children: any[]; keyboardLayout: KeyboardLayout }) => {
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
            <TreeNavWrapper navigator={navigator} keyboardLayout={props.keyboardLayout} />
        </>
    );
};
export default MenuTree;
