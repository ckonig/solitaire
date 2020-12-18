import "../Style/Menu.css";

import GlobalContext from "../Context";
import React from "react";

const Menu = () => {
    //@todo persist game settings in local storage
    //@todo add selector for one-time hinting behavior: hint whole moves or single actions?

    const { state, updateContext } = React.useContext(GlobalContext);

    const setSuggestionMode = (sm) => {
        updateContext((state) => {
            if (state.settings.suggestionMode !== sm) {
                state.settings.suggestionMode = sm;
            }
        });
    };

    const setHintMode = (hm) => {
        updateContext((state) => {
            if (state.settings.hintMode !== hm) {
                state.settings.hintMode = hm;
            }
        });
    };

    const setBaseEntropy = (lvl) =>
        updateContext((state) => {
            state.setEntropy(lvl);
        });

    const setInteractionEntropy = (lvl) =>
        updateContext((state) => {
            state.settings.interactionEntropy = lvl;
        });

    const setMouseMode = (mm) =>
        updateContext((state) => {
            state.settings.mouseMode = mm;
        });

    if (!state.settings.showMenu) {
        return null;
    }

    const showHintModeSelector = ["none", "once", "twice"].indexOf(state.settings.suggestionMode) == -1;

    return (
        <div className="menu">
            <div className="title">Settings</div>
            <div className="section">
                <div className="title">Suggestions</div>
                <div className="row">
                    <div className="label">How much help - if any - should the game offer by displaying suggestions?</div>
                    <select onChange={(e) => setSuggestionMode(e.target.value)} value={state.settings.suggestionMode}>
                        {state.settings.suggestionModes.map((suggestionMode) => (
                            <option key={suggestionMode} value={suggestionMode}>
                                {suggestionMode}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {showHintModeSelector ? null : (
                <div className="section">
                    <div className="title">Hints</div>
                    <div className="row">
                        <div className="label">Should hints hightlight a single action or a complete move?</div>
                        <select onChange={(e) => setHintMode(e.target.value)} value={state.settings.hintMode}>
                            {state.settings.hintModes.map((hintMode) => (
                                <option key={hintMode} value={hintMode}>
                                    {hintMode}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            <div className="section">
                <div className="title">Active Card</div>
                <div className="row">
                    <div className="label">Should the selected card follow the cursor or remain on the stack?</div>
                    <select onChange={(e) => setMouseMode(e.target.value)} value={state.settings.mouseMode}>
                        {state.settings.mouseModes.map((mouseMode) => (
                            <option key={mouseMode} value={mouseMode}>
                                {mouseMode}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="section">
                <div className="title">Base Entropy</div>
                <div className="row">
                    <div className="label">How much chaos will the stacks on the board contain by themselves?</div>
                    <select onChange={(e) => setBaseEntropy(e.target.value)} value={state.settings.baseEntropy}>
                        {state.settings.entropyLevels.map((entropyLevel, index) => (
                            <option key={entropyLevel} value={index}>
                                {entropyLevel}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="section">
                <div className="title">Interaction Entropy</div>
                <div className="row">
                    <div className="label">How much chaos will each interaction add to a stack on the board?</div>
                    <select onChange={(e) => setInteractionEntropy(e.target.value)} value={state.settings.interactionEntropy}>
                        {state.settings.entropyLevels.map((entropyLevel, index) => (
                            <option key={entropyLevel} value={index}>
                                {entropyLevel}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <a target="_blank" rel="noreferrer" href="https://github.com/ckonig/solitaire/issues">
                Report Issues here
            </a>
        </div>
    );
};
export default Menu;
