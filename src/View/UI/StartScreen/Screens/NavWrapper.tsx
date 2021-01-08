import KeyboardLayout, { Universal } from "../../../Game/KeyboardLayouts";

import GamePad from "../../../Game/GamePad";
import Keyboard from "../../../Game/Keyboard";
import { NavigationContext } from "../Context";
import React from "react";
import { ScreenNavigator } from "./ScreenNavigator";
import { TreeNavigator } from "../Menu/TreeNavigator";
import { XY } from "../../XY";

const NavWrapper = (props: { navigator: ScreenNavigator; screen: string }) => {
    const { navigator } = props;

    const { navigation, setNavigation } = React.useContext(NavigationContext);

    const assignState = (result: XY) => {
        if (navigation.focus == "screen") {
            setNavigation({ ...navigation, screen: result });
        }
        if (navigation.focus == "menu") {
            throw "Invalid navigation action";
        }
    };

    const inputHandlers = {
        onCancel: () =>
            setNavigation({ ...navigation, focus: "menu", screeen: "", mainMenu: navigation.mainMenu, menu: { ...navigation.menu } }),
        onUp: () => assignState(navigator.moveUp(navigation.screen.x, navigation.screen.y)),
        onDown: () => assignState(navigator.moveDown(navigation.screen.x, navigation.screen.y)),
        onLeft: () => assignState(navigator.moveLeft(navigation.screen.x, navigation.screen.y)),
        onRight: () => assignState(navigator.moveRight(navigation.screen.x, navigation.screen.y)),
        onAction: () => navigator.action(navigation.screen),
    };

    return navigation.focus == "screen" ? (
        <>
            <Keyboard layout={Universal} {...inputHandlers} />
            <GamePad {...inputHandlers} />
        </>
    ) : null;
};
export default NavWrapper;

export const TreeNavWrapper = (props: { navigator: TreeNavigator; keyboardLayout: KeyboardLayout }) => {
    const { navigator } = props;

    const { navigation, setNavigation } = React.useContext(NavigationContext);

    const assignState = (result: XY) => {
        if (navigation.focus == "menu") {
            setNavigation({ ...navigation, menu: result });
        }
        if (navigation.focus == "screen") {
            throw "Invalid navigation action";
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
