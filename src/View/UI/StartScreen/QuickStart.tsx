import EntropyLevels from "../../../Model/Game/EntropyLevels";
import React from "react";
import StartScreenContext from "./Context";

const QuickStart = (props: { head: string }) => {
    const { state, setState } = React.useContext(StartScreenContext);
    const [toggle, setToggle] = React.useState<boolean>(false);
    
    const setBaseEntropy = (value: string) => {
        setState({ ...state, entropySettings: { ...state.entropySettings, baseEntropy: parseInt(value) } });
    };
    const setInteractionEntropy = (value: string) => {
        setState({ ...state, entropySettings: { ...state.entropySettings, interactionEntropy: parseInt(value) } });
    };
    const setQuickDeal = (value: string) => {
        setState({ ...state, quickDeal: !!parseInt(value) });
    };
    return (
        <div className="ui quickstart startdetails">
            <div className="closer">
                <button onClick={() => setToggle(!toggle)}>{toggle ? "🗙" : "☰"}</button>
            </div>
            <div className="title">{props.head}</div>
            <div className="title">Settings</div>

            {toggle ? (
                <div className="content">
                    <div className="section">
                        <div className="title">Base Entropy</div>
                        <div className="row">
                            <div className="label">How much chaos will the stacks on the board contain by themselves?</div>
                            <select onChange={(e) => setBaseEntropy(e.target.value)} value={state.entropySettings.baseEntropy}>
                                {EntropyLevels.map((entropyLevel, index) => (
                                    <option key={entropyLevel} value={index}>
                                        {entropyLevel}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="section">
                        <div className="title">Interaction Entropy</div>
                        <div className="row">
                            <div className="label">How much chaos will each interaction add to a stack on the board?</div>
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
                    </div>
                    <div className="section">
                        <div className="title">Instant Deal</div>
                        <div className="row">
                            <div className="label">Should the deal animation at the beginning of the game be skipped?</div>
                            <select onChange={(e) => setQuickDeal(e.target.value)} value={state.quickDeal ? "1" : "0"}>
                                <option key={0} value="1">
                                    Yes
                                </option>
                                <option key={1} value="0">
                                    No
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="content center">
                    <div>
                        <button
                            disabled={!state.quickDeal}
                            className={!state.quickDeal ? "active active-0" : `inactive-0`}
                            onClick={() =>
                                setState({ ...state, quickDeal: false, entropySettings: { baseEntropy: 2, interactionEntropy: 2 } })
                            }
                        >
                            🖥️
                            <div>{!state.quickDeal ? "Optimized" : "Optimize"} for Desktop</div>
                            <div>with Mouse Support</div>
                        </button>
                        <button
                            disabled={state.quickDeal}
                            className={state.quickDeal ? "active active-0" : "inactive-0"}
                            onClick={() =>
                                setState({ ...state, quickDeal: true, entropySettings: { baseEntropy: 1, interactionEntropy: 1 } })
                            }
                        >
                            📱
                            <div>{state.quickDeal ? "Optimized" : "Optimize"} for Mobile</div>
                            <div>with Touch Support</div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default QuickStart;
