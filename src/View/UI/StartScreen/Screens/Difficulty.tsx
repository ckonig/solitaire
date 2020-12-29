import { ScreenButton, ScreenRow } from "./Navigation";

import DifficultyOptions from "../DifficultyOptions";
import React from "react";
import StartScreenContext, { StartScreenState } from "../Context";
import ScreenMainButton from "./ScreenMainButton";
import CookieBanner from "./CookieBanner";

const mapOption = (option: any) => new ScreenButton(option.id, option.icon, option.lines, option);

export const getDifficultyRows = () => {
    return [new ScreenRow(DifficultyOptions.slice(0, 3).map(mapOption)), new ScreenRow(DifficultyOptions.slice(3).map(mapOption))];
};

export const getDifficultyNav = (state: StartScreenState) => {
    let result = { x: 0, y: 0 };
    getDifficultyRows().forEach((row, ri) => {
        row.buttons.forEach((button, bi) => {
            if (difficultyIsActive(state, button.id)) {
                result = { x: bi, y: ri };
            }
        });
    });
    return result;
};

const difficultyIsActive = (state: StartScreenState, id: number) => state.difficultySettings == id;

const Difficulty = (props: {closeScreen: () => void}) => {
    const { state, setState } = React.useContext(StartScreenContext);
    
    const hasFocus = (y: number, x: number) => state.focus == "screen" && state.screen.x == x && state.screen.y == y;
    const getButtonClass = (index: number, y: number, x: number) => {
        const hasFocus = state.screen.x == x && state.screen.y == y;
        let name = difficultyIsActive(state, index) ? `active active-${index}` : `inactive-${index}`;
        name += hasFocus ? " focused" : "";
        return name;
    };
    return (
        <div className="difficulty startdetails">
            <div className="closer">
                <button onClick={props.closeScreen}>🗙</button>
            </div>
            <div className="title">Difficulty</div>
            <CookieBanner />
            <div className="content center">
                {getDifficultyRows().map((row, index) => (
                    <div key={index} className="row">
                        {row.buttons.map((button, bi) => (
                            <ScreenMainButton
                                key={button.id}
                                x={bi}
                                y={index}
                                icon={button.icon}
                                id={button.id}
                                hasFocus={hasFocus(index, bi)}
                                className={getButtonClass(button.id, index, bi)}
                                onClick={() => setState({ ...state, difficultySettings: button.id })}
                                lines={button.lines}
                            />
                        ))}
                    </div>
                ))}
                <div className="row"></div>
                <div className="row">
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
                </div>
            </div>
        </div>
    );
};

export default Difficulty;
