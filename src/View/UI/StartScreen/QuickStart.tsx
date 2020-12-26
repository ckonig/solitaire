import { ScreenButton, ScreenRow } from "./Navigation";

import EntropyLevels from "../../../Model/Game/EntropyLevels";
import React from "react";
import StartScreenContext from "./Context";
import { StartScreenState } from "../../../Common";
import MenuToggle from "./MenuToggle";

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

const QuickStart = () => {
    const { state, setState } = React.useContext(StartScreenContext);
    const [toggle, setToggle] = React.useState<boolean>(false);

    const setBaseEntropy = (value: string) => {
        setState({ ...state, entropySettings: { ...state.entropySettings, baseEntropy: parseInt(value) } });
    };
    const setInteractionEntropy = (value: string) => {
        setState({ ...state, entropySettings: { ...state.entropySettings, interactionEntropy: parseInt(value) } });
    };
    const setQuickDeal = (value: boolean) => {
        setState({ ...state, quickDeal: value });
    };
    const getClassName = (button: ScreenButton<any>, y: number, x: number) => {
        const hasFocus = state.focus == "screen" && state.screen.x == x && state.screen.y == y;
        let name = state.quickDeal == button.model.quickDeal ? "active active-0" : "inactive-0";
        name += hasFocus ? " focused" : "";
        return name;
    };

    return (
        <div className="ui quickstart startdetails">
            <div className="closer">
                <button onClick={() => setToggle(!toggle)}>🗙</button>
            </div>
            <div className="title">Settings</div>

            <div className="content center">
                {getSettingRows(state).map((row, index) => (
                    <div key={index}>
                        {row.buttons.map((button, bi) => (
                            <button
                                key={button.id}
                                disabled={state.quickDeal == button.model.quickDeal}
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
                            >
                                {button.icon}
                                {button.lines.map((line, lindex) => (
                                    <div key={lindex}>{line}</div>
                                ))}
                            </button>
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
