import React from "react";

//import StartScreenContext from "./Context";

const QuickStart = (props: { start: () => void }) => {
    //const { state, setState } = React.useContext(StartScreenContext);
    return (
        <div className="ui right quickstart">
            <div className="title">Quickstart</div>
            <div className="content center">
                <div>
                    <button className="active active-0">
                        🖥️
                        <div>Optimized for Desktop</div>
                        <div>with Mouse Support</div>
                    </button>
                    <button disabled={true}>
                        📱
                        <div>Optimize for Mobile</div>
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
