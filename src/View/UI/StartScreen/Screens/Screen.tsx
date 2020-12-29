import Controls from "./Controls";
import Difficulty, { getDifficultyNav, getDifficultyRows } from "./Difficulty";
import QuickStart, { getSettingNav, getSettingRows } from "./QuickStart";
import Rating from "./Rating";
import React from "react";
import { NavHandler, XY } from "../Menu/Tree";
import StartScreenContext, { StartScreenState } from "../Context";
import Keyboard from "../../../Game/Keyboard";
import GamePad from "../../../Game/GamePad";
import { CookieContext } from "../../../Context";

export class ScreenNavigator implements NavHandler {
    screen: string;
    rows: any[];
    constructor(screen: string, rows?: any[]) {
        this.screen = screen;
        this.rows = typeof rows == "undefined" ? [] : rows;
    }
    getRows = () => this.rows;
    getRow = (x: number) => this.getRows()[x];
    goToRow = (pos: XY) => {
        const rows = this.getRows();
        const row = rows[pos.y];
        if (row.buttons.length - 1 < pos.x) {
            return { ...pos, x: row.buttons.length - 1 };
        }

        return pos;
    };
    moveUp: (x: number, y: number) => XY = (x: number, y: number) => {
        const rows = this.getRows();
        if (y == 0) {
            return this.goToRow({ x: x, y: rows.length - 1 });
        }
        return this.goToRow({ x: x, y: y - 1 });
    };
    moveDown: (x: number, y: number) => XY = (x: number, y: number) => {
        const rows = this.getRows();
        if (y == rows.length - 1) {
            return this.goToRow({ x: x, y: 0 });
        }
        return this.goToRow({ x: x, y: y + 1 });
    };
    moveLeft: (x: number, y: number) => XY = (x: number, y: number) => {
        const row = this.getRow(y);
        if (x == 0) {
            return { x: row.buttons.length - 1, y: y };
        }
        return { x: x - 1, y: y };
    };
    moveRight: (x: number, y: number) => XY = (x: number, y: number) => {
        const row = this.getRow(y);
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
export const NavWrapper = (props: { navigator: ScreenNavigator; screen: string }) => {
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
export const getScreenStartPos = (screen: string, state: StartScreenState, consented: boolean) => {
    switch (screen) {
        case "difficulty":
            return getDifficultyNav(state, consented);
        case "settings":
            return getSettingNav(state, consented);
        default:
            return { x: 0, y: 0 };
    }
};
const Screen = (props: { screen: string }) => {
    const { state, setState } = React.useContext(StartScreenContext);
    const { consented } = React.useContext(CookieContext);
    const closeScreen = () => setState({ ...state, focus: "menu", screeen: "", mainMenu: state.mainMenu, menu: { ...state.menu } });
    const getScreen = () => {
        switch (props.screen) {
            case "rating":
                return (
                    <>
                        <Rating closeScreen={closeScreen} />
                    </>
                );
            case "difficulty":
                return (
                    <>
                        <Difficulty closeScreen={closeScreen} />
                        <NavWrapper navigator={new ScreenNavigator(props.screen, getDifficultyRows(consented))} screen={props.screen} />
                    </>
                );
            case "settings":
                return (
                    <>
                        <QuickStart closeScreen={closeScreen} />
                        <NavWrapper navigator={new ScreenNavigator(props.screen, getSettingRows(state, consented))} screen={props.screen} />
                    </>
                );
            case "controls0":
                return (
                    <>
                        <Controls player={0} />
                        <NavWrapper navigator={new ScreenNavigator(props.screen)} screen={props.screen} />
                    </>
                );
            case "controls1":
                return (
                    <>
                        <Controls player={1} />
                        <NavWrapper navigator={new ScreenNavigator(props.screen)} screen={props.screen} />
                    </>
                );
            default:
                return null;
        }
    };

    return props.screen ? (
        <div className="startscreen-layout">
            <div className="startscreen-jail">{getScreen()}</div>
        </div>
    ) : null;
};

export default Screen;
