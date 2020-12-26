import "../../Style/react-toggle.css";

import { ScreenButton, ScreenRow } from "./Navigation";

import RatingPresets from "./RatingOptions";
import { RatingSettings } from "../../../Common";
import React from "react";
import StartScreenContext from "./Context";
import Toggle from "react-toggle";

export const getRatingRows = () => [
    new ScreenRow(RatingPresets.all.map((preset) => new ScreenButton(preset.id, preset.icon, [preset.label], preset))),
];

const MyToggle = (props: { label: string; description: string; value: boolean; callBack: (s: boolean) => void }) => {
    const cb = (e: any) => {
        console.log(e);
        props.callBack(!props.value);
    };
    return (
        <div className="togglecontainer">
            <div className="title">{props.label}</div>
            <div className="toggle">
                <Toggle checked={props.value} onChange={cb} />
            </div>
            <div className="description">{props.description}</div>
        </div>
    );
};

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
                    <div key={ri} className="ratingrow">
                        {row.buttons.map((preset, bi) => (
                            <button key={preset.id} className={getButtonClass(preset.id, ri, bi)} onClick={() => applyPreset(preset.id)}>
                                {preset.icon}
                                <div>{preset.lines[0]}</div>
                            </button>
                        ))}
                    </div>
                ))}
                 <div className="ratingrow"></div>
                <div className="ratingrow">
                    <MyToggle
                        label="Undo Penalty"
                        description="Undo is enabled, but excessive use will be painful. This penalty starts with 2 and increases exponentially."
                        value={!!state.ratingSettings.undoPenalty}
                        callBack={setUndoPenalty}
                    />
                    <MyToggle
                        label="Time Penalty"
                        description="Fast players are rewarded with a time bonus, slow players will be punished."
                        value={!!state.ratingSettings.timedMode}
                        callBack={setTimeRating}
                    />
                </div>
                <div className="ratingrow">
                    <MyToggle
                        label="Hint Penalty"
                        description="Each manual hint will reduce the number of points by 10. This setting disables automatic suggestions. "
                        value={!!state.ratingSettings.hintPenalty}
                        callBack={setHintPenalty}
                    />
                    <MyToggle
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
