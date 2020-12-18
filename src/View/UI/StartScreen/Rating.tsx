import { RatingSettings } from "../../../Common";
import React from "react";
import StartScreenContext from "./Context";

const Rating = () => {
    const ctx = React.useContext(StartScreenContext);
    const [toggle, setToggle] = React.useState<boolean>(false);
    const context = ctx.state;
    const setState = ctx.setState;
    const presets = [
        {
            id: 0,
            icon: "🌴",
            label: "Chill",
            settings: {
                timedMode: false,
                missPenalty: false,
                undoPenalty: false,
                hintPenalty: false,
            },
        },
        {
            id: 1,
            icon: "⚖️",
            label: "Regular",
            settings: {
                timedMode: true,
                missPenalty: false,
                undoPenalty: true,
                hintPenalty: false,
            },
        },
        {
            id: 2,
            icon: "🏆",
            label: "Competitive",
            settings: {
                timedMode: true,
                missPenalty: true,
                undoPenalty: true,
                hintPenalty: true,
            },
        },
    ];

    const applyPreset = (id: number) => {
        const newState = { ...context, ratingSettings: presets[id].settings, ratingPreset: id };
        setState(newState);
        console.log("applied preset", newState);
    };

    const getButtonClass = (index: number) => (context.ratingPreset == index ? `active active-${index}` : "");

    const customizeRating = (modifier: (context: RatingSettings) => void) => {
        const next = { ...context };
        modifier(next.ratingSettings);
        next.ratingPreset = -1;
        setState(next);
    };

    const setMissPenalty = (value: string) => customizeRating((r) => (r.missPenalty = value == "true"));
    const setTimeRating = (value: string) => customizeRating((r) => (r.timedMode = value == "true"));
    const setUndoPenalty = (value: string) => customizeRating((r) => (r.undoPenalty = value == "true"));
    const setHintPenalty = (value: string) => customizeRating((r) => (r.hintPenalty = value == "true"));

    return (
        <div className="ui left quickstart">
            <div className="closer">
                <button onClick={() => setToggle(!toggle)}>{toggle ? "🗙" : "☰"}</button>
            </div>
            <div className="title">{toggle ? "Customize Rating" : "Rating"}</div>

            {toggle ? (
                <div className="content">
                    <div className="section">
                        <div className="title">Undo Penalty</div>
                        <div className="row">
                            <div className="label">
                                Should there be a penalty for the UNDO operation? This penalty increases exponentially.
                            </div>
                            <select onChange={(e) => setUndoPenalty(e.target.value)} value={String(!!context.ratingSettings.undoPenalty)}>
                                <option value={"true"}>yes</option>
                                <option value={"false"}>no</option>
                            </select>
                        </div>
                    </div>
                    <div className="section">
                        <div className="title">Hint Penalty</div>
                        <div className="row">
                            <div className="label">Should there be a penalty for the HINT operation? This penalty does not increase.</div>
                            <select onChange={(e) => setHintPenalty(e.target.value)} value={String(!!context.ratingSettings.hintPenalty)}>
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
                                <a href="https://en.wikipedia.org/wiki/Klondike_(solitaire)#Scoring" rel="noreferrer" target="_blank">
                                    here
                                </a>
                                ?
                            </div>
                            <select onChange={(e) => setTimeRating(e.target.value)} value={String(!!context.ratingSettings.timedMode)}>
                                <option value={"true"}>yes</option>
                                <option value={"false"}>no</option>
                            </select>
                        </div>
                    </div>
                    <div className="section">
                        <div className="title">Miss Penalty</div>
                        <div className="row">
                            <div className="label">Should there be a penalty for attempting to perform invalid actions?</div>
                            <select onChange={(e) => setMissPenalty(e.target.value)} value={String(!!context.ratingSettings.missPenalty)}>
                                <option value={"true"}>yes</option>
                                <option value={"false"}>no</option>
                            </select>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="content center">
                    <div>
                        {presets.map((preset) => (
                            <button className={getButtonClass(preset.id)} key={preset.id} onClick={() => applyPreset(preset.id)}>
                                {preset.icon}
                                <div>{preset.label}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Rating;
