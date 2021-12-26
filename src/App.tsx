import "./App.css";

import { LaunchSettings, defaultPlayerSettings } from "./Common";

import { CookieContextProvider } from "./View/UI/CookieContext";
import Deck from "./Model/Deck/Deck";
import GameModes from "./GameModes";
import Home from "./View/UI/StartScreen/Home";
import { OverlayContextProvider } from "./common/Overlay";
import React from "react";
import StorageManager from "./View/UI/StorageManager";
import SuggestionModes from "./Model/Game/Settings/SuggestionModes";

const Game = React.lazy(() => import("./View/Game/Game"));

const App = () => {
    const storage = StorageManager.getInstance();
    const [consented, setConsented] = React.useState<boolean>(!!storage.hasConsent());
    const cookieContext = {
        consented,
        setConsented,
    };

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
        featureSwitches: {undo: true, confetti: true}
    };

    const [launchState, setLaunchState] = React.useState<LaunchSettings>(defaultState);

    const start = (settings: LaunchSettings) => setLaunchState({ ...settings, initialized: true });
    const restart = () => setLaunchState(defaultState);

    const deck = new Deck().shuffle();

    return (
        <CookieContextProvider value={cookieContext}>
            <OverlayContextProvider>
                {launchState?.initialized ? <Game {...{ launchState, deck, restart }} /> : <Home start={start} />}
            </OverlayContextProvider>
        </CookieContextProvider>
    );
};
export default App;
