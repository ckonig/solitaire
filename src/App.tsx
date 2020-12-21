import "./View/Style/App.css";
import "./View/Style/UI.css";

import React from "react";
import SinglePlayer from "./View/SinglePlayer";
import SplitScreen from "./View/SplitScreen";

const App = () => {
    const [mode, setMode] = React.useState<string>("");
    const renderMode = () => (mode == "singleplayer" ? <SinglePlayer /> : <SplitScreen />);
    return mode ? (
        renderMode()
    ) : (
        <div>
            <button onClick={() => setMode("singleplayer")}>single player</button>
            <button onClick={() => setMode("splitscreen")}>splitscreen</button>
        </div>
    );
};
export default App;
