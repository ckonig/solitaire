import React from "react";

export default function Card(props) {
    var className = "card card-base suit-" + props.type.icon;
    className += props.isSelected ? " card-selected" : "";
    className += props.blink ? " blink" : "";
    var style = {
        zIndex: props.zIndex ? props.zIndex : !!props.offsetTop + 2,
        top: props.offsetTop ? props.offsetTop / 10 + "vw" : 0,
    };
    return (
        <div style={style} className={className} onClick={() => props.onClick({ ...props })}>
            {props.isHidden ? (
                <div className="card-back">&nbsp;</div>
            ) : (
                <div className="card-grid-container">
                    <div>
                        <div className="align-center">{props.type.icon}</div>
                    </div>
                    <div>
                        <div className="align-left">{props.face}</div>
                    </div>
                    <div>&nbsp;</div>
                    <div>
                        <div className="align-center">{props.type.icon}</div>
                    </div>
                    <div className="mainface">
                        <div className="align-center">{props.face}</div>
                    </div>
                    <div>
                        <div className="align-center">{props.type.icon}</div>
                    </div>
                    <div>&nbsp;</div>
                    <div>
                        <div className="align-right">{props.face}</div>
                    </div>
                    <div>
                        <div className="align-center">{props.type.icon}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
