import "./View/Style/App.css";
import "./View/Style/UI.css";

import { AppState, defaultPlayerSettings } from "./Common";
import BoardWrap from "./View/Game/BoardWrap";
import Deck from "./Model/Deck/Deck";
import GameModes from "./GameModes";
import { PauseProvider } from "./View/PauseContext";
import React from "react";
import Home from "./View/UI/StartScreen/Home";
import AspectRatio16to9 from "./View/AspectRatio/AspectRatio16to9";

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
                <div className="game-layout-container singleplayer">
                    <BoardWrap player={0} settings={appState} restart={restart} deck={deck} />
                </div>
            );
        }
        if (appState.boardMode == "splitscreen") {
            board = (
                <div className="game-layout-container splitscreen">
                    <BoardWrap
                        player={0}
                        settings={{ ...appState, inputMode: appState.players[0].inputMethod }}
                        restart={restart}
                        deck={deck.copy()}
                    />
                    <BoardWrap
                        player={1}
                        settings={{ ...appState, inputMode: appState.players[1].inputMethod }}
                        restart={restart}
                        deck={deck.copy()}
                    />
                </div>
            );
        }
        return <PauseProvider started={started}>{board}</PauseProvider>;
    }

    return (
        <AspectRatio16to9>
            <Home start={start} />
        </AspectRatio16to9>
    );
};
export default App;
