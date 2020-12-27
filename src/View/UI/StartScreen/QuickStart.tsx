import { ScreenButton, ScreenRow } from "./Navigation";

import EntropyLevels from "../../../Model/Game/EntropyLevels";
import React from "react";
import StartScreenContext from "./Context";
import { StartScreenState } from "../../../Common";
import MenuToggle from "./MenuToggle";
import ScreenMainButton from "./ScreenMainButton";
import { XY } from "./Tree";

const optimizeOptions = (state: StartScreenState) => [
    {
        entropy: 2,
        quickDeal: false,
        lines: [(!state.quickDeal ? "Optimized" : "Optimize") + " for Desktop"],
        icon: "🖥️",
    },
    {
        entropy: 1,
        quickDeal: true,
        lines: [(state.quickDeal ? "Optimized" : "Optimize") + " for Mobile"],
        icon: "📱",
    },
];

export const getSettingRows = (state: StartScreenState) => {
    return [new ScreenRow(optimizeOptions(state).map((option) => new ScreenButton(option.entropy, option.icon, option.lines, option)))];
};

export const getSettingNav = (state: StartScreenState) => {
    let result = { x: 0, y: 0 };
    getSettingRows(state).forEach((row, ri) => {
        row.buttons.forEach((button, bi) => {
            if (settingIsActive(state, button.model.quickDeal)) {
                result = { x: bi, y: ri };
            }
        });
    });
    return result;
};
const settingIsActive = (state: StartScreenState, val: boolean) => state.quickDeal == val

const QuickStart = () => {
    const { state, setState } = React.useContext(StartScreenContext);
    const hasFocus = (y: number, x: number) => state.focus == "screen" && state.screen.x == x && state.screen.y == y;
    const closeScreen = () => setState({ ...state, focus: "menu", screeen: "", mainMenu: state.mainMenu, menu: { ...state.menu } });

    const setBaseEntropy = (value: string) => {
        setState({ ...state, entropySettings: { ...state.entropySettings, baseEntropy: parseInt(value) } });
    };
    const setInteractionEntropy = (value: string) => {
        setState({ ...state, entropySettings: { ...state.entropySettings, interactionEntropy: parseInt(value) } });
    };
    const setQuickDeal = (value: boolean, pos: XY) => {
        setState({ ...state, quickDeal: value, screen: pos });
    };
    const getClassName = (button: ScreenButton<any>, y: number, x: number) => {
        const hasFocus = state.focus == "screen" && state.screen.x == x && state.screen.y == y;
        let name = settingIsActive(state, button.model.quickDeal) ? "active active-0" : "inactive-0";
        name += hasFocus ? " focused" : "";
        return name;
    };

    return (
        <div className="ui quickstart startdetails">
            <div className="closer">
                <button onClick={closeScreen}>🗙</button>
            </div>
            <div className="title">Settings</div>

            <div className="content center">
                {getSettingRows(state).map((row, index) => (
                    <div key={index} className="row">
                        {row.buttons.map((button, bi) => (
                            <ScreenMainButton
                            key={button.id}
                            x={bi}
                            y={index}
                            icon={button.icon}
                            id={button.id}
                            hasFocus={hasFocus(index, bi)}
                            className={getClassName(button, index, bi)}
                            onClick={() =>
                                setState({
                                    ...state,
                                    quickDeal: button.model.quickDeal,
                                    entropySettings: {
                                        baseEntropy: button.model.entropy,
                                        interactionEntropy: button.model.entropy,
                                    },
                                })}
                            lines={button.lines}
                        />
                        ))}
                    </div>
                ))}

                <div className="row"></div>
                <div className="row">
                    <div className="togglecontainer">
                        <div className="title">Base Entropy</div>
                        <div className="toggle">
                            <select onChange={(e) => setBaseEntropy(e.target.value)} value={state.entropySettings.baseEntropy}>
                                {EntropyLevels.map((entropyLevel, index) => (
                                    <option key={entropyLevel} value={index}>
                                        {entropyLevel}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="description">
                            <div className="label">How much chaos will the stacks on the board contain by themselves?</div>
                        </div>
                    </div>
                    <div className="togglecontainer">
                        <div className="title">Interaction Entropy</div>
                        <div className="toggle">
                            <select
                                onChange={(e) => setInteractionEntropy(e.target.value)}
                                value={state.entropySettings.interactionEntropy}
                            >
                                {EntropyLevels.map((entropyLevel, index) => (
                                    <option key={entropyLevel} value={index}>
                                        {entropyLevel}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="description">
                            <div className="label">How much chaos will each interaction add to a stack on the board?</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <MenuToggle
                        x={3}
                        y={0}
                        hasFocus={hasFocus(0,3)}
                        label="Instant Deal"
                        description="Should the deal animation at the beginning of the game be skipped?"
                        value={state.quickDeal}
                        callBack={setQuickDeal}
                    />
                </div>
            </div>
        </div>
    );
};
export default QuickStart;
