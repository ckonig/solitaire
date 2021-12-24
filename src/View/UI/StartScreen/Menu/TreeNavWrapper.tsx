import GamePad from "../../../../common/GamePad";
import GamepadLayout from "../../../../common/GamepadLayout";
import Keyboard from "../../../../common/Keyboard";
import KeyboardLayout from "../../../../common/KeyboardLayouts";
import React from "react";
import { TreeNavigator } from "../Menu/TreeNavigator";
import { XY } from "../../XY";
import useNavigationContext from "../Navigation/NavigationContext";

const TreeNavWrapper = (props: { navigator: TreeNavigator; keyboardLayout: KeyboardLayout; disabled?: boolean }) => {
    const { navigator } = props;
    const { navigation, setNavigation } = useNavigationContext();

    const assignState = (result: XY) => {
        if (navigation.focus === "menu") {
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

    return navigation.focus === "menu" && !props.disabled ? (
        <>
            <Keyboard layout={props.keyboardLayout} {...inputHandlers} />
            <GamePad layout={GamepadLayout} {...inputHandlers} />
        </>
    ) : null;
};

export default TreeNavWrapper;
