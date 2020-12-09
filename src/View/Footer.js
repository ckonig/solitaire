import Clock from "./Clock";
import React from "react";
import Undo from "./Undo";

const Footer = (props) => {
    return (
        <div className="footer">
            <div className="footer-grid-container">
                <div className="stats">
                    Game Stats
                    <div>Points: {props.model.points}</div>
                    <Clock className="clock" started={props.model.started} end={props.model.end} />
                    <div>Is Ended: {props.model.isEnded ? "Y" : "N"}</div>
                </div>
                <div className="actions">
                    Game Actions
                    <div>
                        <button onClick={props.reset}>reset</button>
                    </div>
                    <Undo undo={props.undo} undoLabel={props.undoLabel} />
                    <div></div>
                </div>

                <div className="entropy">
                    Entropy
                    <div>
                        <button onClick={props.beat}>beat on table</button>
                    </div>
                    <div>
                        Base Level
                        <select onChange={(e) => props.setBaseEntropy(e.target.value)} value={props.settings.baseEntropy}>
                            {props.settings.entropyLevels.map((entropyLevel, index) => (
                                <option key={entropyLevel} value={index}>
                                    {entropyLevel}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        Interaction Level
                        <select onChange={(e) => props.setInteractionEntropy(e.target.value)} value={props.settings.interactionEntropy}>
                            {props.settings.entropyLevels.map((entropyLevel, index) => (
                                <option key={entropyLevel} value={index}>
                                    {entropyLevel}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="settings">
                    UI Settings
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
                        <button onClick={props.toggleShowSuggestions}>Toggle Suggestions</button>
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
};
export default Footer;
