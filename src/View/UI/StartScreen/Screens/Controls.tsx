import { ControlPresets, IControlPreset } from "../ControlsPresets";

import CloseButton from "./CloseButton";
import CookieBanner from "./CookieBanner";
import GamePad from "../../../../common/GamePad";
import GamepadLayout from "../../../../common/GamepadLayout";
import React from "react";
import Row from "./Row";
import ScreenContent from "./ScreenContent";
import ScreenMainButton from "./ScreenMainButton";
import { XY } from "../../XY";
import useCookieContext from "../../CookieContext";
import useNavigationContext from "../NavigationContext";
import useStartScreenContext from "../StartScreenContext";

const Controls = (props: { player: number }) => {
    //@todo support custom keyboard / gamepad layouts

    const { state, setState } = useStartScreenContext();
    const { navigation } = useNavigationContext();

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

    const press = (i: number) => {
        pads[i].found = true;
        pads[i].buttonPressed = true;
        setPads({ ...pads });
        console.log(pads);
    };

    const { consented } = useCookieContext();
    const player = state.players[props.player];
    if (!player) {
        return null;
    }

    const playerHasSettings = (id: number, playerId: number) =>
        state.players[playerId].inputLayout === ControlPresets[id].inputLayout &&
        state.players[playerId].inputMethod === ControlPresets[id].inputMethod;

    const isActive = (id: number) => playerHasSettings(id, props.player);

    const applyPreset = (id: number) => {
        const nextPlayer = { ...state.players };
        nextPlayer[props.player].inputMethod = ControlPresets[id].inputMethod;
        nextPlayer[props.player].inputLayout = ControlPresets[id].inputLayout;
        setState({ ...state, players: nextPlayer });
    };

    const getButtonClass = (id: number, pos: XY) => {
        let className = pos.x + "" + pos.y + " " + navigation.screen.x + "" + navigation.screen.y + " ";
        className += navigation.screen.x === pos.x && navigation.screen.y === pos.y ? " focused" : "";
        className += isActive(id) ? " active-0" : " inactive-0";
        className += blockedByOtherPlayers(id) ? " disabled" : "";
        return className;
    };

    const blockedByOtherPlayers = (id: number) => {
        const otherPlayers = [0, 1].filter((p) => p !== props.player);
        return playerHasSettings(id, otherPlayers[0]);
    };

    const getLines = (preset: IControlPreset) => {
        if (preset.inputMethod === "gamepad") {
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
                            autoFocus={isActive(preset.id)}
                            className={(pos: XY) => getButtonClass(preset.id, pos)}
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
                            autoFocus={isActive(preset.id)}
                            className={(pos: XY) => getButtonClass(preset.id, pos)}
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
                layout={GamepadLayout}
                gamepadIndex={0}
                onUp={() => press(0)}
                onDown={() => press(0)}
                onRight={() => press(0)}
                onLeft={() => press(0)}
                onAction={() => press(0)}
            />
            <GamePad
                layout={GamepadLayout}
                gamepadIndex={1}
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
