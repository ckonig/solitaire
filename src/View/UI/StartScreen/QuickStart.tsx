import React from "react";
import StartScreenContext from "./Context";

const QuickStart = (props: { start: () => void }) => {
    const { state, setState } = React.useContext(StartScreenContext);
    return (
        <div className="ui right quickstart">
            <div className="title">Quickstart</div>
            <div className="content center">
                <div>
                    <button disabled={!state.isTouch} className={!state.isTouch ? "active active-0" : ""} onClick={() => setState({...state, isTouch: false})}>
                        🖥️
                        <div>{!state.isTouch ? "Optimized": "Optimize"} for Desktop</div>
                        <div>with Mouse Support</div>
                    </button>
                    <button disabled={state.isTouch} className={state.isTouch ? "active active-0" : ""} onClick={() => setState({...state, isTouch: true})}>
                        📱
                        <div>{state.isTouch ? "Optimized": "Optimize"} for Mobile</div>
                        <div>with Touch Support</div>
                    </button>
                    <button className="blinking" onClick={props.start}>
                        🎲
                        <div>Start a new Game</div>
                        <div>using the settings</div>
                        <div>shown on this screen.</div>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default QuickStart;
