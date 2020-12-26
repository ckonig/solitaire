import "../../Style/react-toggle.css";

import { ScreenButton, ScreenRow } from "./Navigation";

import RatingPresets from "./RatingOptions";
import { RatingSettings } from "../../../Common";
import React from "react";
import StartScreenContext from "./Context";
import MenuToggle from "./MenuToggle";

export const getRatingRows = () => [
    new ScreenRow(RatingPresets.all.map((preset) => new ScreenButton(preset.id, preset.icon, [preset.label], preset))),
];

const Rating = () => {
    const { state, setState } = React.useContext(StartScreenContext);

    const applyPreset = (id: number) => setState({ ...state, ratingSettings: { ...RatingPresets.all[id].settings }, ratingPreset: id });
    const getButtonClass = (index: number, y: number, x: number) => {
        const hasFocus = state.focus == "screen" && state.screen.x == x && state.screen.y == y;
        let name = state.ratingPreset == index ? `active active-${index}` : `inactive-${index}`;
        name += hasFocus ? " focused" : "";
        return name;
    };

    const customizeRating = (modifier: (context: RatingSettings) => void) => {
        const next = { ...state };
        modifier(next.ratingSettings);
        next.ratingPreset = RatingPresets.matchPreset(next.ratingSettings);
        setState(next);
    };
    const setMissPenalty = (value: boolean) =>
        customizeRating((r) => {
            r.missPenalty = value;
        });
    const setTimeRating = (value: boolean) =>
        customizeRating((r) => {
            r.timedMode = value;
        });
    const setUndoPenalty = (value: boolean) =>
        customizeRating((r) => {
            r.undoPenalty = value;
        });
    const setHintPenalty = (value: boolean) =>
        customizeRating((r) => {
            r.hintPenalty = value;
        });

    return (
        <div className="ui rating startdetails">
            <div className="closer">
                <button onClick={() => {}}>🗙</button>
            </div>
            <div className="title">Rating</div>

            <div className="content center">
                {getRatingRows().map((row, ri) => (
                    <div key={ri} className="row">
                        {row.buttons.map((preset, bi) => (
                            <button key={preset.id} className={getButtonClass(preset.id, ri, bi)} onClick={() => applyPreset(preset.id)}>
                                {preset.icon}
                                <div>{preset.lines[0]}</div>
                            </button>
                        ))}
                    </div>
                ))}
                 <div className="row"></div>
                <div className="row">
                    <MenuToggle
                        label="Undo Penalty"
                        description="Undo is enabled, but excessive use will be painful. This penalty starts with 2 and increases exponentially."
                        value={!!state.ratingSettings.undoPenalty}
                        callBack={setUndoPenalty}
                    />
                    <MenuToggle
                        label="Time Penalty"
                        description="Fast players are rewarded with a time bonus, slow players will be punished."
                        value={!!state.ratingSettings.timedMode}
                        callBack={setTimeRating}
                    />
                </div>
                <div className="row">
                    <MenuToggle
                        label="Hint Penalty"
                        description="Each manual hint will reduce the number of points by 10. This setting disables automatic suggestions. "
                        value={!!state.ratingSettings.hintPenalty}
                        callBack={setHintPenalty}
                    />
                    <MenuToggle
                        label="Miss Penalty"
                        description="Be careful where you click, as each invalid action will lead to a penalty of 10 points."
                        value={!!state.ratingSettings.missPenalty}
                        callBack={setMissPenalty}
                    />
                </div>
            </div>
        </div>
    );
};

export default Rating;
