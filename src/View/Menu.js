import React, { Component } from "react";

export default class Menu extends Component {
    render() {
        const props = this.props;
        if (!props.settings.showMenu) {
            return null;
        }
        return (
            <div className="menu">
                <div className="footer-grid-container">
                    <div className="stats">
                        <div>Is Ended: {props.model.isEnded ? "Y" : "N"}</div>
                    </div>
                    <div className="settings">
                        Settings
                        <div>
                            Base Entropy
                            <select onChange={(e) => props.setBaseEntropy(e.target.value)} value={props.settings.baseEntropy}>
                                {props.settings.entropyLevels.map((entropyLevel, index) => (
                                    <option key={entropyLevel} value={index}>
                                        {entropyLevel}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            Interaction Entropy
                            <select onChange={(e) => props.setInteractionEntropy(e.target.value)} value={props.settings.interactionEntropy}>
                                {props.settings.entropyLevels.map((entropyLevel, index) => (
                                    <option key={entropyLevel} value={index}>
                                        {entropyLevel}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            Card
                            <select onChange={(e) => props.setMouseMode(e.target.value)} value={props.settings.mouseMode}>
                                {props.settings.mouseModes.map((mouseMode) => (
                                    <option key={mouseMode} value={mouseMode}>
                                        {mouseMode}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            Suggestion mode
                            <select onChange={(e) => props.setSuggestionMode(e.target.value)} value={props.settings.suggestionMode}>
                                {props.settings.suggestionModes.map((suggestionMode) => (
                                    <option key={suggestionMode} value={suggestionMode}>
                                        {suggestionMode}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="report">
                        Report Issues
                        <a target="_blank" rel="noreferrer" href="https://github.com/ckonig/solitaire/issues">
                            here
                        </a>
                        .
                    </div>
                </div>
            </div>
        );
    }
}
