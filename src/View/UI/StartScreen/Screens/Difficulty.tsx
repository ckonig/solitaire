import DifficultyOptions, { DifficultyOption } from "../DifficultyOptions";

import CloseButton from "./CloseButton";
import CookieBanner from "./CookieBanner";
import React from "react";
import Row from "./Row";
import ScreenContent from "./ScreenContent";
import ScreenMainButton from "./ScreenMainButton";
import { XY } from "../../XY";
import useCookieContext from "../../CookieContext";
import useNavigationContext from "../NavigationContext";
import useStartScreenContext from "../StartScreenContext";

const Difficulty = () => {
    const { state, setState } = useStartScreenContext();
    const { navigation } = useNavigationContext();

    const isActive = (id: number) => state.difficultySettings === id;

    const getButtonClass = (index: number, pos: XY) => {
        const hasFocus = navigation.screen.x === pos.x && navigation.screen.y === pos.y;
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
            className={(pos) => getButtonClass(button.id, pos)}
            onClick={() => setState({ ...state, difficultySettings: button.id })}
            lines={button.lines}
        />
    );

    const { consented } = useCookieContext();

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
                            {DifficultyOptions[state.difficultySettings].settings.drawMode === "triple"
                                ? "Turn 3 cards at once from the Stock to the Waste."
                                : null}
                            {DifficultyOptions[state.difficultySettings].settings.drawMode === "single"
                                ? "Turn 1 card after the other from the Stock to the Waste."
                                : null}
                        </div>
                    </div>
                    <div className="togglecontainer">
                        <div className="title">Pass Limit</div>
                        <div className="toggle"></div>
                        <div className="description">
                            {DifficultyOptions[state.difficultySettings].settings.recyclingMode === "1-pass"
                                ? "One pass through the deck. Waste can not be recycled to the Stock."
                                : null}
                            {DifficultyOptions[state.difficultySettings].settings.recyclingMode === "3-pass"
                                ? "Three passes through the deck. Waste can be recycled to Stock two times."
                                : null}
                            {DifficultyOptions[state.difficultySettings].settings.recyclingMode === "infinite"
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
