import React from "react";
import StartScreenContext from "./Context";

const QuickStart = () => {
    const { state, setState } = React.useContext(StartScreenContext);
    return (
        <div className="quickstart">
            <div className="title">Settings</div>
            <div className="content center">
                <div>
                    <button
                        disabled={!state.isTouch}
                        className={!state.isTouch ? "active active-0" : `inactive-0`}
                        onClick={() => setState({ ...state, isTouch: false })}
                    >
                        🖥️
                        <div>{!state.isTouch ? "Optimized" : "Optimize"} for Desktop</div>
                        <div>with Mouse Support</div>
                    </button>
                    <button
                        disabled={state.isTouch}
                        className={state.isTouch ? "active active-0" : "inactive-0"}
                        onClick={() => setState({ ...state, isTouch: true })}
                    >
                        📱
                        <div>{state.isTouch ? "Optimized" : "Optimize"} for Mobile</div>
                        <div>with Touch Support</div>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default QuickStart;
