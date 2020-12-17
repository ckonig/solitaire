import "./View/Style/App.css";

import {AppState} from "./Common";
import BoardWrap from "./View/Game/BoardWrap";
import React from "react";
import StartScreen from "./View/UI/StartScreen";

const App = () => {
    const defaultState = { initialized: false, drawMode: "", recyclingMode: "" };
    const [appState, setAppState] = React.useState(defaultState);
    const start = (settings: AppState) =>
        setAppState({
            ...settings,
            initialized: true,
        });
    const restart = () => setAppState(defaultState);
    return !appState.initialized ? <StartScreen start={start} /> : <BoardWrap settings={appState} restart={restart} />;
};

export default App;
