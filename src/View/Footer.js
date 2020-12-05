import Clock from "./Clock";
import React from "react";

const Footer = (props) => {
    return (
        <div className="footer">
            <div className="footer-grid-container">
                <span>Points: {props.model.points}</span>
                <Clock className="clock" started={props.model.started} end={props.model.end} />
                <span>Is Ended: {props.model.isEnded ? "Y" : "N"}</span>
                <button onClick={props.reset}>reset</button>
                <button onClick={props.undo}>undo</button>
                <span className="report">
                    Report Issues <a href="https://github.com/ckonig/solitaire/issues">here</a>.
                </span>
            </div>
        </div>
    );
};
export default Footer;
