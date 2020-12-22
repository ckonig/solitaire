import DifficultyOptions from "./DifficultyOptions";
import React from "react";
import StartScreenContext from "./Context";

const Difficulty = () => {
    const { state, setState } = React.useContext(StartScreenContext);
    const updateDifficulty = (settings: number) => setState({ ...state, difficultySettings: settings });
    const getButtonClass = (index: number) => (state.difficultySettings == index ? `active active-${index}` : `inactive-${index}`);
    return (
        <div className="quickstart">
            <div className="title">Difficulty</div>
            <div className="content">
                <div className="left">
                    {DifficultyOptions.slice(0, 3).map((option) => (
                        <button key={option.id} className={getButtonClass(option.id)} onClick={() => updateDifficulty(option.id)}>
                            {option.icon}
                            {option.lines.map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </button>
                    ))}
                </div>
                <div className="right">
                    {DifficultyOptions.slice(3).map((option) => (
                        <button key={option.id} className={getButtonClass(option.id)} onClick={() => updateDifficulty(option.id)}>
                            {option.icon}
                            {option.lines.map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Difficulty;
