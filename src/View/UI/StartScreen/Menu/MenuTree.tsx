import KeyboardLayout from "../../../Game/KeyboardLayouts";
import React from "react";
import { TreeNavWrapper } from "../Screens/NavWrapper";
import { TreeNavigator } from "./TreeNavigator";

const MenuTree = (props: { children: any[]; keyboardLayout: KeyboardLayout }) => {
    const navigator = new TreeNavigator();
    navigator.rows = [];
    let index = -1;
    const addItem = (child: any) => {
        const assign = () => {
            navigator.rows[index] = { x: index, y: 0, ...child.props, buttons: [] };
        };
        if (!child.props.skip) {
            index++;
            assign();
        }
        return React.cloneElement(child, { x: index, y: 0, navigator: navigator });
    };
    return (
        <>
            {props.children.map(addItem)}
            <TreeNavWrapper navigator={navigator} keyboardLayout={props.keyboardLayout} />
        </>
    );
};
export default MenuTree;
