import SuggestionModes, { SuggestionMode } from "../../../../Model/Game/Settings/SuggestionModes";

import CloseButton from "./CloseButton";
import CookieBanner from "./CookieBanner";
import React from "react";
import Row from "./Row";
import ScreenContent from "./ScreenContent";
import ScreenToggle from "./ScreenToggle";
import useCookieContext from "../../CookieContext";
import useStartScreenContext from "../StartScreenContext";

const Suggestions = () => {
    const { consented } = useCookieContext();
    const { state, setState } = useStartScreenContext();

    const suggestionModes = SuggestionModes.allSuggestionModes();

    const isActive = (id: string) => state.suggestionMode === id;

    const isDisabled = (id: string) => id !== SuggestionModes.NONE && state.ratingSettings.hintPenalty;

    const renderToggle = (mode: SuggestionMode, index: number) => (
        <ScreenToggle
            value={isActive(mode.key)}
            disabled={isDisabled(mode.key)}
            label={mode.icon + " " + mode.label}
            callBack={() => setState({ ...state, suggestionMode: mode.key })}
            description={mode.description}
            key={index}
            autoFocus={isActive(mode.key)}
        />
    );

    return (
        <div className="suggestions startdetails">
            <CloseButton />
            <div className="title">Suggestions</div>
            <ScreenContent id="settings">
                <Row skip={consented}>
                    <CookieBanner />
                </Row>
                <Row>{suggestionModes.slice(0, 2).map(renderToggle)}</Row>
                <Row>{suggestionModes.slice(2).map(renderToggle)}</Row>
            </ScreenContent>
        </div>
    );
};

export default Suggestions;
