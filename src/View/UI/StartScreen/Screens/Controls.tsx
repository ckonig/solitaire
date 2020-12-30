import GamePad from "../../../Game/GamePad";
import React from "react";
import ScreenContent from "./ScreenContent";
import Row from "./Row";
import CookieBanner from "./CookieBanner";
import { CookieContext } from "../../../Context";
import StartScreenContext, { NavigationContext } from "../Context";
import ScreenMainButton from "./ScreenMainButton";
import { XY } from "../../XY";
import ScreenSelect from "./ScreenSelect";

const Controls = (props: { player: number; closeScreen: () => void }) => {
    const { state, setState } = React.useContext(StartScreenContext);
    const { navigation } = React.useContext(NavigationContext);

    const player = state.players[props.player];

    if (!player) {
        return null;
    }

    const [pads, setPads] = React.useState([
        {
            found: false,
            buttonPressed: false,
        },
        {
            found: false,
            buttonPressed: false,
        },
    ]);

    const connect = (i: number) => {
        pads[i].found = true;
        setPads({ ...pads });
    };

    const press = (i: number) => {
        pads[i].found = true;
        pads[i].buttonPressed = true;
        setPads({ ...pads });
        console.log(pads);
    };

    const display = (pad: any) => (
        <div>
            <div>pressed: {pad.buttonPressed}</div>
            <div>connected: {pad.found ? "Y" : "N"}</div>
        </div>
    );

    const { consented } = React.useContext(CookieContext);

    const isActive = (id: string) => player.inputMethod === id;

    const applyPreset = (id: string) => {
        const nextPlayer = { ...state.players };
        nextPlayer[props.player].inputMethod = id;
        setState({ ...state, players: nextPlayer });
    };

    const getButtonClass = (id: string, x: number, y: number) => {
        let className = "";
        className += navigation.menu.x == x && navigation.menu.y == y ? " focused" : null;
        className += id == player.inputMethod ? " active-0" : null;
        return className;
    };

    return (
        <div className="controls startdetails">
            <div className="closer">
                <button onClick={props.closeScreen}>🗙</button>
            </div>
            <div className="title">{player.name}</div>
            <ScreenContent id="settings">
                <Row skip={consented}>
                    <CookieBanner />
                </Row>
                <Row>
                    <ScreenMainButton
                        icon={"🖱️"}
                        id={0}
                        initialFocus={isActive("mouse")}
                        className={(pos: XY) => getButtonClass("mouse", pos.y, pos.x)}
                        onClick={() => applyPreset("mouse")}
                        lines={["Mouse"]}
                    />
                    <ScreenMainButton
                        icon={"⌨️"}
                        id={1}
                        initialFocus={isActive("keyboard")}
                        className={(pos: XY) => getButtonClass("keyboard", pos.y, pos.x)}
                        onClick={() => applyPreset("keyboard")}
                        lines={["Keyboard"]}
                    />
                    <ScreenMainButton
                        icon={"🎮"}
                        id={2}
                        initialFocus={isActive("gamepad")}
                        className={(pos: XY) => getButtonClass("gamepad", pos.y, pos.x)}
                        onClick={() => applyPreset("gamepad")}
                        lines={["Gamepad"]}
                    />
                </Row>
                <Row>
                    {player.inputMethod !== "keyboard" ? null : (
                        <ScreenSelect
                            label="Keyboard Layout"
                            description="How much chaos will the stacks on the board contain by themselves?"
                            value={player.inputLayout}
                            values={[
                                { label: "WASD", id: 0 },
                                { label: "ARROWS", id: 1 },
                                { label: "NUMPAD", id: 2 },
                            ]}
                            callBack={(s) => {
                                const next = { ...state.players };
                                next[props.player].inputLayout = parseInt(s);
                                setState({ ...state, players: next });
                            }}
                        />
                    )}
                    {player.inputMethod !== "gamepad" ? null : (
                        <ScreenSelect
                            label="Gamepad Selection"
                            description="Which Gamepad?"
                            value={player.inputLayout}
                            values={[
                                { label: "1", id: 0 },
                                { label: "2", id: 1 },
                            ]}
                            callBack={(s) => {
                                const next = { ...state.players };
                                next[props.player].inputLayout = parseInt(s);
                                setState({ ...state, players: next });
                            }}
                        />
                    )}
                </Row>
                <Row>
                    {display(pads[0])}
                    <div>
                        <GamePad
                            gamepadIndex={0}
                            onConnect={() => connect(0)}
                            onUp={() => press(0)}
                            onDown={() => press(0)}
                            onRight={() => press(0)}
                            onLeft={() => press(0)}
                            onAction={() => press(0)}
                        />
                    </div>
                </Row>
            </ScreenContent>
        </div>
    );
};

export default Controls;
