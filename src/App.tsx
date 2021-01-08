import "./View/Style/App.css";
import "./View/Style/UI.css";

import { LaunchSettings, defaultPlayerSettings } from "./Common";

import AspectRatio from "./View/AspectRatio/AspectRatio";
import Deck from "./Model/Deck/Deck";
import DelayedSuspense from "./DelayedSuspense";
import GameModes from "./GameModes";
import Home from "./View/UI/StartScreen/Home";
import { PauseProvider } from "./View/PauseContext";
import Ratios from "./View/AspectRatio/Ratios";
import React from "react";
import SuggestionModes from "./Model/Game/Settings/SuggestionModes";

const App = () => {
    const [started, setStarted] = React.useState<number>(0);
    const defaultState = {
        boardMode: GameModes.CUSTOM.boardMode,
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

    const restart = () => {
        setLaunchState(defaultState);
    };

    const deck = new Deck().shuffle();
    const start = (settings: LaunchSettings) => {
        deck.shuffle();
        setLaunchState({ ...settings });
        setStarted(Date.now());
    };

    if (launchState?.initialized) {
        const BoardWrap = React.lazy(() => import("./View/Game/BoardWrap"));
        let board = null;
        if (launchState.boardMode == "singleplayer") {
            board = (
                <AspectRatio ratio={Ratios._4to3}>
                    <div className={"layout-grid-container singleplayer"}>
                        <BoardWrap player={0} settings={launchState} restart={restart} deck={deck} />
                    </div>
                </AspectRatio>
            );
        }
        if (launchState.boardMode == "splitscreen") {
            board = (
                <div className="game-layout-container splitscreen">
                    <div className={"layout-grid-container " + launchState.boardMode}>
                        <BoardWrap
                            player={0}
                            settings={{ ...launchState, inputMode: launchState.players[0].inputMethod }}
                            restart={restart}
                            deck={deck.copy()}
                        />
                    </div>

                    <div className={"layout-grid-container " + launchState.boardMode}>
                        <BoardWrap
                            player={1}
                            settings={{ ...launchState, inputMode: launchState.players[1].inputMethod }}
                            restart={restart}
                            deck={deck.copy()}
                        />
                    </div>
                </div>
            );
        }
        return (
            <PauseProvider started={started}>
                <DelayedSuspense delay={500} fallback={<h3>Loading...</h3>}>
                    {board}
                </DelayedSuspense>
            </PauseProvider>
        );
    }

    return (
        <AspectRatio ratio={Ratios._16to9}>
            <Home start={start} />
        </AspectRatio>
    );
};
export default App;
