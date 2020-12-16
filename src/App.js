import "./App.scss";

import Launcher from "./View/Launcher";
import React from "react";
import StartScreen from "./View/UI/StartScreen";

const App = () => {
    const [appState, setAppState] = React.useState({ initialized: false });
    const start = (settings) =>
        setAppState({
            ...settings,
            initialized: true,
        });
    const restart = () => setAppState({ initialized: false });
    return !appState.initialized ? <StartScreen start={start} /> : <Launcher settings={appState} restart={restart} />;
};

export default App;
