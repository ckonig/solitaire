import CookieBanner from "./CookieBanner";
import { CookieContext } from "../../../Context";
import React from "react";
import Row from "./Row";
import ScreenContent from "./ScreenContent";
import ScreenToggle from "./ScreenToggle";
import StartScreenContext from "../Context";
import SuggestionModes from "../../../../Model/Game/Settings/SuggestionModes";

const Suggestions = (props: { closeScreen: () => void }) => {
    const { consented } = React.useContext(CookieContext);
    const { state, setState } = React.useContext(StartScreenContext);
    const all = SuggestionModes.allSuggestionModes();
    const isActive = (id: string) => state.suggestionMode == id;
    const isDisabled = (id: string) => id !== SuggestionModes.NONE && state.ratingSettings.hintPenalty;
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
                        <ScreenToggle
                            value={isActive(mode.key)}
                            disabled={isDisabled(mode.key)}
                            label={mode.icon + " " + mode.label}
                            callBack={() => setState({ ...state, suggestionMode: mode.key })}
                            description={mode.description}
                            key={index}
                            initialFocus={isActive(mode.key)}
                        />
                    ))}
                </Row>
                <Row>
                    {all.slice(2).map((mode, index) => (
                        <ScreenToggle
                            value={isActive(mode.key)}
                            disabled={isDisabled(mode.key)}
                            label={mode.icon + " " + mode.label}
                            callBack={() => setState({ ...state, suggestionMode: mode.key })}
                            description={mode.description}
                            key={index}
                            initialFocus={isActive(mode.key)}
                        />
                    ))}
                </Row>
            </ScreenContent>
        </div>
    );
};

export default Suggestions;
