import "./View/Style/App.css";
import "./View/Style/UI.css";

import { AppState, defaultPlayerSettings } from "./Common";

import AspectRatio from "./View/AspectRatio/AspectRatio";
import BoardWrap from "./View/Game/BoardWrap";
import Deck from "./Model/Deck/Deck";
import GameModes from "./GameModes";
import Home from "./View/UI/StartScreen/Home";
import { PauseProvider } from "./View/PauseContext";
import Ratios from "./View/AspectRatio/Ratios";
import React from "react";

const App = () => {
    const [started, setStarted] = React.useState<number>(0);
    const defaultState = { boardMode: GameModes.CUSTOM.boardMode, inputMode: "mouse", initialized: false, players: defaultPlayerSettings };
    const [appState, setAppState] = React.useState<AppState>(defaultState);

    const restart = () => {
        setAppState(defaultState);
    };

    const deck = new Deck().shuffle();
    const start = (settings: any) => {
        deck.shuffle();
        const startSettings = {
            ...appState,
            ...settings,
        };
        setAppState(startSettings);
        setStarted(Date.now());
    };

    if (appState.initialized) {
        let board = null;
        if (appState.boardMode == "singleplayer") {
            board = (
                <AspectRatio ratio={Ratios._4to3}>
                    <div className={"layout-grid-container singleplayer"}>
                        <BoardWrap player={0} settings={appState} restart={restart} deck={deck} />
                    </div>
                </AspectRatio>
            );
        }
        if (appState.boardMode == "splitscreen") {
            board = (
                <div className="game-layout-container splitscreen">
                    <div className={"layout-grid-container " + appState.boardMode}>
                        <BoardWrap
                            player={0}
                            settings={{ ...appState, inputMode: appState.players[0].inputMethod }}
                            restart={restart}
                            deck={deck.copy()}
                        />
                    </div>

                    <div className={"layout-grid-container " + appState.boardMode}>
                        <BoardWrap
                            player={1}
                            settings={{ ...appState, inputMode: appState.players[1].inputMethod }}
                            restart={restart}
                            deck={deck.copy()}
                        />
                    </div>
                </div>
            );
        }
        return <PauseProvider started={started}>{board}</PauseProvider>;
    }

    return (
        <AspectRatio ratio={Ratios._16to9}>
            <Home start={start} />
        </AspectRatio>
    );
};
export default App;
