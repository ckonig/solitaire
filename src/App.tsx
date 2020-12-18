import "./View/Style/App.css";
import "./View/Style/UI.css";

import { AppState } from "./Common";
import BoardWrap from "./View/Game/BoardWrap";
import React from "react";
import StartScreen from "./View/UI/StartScreen";

const App = () => {
    const [appState, setAppState] = React.useState<AppState>({});
    const start = (settings: AppState) =>
        setAppState({
            ...settings,
            initialized: true,
        });
    const restart = () => setAppState({});
    return !appState.initialized ? <StartScreen start={start} /> : <BoardWrap settings={appState} restart={restart} />;
};

export default App;
