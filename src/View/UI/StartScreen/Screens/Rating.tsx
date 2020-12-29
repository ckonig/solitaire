import RatingPresets from "../RatingOptions";
import { RatingSettings } from "../../../../Common";
import React from "react";
import StartScreenContext from "../Context";
import { XY } from "../Menu/Tree";
import { ScreenNavigator } from "./Screen";
import { CookieContext } from "../../../Context";
import { _CookieBanner, _MenuToggle, _Row, _Screen, _ScreenMainButton } from "./_Components";

const Rating = (props: { closeScreen: () => void }) => {
    const { state, setState } = React.useContext(StartScreenContext);
    const { consented } = React.useContext(CookieContext);

    const applyPreset = (id: number) => setState({ ...state, ratingSettings: { ...RatingPresets.all[id].settings }, ratingPreset: id });

    const isActive = (id: number) => state.ratingPreset == id;

    const hasFocus = (y: number, x: number) => state.focus == "screen" && state.screen.x == x && state.screen.y == y;

    const getButtonClass = (id: number, y: number, x: number) => {
        let name = isActive(id) ? `active active-${id}` : `inactive-${id}`;
        name += hasFocus(y, x) ? " focused" : "";
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
            <_Screen id="penalties" navigator={new ScreenNavigator("rating")}>
                <_Row>
                    <_CookieBanner hasFocus={(pos: XY) => hasFocus(pos.y, pos.x)} />
                </_Row>
                <_Row>
                    {RatingPresets.all.map((preset) => (
                        <_ScreenMainButton
                            key={preset.id}
                            icon={preset.icon}
                            id={preset.id}
                            initialFocus={isActive(preset.id)}
                            hasFocus={(pos: XY) => hasFocus(pos.y, pos.x)}
                            className={(pos: XY) => getButtonClass(preset.id, pos.y, pos.x)}
                            onClick={() => applyPreset(preset.id)}
                            lines={[preset.label]}
                        />
                    ))}
                </_Row>
                <_Row>
                    <_MenuToggle
                        hasFocus={(pos: XY) => hasFocus(pos.y, pos.x)}
                        label="Undo Penalty"
                        description="Undo is enabled, but excessive use will be painful. This penalty starts with 2 and increases exponentially."
                        value={!!state.ratingSettings.undoPenalty}
                        callBack={setUndoPenalty}
                    />
                    <_MenuToggle
                        hasFocus={(pos: XY) => hasFocus(pos.y, pos.x)}
                        label="Time Penalty"
                        description="Fast players are rewarded with a time bonus, slow players will be punished."
                        value={!!state.ratingSettings.timedMode}
                        callBack={setTimeRating}
                    />
                </_Row>
                <_Row>
                    <_MenuToggle
                        hasFocus={(pos: XY) => hasFocus(pos.y, pos.x)}
                        label="Hint Penalty"
                        description="Each manual hint will reduce the number of points by 10. This setting disables automatic suggestions. "
                        value={!!state.ratingSettings.hintPenalty}
                        callBack={setHintPenalty}
                    />
                    <_MenuToggle
                        hasFocus={(pos: XY) => hasFocus(pos.y, pos.x)}
                        label="Miss Penalty"
                        description="Be careful where you click, as each invalid action will lead to a penalty of 10 points."
                        value={!!state.ratingSettings.missPenalty}
                        callBack={setMissPenalty}
                    />
                </_Row>
            </_Screen>
        </div>
    );
};

export default Rating;
