import DifficultyOptions, { DifficultyOption } from "../DifficultyOptions";
import StartScreenContext, { NavigationContext } from "../Context";

import CloseButton from "./CloseButton";
import CookieBanner from "./CookieBanner";
import { CookieContext } from "../../../Context";
import React from "react";
import Row from "./Row";
import ScreenContent from "./ScreenContent";
import ScreenMainButton from "./ScreenMainButton";

const Difficulty = () => {
    const { state, setState } = React.useContext(StartScreenContext);
    const { navigation } = React.useContext(NavigationContext);

    const isActive = (id: number) => state.difficultySettings == id;
    
    const getButtonClass = (index: number, y: number, x: number) => {
        const hasFocus = navigation.screen.x == x && navigation.screen.y == y;
        let name = isActive(index) ? `active active-${index}` : `inactive-${index}`;
        name += hasFocus ? " focused" : "";
        return name;
    };

    const renderButton = (button: DifficultyOption) => (
        <ScreenMainButton
            key={button.id}
            icon={button.icon}
            id={button.id}
            autoFocus={isActive(button.id)}
            className={(pos) => getButtonClass(button.id, pos.y, pos.x)}
            onClick={() => setState({ ...state, difficultySettings: button.id })}
            lines={button.lines}
        />
    );

    const { consented } = React.useContext(CookieContext);

    return (
        <div className="difficulty startdetails">
            <CloseButton />
            <div className="title">Difficulty</div>
            <ScreenContent id="difficulty">
                <Row skip={consented}>
                    <CookieBanner />
                </Row>
                <Row>{DifficultyOptions.slice(0, 3).map(renderButton)}</Row>
                <Row>{DifficultyOptions.slice(3).map(renderButton)}</Row>
                <Row skip={true}>
                    <div className="togglecontainer">
                        <div className="title">Draw Mode</div>
                        <div className="toggle"></div>
                        <div className="description">
                            {DifficultyOptions[state.difficultySettings].settings.drawMode == "triple"
                                ? "Turn 3 cards at once from the Stock to the Waste."
                                : null}
                            {DifficultyOptions[state.difficultySettings].settings.drawMode == "single"
                                ? "Turn 1 card after the other from the Stock to the Waste."
                                : null}
                        </div>
                    </div>
                    <div className="togglecontainer">
                        <div className="title">Pass Limit</div>
                        <div className="toggle"></div>
                        <div className="description">
                            {DifficultyOptions[state.difficultySettings].settings.recyclingMode == "1-pass"
                                ? "One pass through the deck. Waste can not be recycled to the Stock."
                                : null}
                            {DifficultyOptions[state.difficultySettings].settings.recyclingMode == "3-pass"
                                ? "Three passes through the deck. Waste can be recycled to Stock two times."
                                : null}
                            {DifficultyOptions[state.difficultySettings].settings.recyclingMode == "infinite"
                                ? "No limit on passes through the deck. Waste can be recycled to Stock endlessly."
                                : null}
                        </div>
                    </div>
                </Row>
            </ScreenContent>
        </div>
    );
};

export default Difficulty;
