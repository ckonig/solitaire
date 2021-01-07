import { ControlPresets, IControlPreset } from "../ControlsPresets";
import StartScreenContext, { NavigationContext } from "../Context";

import CloseButton from "./CloseButton";
import CookieBanner from "./CookieBanner";
import { CookieContext } from "../../../Context";
import GamePad from "../../../Game/GamePad";
import React from "react";
import Row from "./Row";
import ScreenContent from "./ScreenContent";
import ScreenMainButton from "./ScreenMainButton";
import { XY } from "../../XY";

const Controls = (props: { player: number }) => {
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

    const { consented } = React.useContext(CookieContext);

    const playerHasSettings = (id: number, playerId: number) =>
        state.players[playerId].inputLayout == ControlPresets[id].inputLayout &&
        state.players[playerId].inputMethod == ControlPresets[id].inputMethod;

    const isActive = (id: number) => playerHasSettings(id, props.player);

    const applyPreset = (id: number) => {
        const nextPlayer = { ...state.players };
        nextPlayer[props.player].inputMethod = ControlPresets[id].inputMethod;
        nextPlayer[props.player].inputLayout = ControlPresets[id].inputLayout;
        setState({ ...state, players: nextPlayer });
    };

    const getButtonClass = (id: number, x: number, y: number) => {
        let className = x + "" + y + " " + navigation.screen.x + "" + navigation.screen.y + " ";
        className += navigation.screen.x == x && navigation.screen.y == y ? " focused" : "";
        className += isActive(id) ? " active-0" : " inactive-0";
        className += blockedByOtherPlayers(id) ? " disabled" : "";
        return className;
    };

    const blockedByOtherPlayers = (id: number) => {
        const otherPlayers = [0, 1].filter((p) => p !== props.player);
        return playerHasSettings(id, otherPlayers[0]);
    };

    const getLines = (preset: IControlPreset) => {
        if (preset.inputMethod == "gamepad") {
            return [...preset.lines, pads[preset.inputLayout].found || pads[preset.inputLayout].buttonPressed ? "Connected" : "Not Found"];
        }
        return preset.lines;
    };

    return (
        <div className="controls startdetails">
            <CloseButton />
            <div className="title">{player.name}</div>
            <ScreenContent id="settings">
                <Row skip={consented}>
                    <CookieBanner />
                </Row>
                <Row>
                    {ControlPresets.slice(0, 3).map((preset) => (
                        <ScreenMainButton
                            key={preset.id}
                            icon={preset.icon}
                            id={preset.id}
                            disabled={blockedByOtherPlayers(preset.id)}
                            initialFocus={isActive(preset.id)}
                            className={(pos: XY) => getButtonClass(preset.id, pos.x, pos.y)}
                            onClick={() => applyPreset(preset.id)}
                            lines={getLines(preset)}
                        />
                    ))}
                </Row>
                <Row>
                    {ControlPresets.slice(3).map((preset) => (
                        <ScreenMainButton
                            key={preset.id}
                            icon={preset.icon}
                            id={preset.id}
                            disabled={blockedByOtherPlayers(preset.id)}
                            initialFocus={isActive(preset.id)}
                            className={(pos: XY) => getButtonClass(preset.id, pos.x, pos.y)}
                            onClick={() => applyPreset(preset.id)}
                            lines={preset.lines}
                        />
                    ))}
                </Row>
                <Row skip={true}>
                    <div className="togglecontainer">
                        <div className="title">@todo</div>
                        <div className="toggle"></div>
                        <div className="description">Describe Layout of currently selected input method</div>
                    </div>
                    <div className="togglecontainer">
                        <div className="title">@todo</div>
                        <div className="toggle"></div>
                        <div className="description">Describe Layout of currently selected input method</div>
                    </div>
                </Row>
            </ScreenContent>
            <GamePad
                gamepadIndex={0}
                onConnect={() => connect(0)}
                onUp={() => press(0)}
                onDown={() => press(0)}
                onRight={() => press(0)}
                onLeft={() => press(0)}
                onAction={() => press(0)}
            />
            <GamePad
                gamepadIndex={1}
                onConnect={() => connect(1)}
                onUp={() => press(1)}
                onDown={() => press(1)}
                onRight={() => press(1)}
                onLeft={() => press(1)}
                onAction={() => press(1)}
            />
        </div>
    );
};

export default Controls;
