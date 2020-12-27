import { ScreenButton, ScreenRow } from "./Navigation";

import EntropyLevels from "../../../Model/Game/EntropyLevels";
import React from "react";
import StartScreenContext from "./Context";
import { StartScreenState } from "../../../Common";
import MenuToggle from "./MenuToggle";
import MenuSelect from "./MenuSelect";
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
    return [
        new ScreenRow(optimizeOptions(state).map((option) => new ScreenButton(option.entropy, option.icon, option.lines, option))),
        new ScreenRow([new ScreenButton<any>(-1, "", [], null), new ScreenButton<any>(-1, "", [], null)]),
        new ScreenRow([new ScreenButton<any>(-1, "", [], null), new ScreenButton<any>(-1, "", [], null)]),
    ];
};

export const getSettingNav = (state: StartScreenState) => {
    let result = { x: 0, y: 0 };
    getSettingRows(state).forEach((row, ri) => {
        row.buttons.forEach((button, bi) => {
            if (button.model && settingIsActive(state, button.model.quickDeal)) {
                result = { x: bi, y: ri };
            }
        });
    });
    return result;
};
const settingIsActive = (state: StartScreenState, val: boolean) => state.quickDeal == val;

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
                {getSettingRows(state)
                    .slice(0, 1)
                    .map((row, index) => (
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
                                        })
                                    }
                                    lines={button.lines}
                                />
                            ))}
                        </div>
                    ))}

                <div className="row"></div>
                <div className="row">
                    <MenuSelect
                        x={0}
                        y={1}
                        hasFocus={hasFocus(1, 0)}
                        label="Base Entropy"
                        description="How much chaos will the stacks on the board contain by themselves?"
                        value={state.entropySettings.baseEntropy || 0}
                        values={EntropyLevels.map((label, id) => ({ id, label }))}
                        callBack={setBaseEntropy}
                    />
                    <MenuSelect
                        x={1}
                        y={1}
                        hasFocus={hasFocus(1, 1)}
                        label="Interaction Entropy"
                        description="How much chaos will each interaction add to a stack on the board?"
                        value={state.entropySettings.interactionEntropy || 0}
                        values={EntropyLevels.map((label, id) => ({ id, label }))}
                        callBack={setInteractionEntropy}
                    />
                </div>
                <div className="row">
                    <MenuToggle
                        x={0}
                        y={2}
                        hasFocus={hasFocus(2, 0)}
                        label="Instant Deal"
                        description="Should the deal animation at the beginning of the game be skipped?"
                        value={state.quickDeal}
                        callBack={setQuickDeal}
                    />
                    <MenuToggle
                        x={1}
                        y={2}
                        disabled={true}
                        hasFocus={hasFocus(2, 1)}
                        label="Auto Deal"
                        description="Should the game draw one card from the stock every 5 seconds?"
                        value={false}
                        callBack={() => {}}
                    />
                </div>
            </div>
        </div>
    );
};
export default QuickStart;
