import Clock from "./Clock";
import React from "react";
import Undo from "./Undo";

const Footer = (props) => {
    return (
        <div className="footer">
            <div className="footer-grid-container">
                <span>Points: {props.model.points}</span>
                <Clock className="clock" started={props.model.started} end={props.model.end} />
                <span>Is Ended: {props.model.isEnded ? "Y" : "N"}</span>
                <div><button onClick={props.reset}>reset</button></div>
                <Undo undo={props.undo} undoLabel={props.undoLabel} />
                <div><button onClick={props.beat}>beat on table</button></div>
                <div><button onClick={props.trip}>trip</button></div>
                <span className="report">
                    Report Issues <a href="https://github.com/ckonig/solitaire/issues">here</a>.
                </span>
            </div>
        </div>
    );
};
export default Footer;
