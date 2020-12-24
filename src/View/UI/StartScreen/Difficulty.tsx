import { ScreenButton, ScreenRow } from "./Navigation";

import DifficultyOptions from "./DifficultyOptions";
import React from "react";
import StartScreenContext from "./Context";

const mapOption = (option: any) => new ScreenButton(option.id, option.icon, option.lines, option);
export const getDifficultyRows = () => {
    return [new ScreenRow(DifficultyOptions.slice(0, 3).map(mapOption)), new ScreenRow(DifficultyOptions.slice(3).map(mapOption))];
};
const Difficulty = (props: { head: string }) => {
    const { state, setState } = React.useContext(StartScreenContext);
    const updateDifficulty = (settings: number) => setState({ ...state, difficultySettings: settings });
    const getButtonClass = (index: number, y: number, x: number) => {
        const hasFocus = state.focus == "screen"&&state.screen.x == x && state.screen.y == y;
        let name = state.difficultySettings == index ? `active active-${index}` : `inactive-${index}`;
        name += hasFocus ? " focused" : "";
        return name;
    };
    return (
        <div className="quickstart startdetails">
            <div className="title">{props.head}</div>
            <div className="title">Difficulty</div>
            <div className="content center">
                {getDifficultyRows().map((row, index) => (
                    <div key={index}>
                        {row.buttons.map((button, bi) => (
                            <button key={button.id} className={getButtonClass(button.id, index, bi)} onClick={() => updateDifficulty(button.id)}>
                                {button.icon}
                                {button.lines.map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Difficulty;
