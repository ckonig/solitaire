import GamePad from "../../../../common/GamePad";
import GamepadLayout from "../../../../common/GamepadLayout";
import Keyboard from "../../../../common/Keyboard";
import React from "react";
import { ScreenNavigator } from "./ScreenNavigator";
import { Universal } from "../../../../common/KeyboardLayouts";
import { XY } from "../../XY";
import useNavigationContext from "../NavigationContext";

const ScreenNavWrapper = (props: { navigator: ScreenNavigator; screen: string }) => {
    const { navigator } = props;
    const { navigation, setNavigation } = useNavigationContext();

    const assignState = (result: XY) => {
        if (navigation.focus === "screen") {
            setNavigation({ ...navigation, screen: result });
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

    return navigation.focus === "screen" ? (
        <>
            <Keyboard layout={Universal} {...inputHandlers} />
            <GamePad layout={GamepadLayout} {...inputHandlers} />
        </>
    ) : null;
};
export default ScreenNavWrapper;
