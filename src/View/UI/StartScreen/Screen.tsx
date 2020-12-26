import Controls from "./Controls";
import Difficulty, { getDifficultyNav, getDifficultyRows } from "./Difficulty";
import QuickStart, { getSettingNav, getSettingRows } from "./QuickStart";
import Rating, { getRatingRows, getRatingNav } from "./Rating";
import React from "react";
import { NavHandler, XY } from "./Tree";
import { StartScreenState } from "../../../Common";
import StartScreenContext from "./Context";
import Keyboard from "../../Game/Keyboard";
import GamePad from "../../Game/GamePad";

export class ScreenNavigator implements NavHandler {
    screen: string;
    state: StartScreenState;
    constructor(screen: string, state: StartScreenState) {
        this.screen = screen;
        this.state = state;
    }
    getRows = () => {
        if (this.screen == "rating") {
            return getRatingRows();
        }
        if (this.screen == "settings") {
            return getSettingRows(this.state);
        }
        if (this.screen == "difficulty") {
            return getDifficultyRows();
        }
        return [];
    };
    getRow = (x: number) => this.getRows()[x];
    moveUp: (x: number, y: number) => XY = (x: number, y: number) => {
        const rows = this.getRows();
        console.debug(rows, x, y);
        if (rows.length < 2) {
            return { x: x, y: y };
        }
        if (y == 0) {
            return { x: x, y: rows.length - 1 };
        }
        return { x: x, y: y - 1 };
    };
    moveDown: (x: number, y: number) => XY = (x: number, y: number) => {
        const rows = this.getRows();
        console.debug(rows, x, y);
        if (rows.length < 2) {
            return { x: x, y: y };
        }
        if (y == rows.length - 1) {
            return { x: x, y: 0 };
        }
        return { x: x, y: y + 1 };
    };
    moveLeft: (x: number, y: number) => XY = (x: number, y: number) => {
        const row = this.getRow(y);
        console.debug(row, x, y);
        if (x == 0) {
            return { x: row.buttons.length - 1, y: y };
        }
        return { x: x - 1, y: y };
    };
    moveRight: (x: number, y: number) => XY = (x: number, y: number) => {
        const row = this.getRow(y);
        console.debug(row, x, y);
        if (x == row.buttons.length - 1) {
            return { x: 0, y: y };
        }
        return { x: x + 1, y: y };
    };
    action: (xy: XY) => void = () => {
        const activeElement: any = document.activeElement;
        activeElement && activeElement.click();
    };
}
const NavWrapper = (props: { screen: string }) => {
    const { state, setState } = React.useContext(StartScreenContext);
    const navigator = new ScreenNavigator(props.screen, state);
    const assignState = (result: XY) => {
        if (state.focus == "screen") {
            setState({ ...state, screen: result });
        }
        if (state.focus == "menu") {
            throw "Invalid navigation action";
        }
    };
    const closeScreen = () => setState({ ...state, focus: "menu", screeen: "", mainMenu: state.mainMenu, menu: { ...state.menu } });
    const onCancel = () => {
        closeScreen();
    };
    const onUp = () => {
        assignState(navigator.moveUp(state.screen.x, state.screen.y));
    };
    const onDown = () => {
        assignState(navigator.moveDown(state.screen.x, state.screen.y));
    };

    const onLeft = () => {
        assignState(navigator.moveLeft(state.screen.x, state.screen.y));
    };

    const onRight = () => {
        assignState(navigator.moveRight(state.screen.x, state.screen.y));
    };

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
export const getScreenStartPos = (screen: string, state: StartScreenState) => {
    switch (screen) {
        case "rating":
            return getRatingNav(state);
        case "difficulty":
            return getDifficultyNav(state);
        case "settings":
            return getSettingNav(state);
        default:
            return { x: 0, y: 0 };
    }
};
const Screen = (props: { screen: string }) => {
    const getScreen = () => {
        switch (props.screen) {
            case "rating":
                return (
                    <>
                        <Rating />
                    </>
                );
            case "difficulty":
                return (
                    <>
                        <Difficulty />
                    </>
                );
            case "settings":
                return (
                    <>
                        <QuickStart />
                    </>
                );
            case "controls0":
                return (
                    <>
                        <Controls player={0} />
                    </>
                );
            case "controls1":
                return (
                    <>
                        <Controls player={1} />
                    </>
                );
            default:
                return null;
        }
    };

    return props.screen ? (
        <div className="startscreen-layout">
            <div className="startscreen-jail">{getScreen()}</div>
            <NavWrapper screen={props.screen} />
        </div>
    ) : null;
};

export default Screen;
