import StartScreenContext from "../Context";
import { XY } from "../Menu/Tree";
import { ScreenNavigator } from "./ScreenNavigator";
import React from "react";
import Keyboard from "../../../Game/Keyboard";
import GamePad from "../../../Game/GamePad";

const NavWrapper = (props: { navigator: ScreenNavigator; screen: string }) => {
    const { navigator } = props;

    const { state, setState } = React.useContext(StartScreenContext);

    const assignState = (result: XY) => {
        if (state.focus == "screen") {
            setState({ ...state, screen: result });
        }
        if (state.focus == "menu") {
            throw "Invalid navigation action";
        }
    };

    const onCancel = () => setState({ ...state, focus: "menu", screeen: "", mainMenu: state.mainMenu, menu: { ...state.menu } });

    const onUp = () => assignState(navigator.moveUp(state.screen.x, state.screen.y));

    const onDown = () => assignState(navigator.moveDown(state.screen.x, state.screen.y));

    const onLeft = () => assignState(navigator.moveLeft(state.screen.x, state.screen.y));

    const onRight = () => assignState(navigator.moveRight(state.screen.x, state.screen.y));

    const onAction = () => {
        navigator.action(state.screen);
    };

    return state.focus == "screen" ? (
        <>
            <Keyboard onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} onCancel={onCancel} />
            <GamePad onUp={onUp} onDown={onDown} onRight={onRight} onLeft={onLeft} onAction={onAction} onCancel={onCancel} />
        </>
    ) : null;
};
export default NavWrapper;
