import "./View/Style/App.css";
import "./View/Style/UI.css";

import { AppState } from "./Common";
import BoardWrap from "./View/Game/BoardWrap";
import Deck from "./Model/Deck/Deck";
import GameModes from "./GameModes";
import { PauseProvider } from "./View/PauseContext";
import React from "react";
import StartMenu from "./View/UI/StartScreen/StartMenu";
class Flipper extends React.Component<any, { width: number; height: number }> {
    constructor(props: any) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        if (this.state.width >= this.state.height * 1.778) {
            return (
                <div className="appwrapper-landscape">
                    <div className="appwrapper-16-to-9-landscape">{this.props.children}</div>
                </div>
            );
        }
        return (
            <div className="appwrapper-portrait">
                <div className="appwrapper-16-to-9-portrait">{this.props.children}</div>
            </div>
        );
    }
}
const Wrap = (props: { children: any[] | any }) => {
    return (
        <Flipper>
            <div className="appwrapper-jail">{props.children}</div>
        </Flipper>
    );
};
const App = () => {
    const [started, setStarted] = React.useState<number>(0);
    const defaultState = { boardMode: GameModes.CUSTOM.boardMode, inputMode: "mouse", initialized: false };
    const [appState, setAppState] = React.useState<AppState>(defaultState);

    const restart = () => {
        setAppState(defaultState);
    };

    const deck = new Deck().shuffle();
    const start = (settings: any) => {
        //@todo explicit typing of startup settings
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
                    <BoardWrap player="1" settings={appState} restart={restart} deck={deck} />
                </div>
            );
        }
        if (appState.boardMode == "splitscreen") {
            board = (
                <div className="game-layout-container splitscreen">
                    <BoardWrap player="1" settings={{ ...appState, inputMode: "gamepad" }} restart={restart} deck={deck.copy()} />
                    <BoardWrap player="2" settings={{ ...appState, inputMode: "keyboard" }} restart={restart} deck={deck.copy()} />
                </div>
            );
        }
        return (
            <Wrap>
                <PauseProvider started={started}>{board}</PauseProvider>
            </Wrap>
        );
    }

    return (
        <Wrap>
            <StartMenu start={start} />
        </Wrap>
    );
};
export default App;
