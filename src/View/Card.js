import React from "react";

const Card = (props) => {
    const model = props.model;
    let className = "card card-base suit-" + model.type.icon;
    className += props.isSelected ? " card-selected" : "";
    className += props.blink ? " blink" : "";
    const style = {
        zIndex: props.zIndex ? props.zIndex : !!props.offsetTop + 2,
        top: props.offsetTop ? props.offsetTop / 10 + "vw" : 0,
    };
    return (
        <div className="stack-base">
            <div style={style} className={className} onClick={() => props.onClick({ ...model })}> 
                {model.isHidden ? (
                    <div className="card-back quarot">&nbsp;</div>
                ) : (
                    <div className="card-grid-container">
                        <div>
                            <div className="align-center">{model.type.icon}</div>
                        </div>
                        <div>
                            <div className="align-left">{model.face}</div>
                        </div>
                        <div>&nbsp;</div>
                        <div>
                            <div className="align-center">{model.type.icon}</div>
                        </div>
                        <div className="mainface">
                            <div className="align-center">{model.face}</div>
                        </div>
                        <div>
                            <div className="align-center">{model.type.icon}</div>
                        </div>
                        <div>&nbsp;</div>
                        <div>
                            <div className="align-right">{model.face}</div>
                        </div>
                        <div>
                            <div className="align-center">{model.type.icon}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Card;