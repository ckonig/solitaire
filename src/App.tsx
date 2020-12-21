import "./View/Style/App.css";
import "./View/Style/UI.css";

import { AppState } from "./Common";
import BoardWrap from "./View/Game/BoardWrap";
import Deck from "./Model/Deck/Deck";
import React from "react";
import StartScreen from "./View/UI/StartScreen/StartScreen";

const App = () => {
    const [appState, setAppState] = React.useState<AppState>({});
    //@todo add parent for keyboard navigation
    const start = (settings: AppState) =>
        setAppState({
            ...settings,
            initialized: true,
        });
    const restart = () => setAppState({});
    const deck = new Deck().shuffle();
    return !appState.initialized ? <StartScreen start={start} /> : <div className="game-layout-container">
        <BoardWrap settings={appState} restart={restart} deck={deck} />
        <BoardWrap settings={appState} restart={restart} deck={deck}/>
    </div>;
};

export default App;
