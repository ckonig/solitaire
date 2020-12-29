import { ScreenButton, ScreenRow } from "./Navigation";

import RatingPresets from "../RatingOptions";
import { RatingSettings } from "../../../../Common";
import React from "react";
import StartScreenContext, { StartScreenState } from "../Context";
import MenuToggle from "./MenuToggle";
import ScreenMainButton from "./ScreenMainButton";
import { XY } from "../Menu/Tree";
import CookieBanner from "./CookieBanner";

export const getRatingRows = () => [
    new ScreenRow(RatingPresets.all.map((preset) => new ScreenButton(preset.id, preset.icon, [preset.label], preset))),
    //this can be done better
    new ScreenRow([new ScreenButton<any>(-1, "", [], null), new ScreenButton<any>(-1, "", [], null)]),
    new ScreenRow([new ScreenButton<any>(-1, "", [], null), new ScreenButton<any>(-1, "", [], null)]),
];
export const getRatingNav = (state: StartScreenState) => {
    let result = { x: 0, y: 0 };
    getRatingRows().forEach((row, ri) => {
        row.buttons.forEach((button, bi) => {
            if (ratingIsActive(state, button.id)) {
                result = { x: bi, y: ri };
            }
        });
    });
    return result;
};
const ratingIsActive = (state: StartScreenState, id: number) => state.ratingPreset == id;
const ratingHasFocus = (state: StartScreenState, y: number, x: number) =>
    state.focus == "screen" && state.screen.x == x && state.screen.y == y;

const Rating = (props: {closeScreen: () => void}) => {
    const { state, setState } = React.useContext(StartScreenContext);
    
    const applyPreset = (id: number) => setState({ ...state, ratingSettings: { ...RatingPresets.all[id].settings }, ratingPreset: id });

    const getButtonClass = (id: number, y: number, x: number) => {
        let name = ratingIsActive(state, id) ? `active active-${id}` : `inactive-${id}`;
        name += ratingHasFocus(state, y, x) ? " focused" : "";
        return name;
    };

    const customizeRating = (modifier: (context: RatingSettings) => void, pos: XY) => {
        const next = { ...state };
        modifier(next.ratingSettings);
        next.screen = pos;
        next.ratingPreset = RatingPresets.matchPreset(next.ratingSettings);
        setState(next);
    };
    const setMissPenalty = (value: boolean, pos: XY) =>
        customizeRating((r) => {
            r.missPenalty = value;
        }, pos);
    const setTimeRating = (value: boolean, pos: XY) =>
        customizeRating((r) => {
            r.timedMode = value;
        }, pos);
    const setUndoPenalty = (value: boolean, pos: XY) =>
        customizeRating((r) => {
            r.undoPenalty = value;
        }, pos);
    const setHintPenalty = (value: boolean, pos: XY) => {
        customizeRating((r) => {
            r.hintPenalty = value;
        }, pos);
    };

    return (
        <div className="rating startdetails">
            <div className="closer">
                <button onClick={props.closeScreen}>🗙</button>
            </div>
            <div className="title">Penalties</div>

            <CookieBanner />

            <div className="content center">
                {getRatingRows()
                    .slice(0, 1)
                    .map((row, ri) => (
                        <div key={ri} className="row">
                            {row.buttons.map((preset, bi) => (
                                <ScreenMainButton
                                    key={preset.id}
                                    x={bi}
                                    y={ri}
                                    icon={preset.icon}
                                    id={preset.id}
                                    hasFocus={ratingHasFocus(state, ri, bi)}
                                    className={getButtonClass(preset.id, ri, bi)}
                                    onClick={() => applyPreset(preset.id)}
                                    lines={[preset.lines[0]]}
                                />
                            ))}
                        </div>
                    ))}
                <div className="row"></div>
                <div className="row">
                    <MenuToggle
                        x={0}
                        y={1}
                        hasFocus={ratingHasFocus(state, 1, 0)}
                        label="Undo Penalty"
                        description="Undo is enabled, but excessive use will be painful. This penalty starts with 2 and increases exponentially."
                        value={!!state.ratingSettings.undoPenalty}
                        callBack={setUndoPenalty}
                    />
                    <MenuToggle
                        x={1}
                        y={1}
                        hasFocus={ratingHasFocus(state, 1, 1)}
                        label="Time Penalty"
                        description="Fast players are rewarded with a time bonus, slow players will be punished."
                        value={!!state.ratingSettings.timedMode}
                        callBack={setTimeRating}
                    />
                </div>
                <div className="row">
                    <MenuToggle
                        x={0}
                        y={2}
                        hasFocus={ratingHasFocus(state, 2, 0)}
                        label="Hint Penalty"
                        description="Each manual hint will reduce the number of points by 10. This setting disables automatic suggestions. "
                        value={!!state.ratingSettings.hintPenalty}
                        callBack={setHintPenalty}
                    />
                    <MenuToggle
                        x={1}
                        y={2}
                        hasFocus={ratingHasFocus(state, 2, 1)}
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
