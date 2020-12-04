import Clock from "./Clock";
import React from "react";

export default function Footer(props) {
    return (
        <div className="footer">
            <div className="footer-grid-container">
                <span>Points: {props.model.points}</span>
                <Clock className="clock" started={props.model.started} end={props.model.end} />
                <span>Is Ended: {props.model.isEnded ? "Y" : "N"}</span>
                <button onClick={props.reset}>reset</button>
                <span className="report">
                    Report Issues <a href="https://github.com/ckonig/solitaire/issues">here</a>.
                </span>
            </div>
        </div>
    );
}
