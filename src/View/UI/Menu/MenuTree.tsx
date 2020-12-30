import React from "react";
import { TreeNavWrapper } from "../StartScreen/Screens/NavWrapper";
import { TreeNavigator } from "../StartScreen/TreeNavigator";

const MenuTree = (props: { children: any[] }) => {
    const navigator = new TreeNavigator();
    navigator.rows = [];
    const addItem = (child: any, index: number) => {
        navigator.rows[index] = { x: index, y: 0, ...child.props, buttons: [] };
        return React.cloneElement(child, { x: index, y: 0, navigator: navigator });
    };
    return (
        <>
            {props.children.map(addItem)}
            <TreeNavWrapper navigator={navigator} />
        </>
    );
};
export default MenuTree;
