import RatingPresets from "../RatingOptions";
import { RatingSettings } from "../../../../Common";
import React from "react";
import StartScreenContext, { NavigationContext } from "../Context";
import { XY } from "../Menu/Tree";
import MenuToggle from "./MenuToggle";
import CookieBanner from "./CookieBanner";
import ScreenMainButton from "./ScreenMainButton";
import ScreenContent from "./ScreenContent";
import Row from "./Row";
import { CookieContext } from "../../../Context";

const Rating = (props: { closeScreen: () => void }) => {
    const { state, setState } = React.useContext(StartScreenContext);
    const { navigation, setNavigation } = React.useContext(NavigationContext);
    const applyPreset = (id: number) => setState({ ...state, ratingSettings: { ...RatingPresets.all[id].settings }, ratingPreset: id });

    const isActive = (id: number) => state.ratingPreset == id;

    const getButtonClass = (id: number, y: number, x: number) => {
        let name = isActive(id) ? `active active-${id}` : `inactive-${id}`;
        name += navigation.screen.x == x && navigation.screen.y == y ? " focused" : "";
        return name;
    };

    const customizeRating = (modifier: (context: RatingSettings) => void, pos: XY) => {
        const next = { ...state };
        modifier(next.ratingSettings);
        next.ratingPreset = RatingPresets.matchPreset(next.ratingSettings);
        setState(next);
        setNavigation({ ...navigation, screen: pos });
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
                            initialFocus={isActive(preset.id)}
                            className={(pos: XY) => getButtonClass(preset.id, pos.y, pos.x)}
                            onClick={() => applyPreset(preset.id)}
                            lines={[preset.label]}
                        />
                    ))}
                </Row>
                <Row>
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
                </Row>
                <Row>
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
                </Row>
            </ScreenContent>
        </div>
    );
};

export default Rating;
