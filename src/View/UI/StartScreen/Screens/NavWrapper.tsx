import { NavigationContext } from "../Context";
import { XY } from "../Menu/Tree";
import { ScreenNavigator } from "./ScreenNavigator";
import React from "react";
import Keyboard from "../../../Game/Keyboard";
import GamePad from "../../../Game/GamePad";
import { TreeNavigator } from "../TreeNavigator";

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

    const onCancel = () =>
        setNavigation({ ...navigation, focus: "menu", screeen: "", mainMenu: navigation.mainMenu, menu: { ...navigation.menu } });

    const onUp = () => assignState(navigator.moveUp(navigation.screen.x, navigation.screen.y));

    const onDown = () => assignState(navigator.moveDown(navigation.screen.x, navigation.screen.y));

    const onLeft = () => assignState(navigator.moveLeft(navigation.screen.x, navigation.screen.y));

    const onRight = () => assignState(navigator.moveRight(navigation.screen.x, navigation.screen.y));

    const onAction = () => {
        navigator.action(navigation.screen);
    };

    return navigation.focus == "screen" ? (
        <>
            <Keyboard onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} onCancel={onCancel} />
            <GamePad onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} onCancel={onCancel} />
        </>
    ) : null;
};
export default NavWrapper;

export const TreeNavWrapper = (props: { navigator: TreeNavigator }) => {
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

    const onCancel = () =>
        setNavigation({ ...navigation, focus: "menu", screeen: "", mainMenu: navigation.mainMenu, menu: { ...navigation.menu } });

    const onUp = () => assignState(navigator.moveUp(navigation.menu.x, navigation.menu.y));

    const onDown = () => assignState(navigator.moveDown(navigation.menu.x, navigation.menu.y));

    const onLeft = () => assignState(navigator.moveLeft(navigation.menu.x, navigation.menu.y));

    const onRight = () => assignState(navigator.moveRight(navigation.menu.x, navigation.menu.y));

    const onAction = () => {
        navigator.action(navigation.menu);
    };

    return navigation.focus == "menu" ? (
        <>
            <Keyboard onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} onCancel={onCancel} />
            <GamePad onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} onCancel={onCancel} />
        </>
    ) : null;
};
