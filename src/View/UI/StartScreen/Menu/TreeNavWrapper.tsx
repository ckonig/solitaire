import GamePad from "../../../../common/GamePad";
import Keyboard from "../../../../common/Keyboard";
import KeyboardLayout from "../../../../common/KeyboardLayouts";
import { NavigationContext } from "../Context";
import React from "react";
import { TreeNavigator } from "../Menu/TreeNavigator";
import { XY } from "../../XY";

const TreeNavWrapper = (props: { navigator: TreeNavigator; keyboardLayout: KeyboardLayout }) => {
    const { navigator } = props;
    const { navigation, setNavigation } = React.useContext(NavigationContext);

    const assignState = (result: XY) => {
        if (navigation.focus == "menu") {
            setNavigation({ ...navigation, menu: result });
        }
    };

    const inputHandlers = {
        onCancel: () =>
            setNavigation({ ...navigation, focus: "menu", screeen: "", mainMenu: navigation.mainMenu, menu: { ...navigation.menu } }),
        onUp: () => assignState(navigator.moveUp(navigation.menu.x, navigation.menu.y)),
        onDown: () => assignState(navigator.moveDown(navigation.menu.x, navigation.menu.y)),
        onLeft: () => assignState(navigator.moveLeft(navigation.menu.x, navigation.menu.y)),
        onRight: () => assignState(navigator.moveRight(navigation.menu.x, navigation.menu.y)),
        onAction: () => navigator.action(navigation.menu),
    };

    return navigation.focus == "menu" ? (
        <>
            <Keyboard layout={props.keyboardLayout} {...inputHandlers} />
            <GamePad {...inputHandlers} />
        </>
    ) : null;
};

export default TreeNavWrapper;
