import StartScreenContext, { NavigationContext } from "../Context";

import CookieBanner from "./CookieBanner";
import { CookieContext } from "../../../Context";
import React from "react";
import Row from "./Row";
import ScreenContent from "./ScreenContent";
import ScreenMainButton from "./ScreenMainButton";
import SuggestionModes from "../../../../Model/Game/Settings/SuggestionModes";

const Suggestions = (props: { closeScreen: () => void }) => {
    const { consented } = React.useContext(CookieContext);
    const { state, setState } = React.useContext(StartScreenContext);
    const { navigation } = React.useContext(NavigationContext);
    const all = SuggestionModes.allSuggestionModes();

    const isActive = (id: string) => state.suggestionMode == id;

    const isDisabled = (id: string) => id !== SuggestionModes.NONE && state.ratingSettings.hintPenalty;

    const getLabel = (mode: any) => [mode.label];

    const getButtonClass = (id: string, index: number, y: number, x: number) => {
        let name = isActive(id) && !isDisabled(id) ? `active active-${index}` : `inactive-${index}`;
        name += navigation.screen.x == x && navigation.screen.y == y ? " focused" : "";
        name += isDisabled(id) ? " disabled" : "";
        return name;
    };
    return (
        <div className="suggestions startdetails">
            <div className="closer">
                <button onClick={props.closeScreen}>🗙</button>
            </div>
            <div className="title">Suggestions</div>
            <ScreenContent id="settings">
                <Row skip={consented}>
                    <CookieBanner />
                </Row>
                <Row>
                    {all.slice(0, 2).map((mode, index) => (
                        <ScreenMainButton
                            id={index}
                            icon={mode.icon}
                            disabled={mode.key !== SuggestionModes.NONE && state.ratingSettings.hintPenalty}
                            className={(pos) => getButtonClass(mode.key, 0, pos.y, pos.x)}
                            onClick={() => {
                                setState({ ...state, suggestionMode: mode.key });
                            }}
                            lines={getLabel(mode)}
                            initialFocus={isActive(mode.key)}
                            key={index}
                        />
                    ))}
                </Row>
                <Row>
                    {all.slice(2).map((mode, index) => (
                        <ScreenMainButton
                            id={index + 2}
                            icon={mode.icon}
                            disabled={state.ratingSettings.hintPenalty}
                            className={(pos) => getButtonClass(mode.key, 0, pos.y, pos.x)}
                            onClick={() => {
                                setState({ ...state, suggestionMode: mode.key });
                            }}
                            lines={getLabel(mode)}
                            initialFocus={isActive(mode.key)}
                            key={index}
                        />
                    ))}
                </Row>
                <Row skip={true}>
                    <div className="togglecontainer">
                        <div className="title">{SuggestionModes.get(state.suggestionMode).label}</div>
                        <div className="toggle"></div>
                        <div className="description">{SuggestionModes.get(state.suggestionMode).description}</div>
                    </div>
                    {state.suggestionMode == SuggestionModes.NONE && state.ratingSettings.hintPenalty ? (
                        <div className="togglecontainer">
                            <div className="title">NOTE</div>
                            <div className="toggle"></div>
                            <div className="description">
                                All other options are disabled. Disable Rate Penalty to change suggestion mode.
                            </div>
                        </div>
                    ) : null}
                </Row>
            </ScreenContent>
        </div>
    );
};

export default Suggestions;
