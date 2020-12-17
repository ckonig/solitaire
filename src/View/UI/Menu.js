import "../../Style/Menu.css";

import GlobalContext from "../Context";
import React from "react";

const Menu = () => {
    const {state, handlers} = React.useContext(GlobalContext);
    //@todo if game not yet started, allow configuration of dealing behavior (preselect enable on desktop, disable on mobile)
    if (!state.settings.showMenu) {
        return null;
    }
    return (
        <div className="menu">
            <div className="title">Settings</div>
            <div className="section">
                <div className="title">Suggestions</div>
                <div className="row">
                    <span className="label">
                        <div className="description">How much help - if any - should the game offer by displaying suggestions?</div>
                    </span>
                    <select
                        className="input"
                        onChange={(e) => handlers.setSuggestionMode(e.target.value)}
                        value={state.settings.suggestionMode}
                    >
                        {state.settings.suggestionModes.map((suggestionMode) => (
                            <option key={suggestionMode} value={suggestionMode}>
                                {suggestionMode}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="section">
                <div className="title">Active Card</div>
                <div className="row">
                    <div className="label">
                        <div className="description">Should the selected card follow the cursor or remain on the stack?</div>
                    </div>

                    <select
                        className="input"
                        onChange={(e) => handlers.setMouseMode(e.target.value)}
                        value={state.settings.mouseMode}
                    >
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
                    <div className="label">
                        <div className="description">How much chaos will the stacks on the board contain by themselves?</div>
                    </div>
                    <select
                        className="input"
                        onChange={(e) => handlers.setBaseEntropy(e.target.value)}
                        value={state.settings.baseEntropy}
                    >
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
                    <div className="label">
                        <div className="description">How much chaos will each interaction add to a stack on the board?</div>
                    </div>

                    <select
                        className="input"
                        onChange={(e) => handlers.setInteractionEntropy(e.target.value)}
                        value={state.settings.interactionEntropy}
                    >
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
