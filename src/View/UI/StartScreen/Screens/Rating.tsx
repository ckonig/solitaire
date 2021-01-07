import StartScreenContext, { NavigationContext, StartScreenState } from "../Context";

import CookieBanner from "./CookieBanner";
import { CookieContext } from "../../../Context";
import RatingPresets from "../RatingOptions";
import { RatingSettings } from "../../../../Common";
import React from "react";
import Row from "./Row";
import ScreenContent from "./ScreenContent";
import ScreenMainButton from "./ScreenMainButton";
import ScreenToggle from "./ScreenToggle";
import SuggestionModes from "../../../../Model/Game/Settings/SuggestionModes";
import { XY } from "../../XY";

const Rating = (props: { closeScreen: () => void }) => {
    const { state, setState } = React.useContext(StartScreenContext);
    const { navigation } = React.useContext(NavigationContext);
    const applyPreset = (id: number) => setState({ ...state, ratingSettings: { ...RatingPresets.all[id].settings }, ratingPreset: id });

    const isActive = (id: number) => state.ratingPreset == id;

    const getButtonClass = (id: number, y: number, x: number) => {
        let name = isActive(id) ? `active active-${id}` : `inactive-${id}`;
        name += navigation.screen.x == x && navigation.screen.y == y ? " focused" : "";
        return name;
    };

    const customizeRating = (modifier: (context: RatingSettings) => void) => {
        const next = { ...state };
        modifier(next.ratingSettings);
        next.ratingPreset = RatingPresets.matchPreset(next.ratingSettings);
        setState(next);
    };
    const customizeRating2 = (ratingModifier: (context: RatingSettings) => void, modifier: (context: StartScreenState) => void) => {
        const next = { ...state };
        ratingModifier(next.ratingSettings);
        modifier(next);
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

    const setHintPenalty = (value: boolean) => {
        customizeRating2(
            (r) => {
                r.hintPenalty = value;
            },
            (s) => {
                s.suggestionMode = value ? SuggestionModes.NONE : SuggestionModes.REGULAR;
            }
        );
    };

    const { consented } = React.useContext(CookieContext);

    return (
        <div className="rating startdetails">
            <div className="closer">
                <button onClick={props.closeScreen}>🗙</button>
            </div>
            <div className="title">Penalties</div>
            <ScreenContent id="penalties">
                <Row skip={consented}>
                    <CookieBanner />
                </Row>
                <Row>
                    {RatingPresets.all.map((preset) => (
                        <ScreenMainButton
                            key={preset.id}
                            icon={preset.icon}
                            id={preset.id}
                            initialFocus={isActive(preset.id)||state.ratingPreset == -1 && preset.id == 0}
                            className={(pos: XY) => getButtonClass(preset.id, pos.y, pos.x)}
                            onClick={() => applyPreset(preset.id)}
                            lines={[preset.label]}
                        />
                    ))}
                </Row>
                <Row>
                    <ScreenToggle
                        label="Undo Penalty"
                        description="Undo is enabled, but excessive use will be painful. This penalty starts with 2 and increases exponentially."
                        value={!!state.ratingSettings.undoPenalty}
                        callBack={setUndoPenalty}
                    />
                    <ScreenToggle
                        label="Time Penalty"
                        description="Fast players are rewarded with a time bonus, slow players will be punished."
                        value={!!state.ratingSettings.timedMode}
                        callBack={setTimeRating}
                    />
                </Row>
                <Row>
                    <ScreenToggle
                        label="Hint Penalty"
                        description="Each manual hint will reduce the number of points by 10. This setting disables automatic suggestions. "
                        value={!!state.ratingSettings.hintPenalty}
                        callBack={setHintPenalty}
                    />
                    <ScreenToggle
                        label="Miss Penalty"
                        description="Be careful where you click, as each invalid action will lead to a penalty of 10 points."
                        value={!!state.ratingSettings.missPenalty}
                        callBack={setMissPenalty}
                    />
                </Row>
            </ScreenContent>
        </div>
    );
};

export default Rating;
