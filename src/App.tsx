import "./App.css";

import { LaunchSettings, defaultPlayerSettings } from "./Common";

import Deck from "./Model/Deck/Deck";
import GameModes from "./GameModes";
import Home from "./View/UI/StartScreen/Home";
import { OverlayContextProvider } from "./common/Overlay";
import React from "react";
import SuggestionModes from "./Model/Game/Settings/SuggestionModes";

const Game = React.lazy(() => import("./View/Game/Game"));

const App = () => {
    const defaultState = {
        boardMode: GameModes.SINGLEPLAYER,
        inputMode: "mouse",
        initialized: false,
        players: defaultPlayerSettings,
        drawMode: "",
        recyclingMode: "",
        interactionEntropy: 0,
        baseEntropy: 0,
        suggestionMode: SuggestionModes.NONE,
    };

    const [launchState, setLaunchState] = React.useState<LaunchSettings>(defaultState);

    const start = (settings: LaunchSettings) => setLaunchState({ ...settings, initialized: true });
    const restart = () => setLaunchState(defaultState);

    const deck = new Deck().shuffle();

    return (
        <OverlayContextProvider>
            {launchState?.initialized ? <Game {...{ launchState, deck, restart }} /> : <Home start={start} />}
        </OverlayContextProvider>
    );
};
export default App;
