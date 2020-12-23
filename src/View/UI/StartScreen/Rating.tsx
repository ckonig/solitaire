import { ScreenButton, ScreenRow } from "./Navigation";

import RatingPresets from "./RatingOptions";
import { RatingSettings } from "../../../Common";
import React from "react";
import StartScreenContext from "./Context";

export const getRatingRows = () => [
    new ScreenRow(RatingPresets.all.map((preset) => new ScreenButton(preset.id, preset.icon, [preset.label], preset))),
];

const Rating = (props: { head: string }) => {
    const ctx = React.useContext(StartScreenContext);
    const context = ctx.state;
    const setContext = ctx.setState;
    const [toggle, setToggle] = React.useState<boolean>(false);

    const applyPreset = (id: number) => setContext({ ...context, ratingSettings: { ...RatingPresets.all[id].settings }, ratingPreset: id });
    const getButtonClass = (index: number) => (context.ratingPreset == index ? `active active-${index}` : `inactive-${index}`);

    const customizeRating = (modifier: (context: RatingSettings) => void) => {
        const next = { ...context };
        modifier(next.ratingSettings);
        next.ratingPreset = RatingPresets.matchPreset(next.ratingSettings);
        setContext(next);
    };
    const setMissPenalty = (value: string) => customizeRating((r) => (r.missPenalty = value == "true"));
    const setTimeRating = (value: string) => customizeRating((r) => (r.timedMode = value == "true"));
    const setUndoPenalty = (value: string) => customizeRating((r) => (r.undoPenalty = value == "true"));
    const setHintPenalty = (value: string) => customizeRating((r) => (r.hintPenalty = value == "true"));

    return (
        <div className="ui rating startdetails quickstart">
            <div className="closer">
                <button onClick={() => setToggle(!toggle)}>{toggle ? "🗙" : "☰"}</button>
            </div>
            <div className="title">{props.head}</div>
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
                    {getRatingRows().map((row, ri) => (
                        <div key={ri}>
                            {row.buttons.map((preset) => (
                                <button key={preset.id} className={getButtonClass(preset.id)} onClick={() => applyPreset(preset.id)}>
                                    {preset.icon}
                                    <div>{preset.lines[0]}</div>
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Rating;
