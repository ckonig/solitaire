import "../Style/Screens.scss";
import "../Style/Menu.css";

import { AppState, RatingSettings } from "../../Common";

import React from "react";

export interface StartScreenProps {
    start: (settings: AppState) => void;
}

interface StartScreenState {
    ratingSettings: RatingSettings;
    difficultySettings: number;
    toggle?: boolean;
}

const StartScreen = (props: StartScreenProps) => {
    const difficultyOptions = [
        { drawMode: "single", recyclingMode: "infinite" },
        { drawMode: "single", recyclingMode: "3-pass" },
        { drawMode: "single", recyclingMode: "1-pass" },
        { drawMode: "triple", recyclingMode: "infinite" },
        { drawMode: "triple", recyclingMode: "3-pass" },
        { drawMode: "triple", recyclingMode: "1-pass" },
    ];
    const [state, setState] = React.useState<StartScreenState>({ ratingSettings: {}, difficultySettings: 0 });
    const setMissPenalty = (value: string) =>
        setState({ ...state, ratingSettings: { ...state.ratingSettings, missPenalty: value == "true" } });
    const setTimeRating = (value: string) =>
        setState({ ...state, ratingSettings: { ...state.ratingSettings, timedMode: value == "true" } });
    const setUndoPenalty = (value: string) =>
        setState({ ...state, ratingSettings: { ...state.ratingSettings, undoPenalty: value == "true" } });
    const setHintPenalty = (value: string) =>
        setState({ ...state, ratingSettings: { ...state.ratingSettings, hintPenalty: value == "true" } });
    const updateDifficulty = (settings: number) => setState({ ...state, difficultySettings: settings });
    const toggle = () => setState((state) => ({ ...state, toggle: !state.toggle }));
    const start = () => props.start({ ...difficultyOptions[state.difficultySettings], ...state.ratingSettings });
    const getButtonClass = (index: number) => (state.difficultySettings == index ? `active active-${index}` : "");
    return !props || !props.start ? null : (
        <div>
            <div className="ui left rating">
            <div className="closer">
                    <button onClick={toggle}>{state.toggle ? "🗙" : "☰"}</button>
                </div>
                <div className="title">{state.toggle ? "Customize Rating" : "Rating"}</div>
                <div className="content">
                    {state.toggle ? (
                        <>
                            <div className="section">
                                <div className="title">Undo Penalty</div>
                                <div className="row">
                                    <div className="label">
                                        Should there be a penalty for the UNDO operation? This penalty increases exponentially.
                                    </div>
                                    <select
                                        onChange={(e) => setUndoPenalty(e.target.value)}
                                        value={String(!!state.ratingSettings.undoPenalty)}
                                    >
                                        <option value={"true"}>yes</option>
                                        <option value={"false"}>no</option>
                                    </select>
                                </div>
                            </div>
                            <div className="section">
                                <div className="title">Hint Penalty</div>
                                <div className="row">
                                    <div className="label">
                                        Should there be a penalty for the HINT operation? This penalty does not increase.
                                    </div>
                                    <select
                                        onChange={(e) => setHintPenalty(e.target.value)}
                                        value={String(!!state.ratingSettings.hintPenalty)}
                                    >
                                        <option value={"true"}>yes</option>
                                        <option value={"false"}>no</option>
                                    </select>
                                </div>
                            </div>
                            <div className="section">
                                <div className="title">Time Rating</div>
                                <div className="row">
                                    <div className="label">
                                        Should the performance be part of the final rating, according to the rules described{" "}
                                        <a
                                            href="https://en.wikipedia.org/wiki/Klondike_(solitaire)#Scoring"
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            here
                                        </a>
                                        ?
                                    </div>
                                    <select
                                        onChange={(e) => setTimeRating(e.target.value)}
                                        value={String(!!state.ratingSettings.timedMode)}
                                    >
                                        <option value={"true"}>yes</option>
                                        <option value={"false"}>no</option>
                                    </select>
                                </div>
                            </div>
                            <div className="section">
                                <div className="title">Miss Penalty</div>
                                <div className="row">
                                    <div className="label">Should there be a penalty for attempting to perform invalid actions?</div>
                                    <select
                                        onChange={(e) => setMissPenalty(e.target.value)}
                                        value={String(!!state.ratingSettings.missPenalty)}
                                    >
                                        <option value={"true"}>yes</option>
                                        <option value={"false"}>no</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div>
                            <button>
                                🌴
                                <div>Chill</div>
                            </button>
                            <button>
                                ⚖️
                                <div>Regular</div>
                            </button>
                            <button>
                                🏆
                                <div>Competitive</div>
                            </button>
                        </div>
                    )}
                </div>
                
            </div>
            <div className="ui center quickstart">
                <div>
                    <div className="title">Difficulty</div>
                    <div className="content">
                        <div className="left">
                            <button className={getButtonClass(0)} onClick={() => updateDifficulty(0)}>
                                🐭
                                <div>Turn 1 card at once.</div>
                                <div>No limit on passes</div>
                                <div>through the deck.</div>
                            </button>
                            <button className={getButtonClass(1)} onClick={() => updateDifficulty(1)}>
                                🐹
                                <div>Turn 1 card at once.</div>
                                <div>Three passes</div>
                                <div>through the deck.</div>
                            </button>
                            <button className={getButtonClass(2)} onClick={() => updateDifficulty(2)}>
                                🐰
                                <div>Turn 1 card at once.</div>
                                <div>Only a single pass</div>
                                <div>through the deck.</div>
                            </button>
                        </div>
                        <div className="right">
                            <button className={getButtonClass(3)} onClick={() => updateDifficulty(3)}>
                                🐨
                                <div>Turn 3 cards at once.</div>
                                <div>No limit on passes</div>
                                <div>through the deck.</div>
                            </button>
                            <button className={getButtonClass(4)} onClick={() => updateDifficulty(4)}>
                                🐼
                                <div>Turn 3 cards at once.</div>
                                <div>Three passes</div>
                                <div>through the deck.</div>
                            </button>
                            <button className={getButtonClass(5)} onClick={() => updateDifficulty(5)}>
                                🐻
                                <div>Turn 3 cards at once.</div>
                                <div>Only a single pass</div>
                                <div>through the deck.</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ui right quickstart">
            <div className="title">Quickstart</div>
                <div className="content">
                    <div>
                        <button className="active active-0" >
                            🖥️
                            <div>Optimized for Desktop</div>
                            <div>with Mouse Support</div>
                        </button>
                        <button disabled={true}>
                            📱
                            <div>Optimize for Mobile</div>
                            <div>with Touch Support</div>
                        </button>
                        <button className="blinking" onClick={start}>
                            🎲
                            <div>Start a new Game</div>
                            <div>using the settings</div>
                            <div>shown on this screen.</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartScreen;
