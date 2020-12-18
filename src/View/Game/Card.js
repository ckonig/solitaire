import React from "react";

const Card = (props) => {
    const onClick = (e) => {
        let ele = e.target;
        while (ele && !ele.className.includes("card-base")) {
            ele = ele.offsetParent;
        }

        const rect = ele.getBoundingClientRect();
        const position = {
            click: {
                x: e.clientX - ele.ownerDocument.defaultView.pageXOffset,
                y: e.clientY - ele.ownerDocument.defaultView.pageYOffset,
            },
            element: {
                x: rect.x,
                y: rect.y,
            },
        };

        props.onClick({ ...props.model }, position);
    };

    const getClassName = () => {
        const hasSuggestion = props.isSuggested || props.model.suggestion;
        let className = `card card-base suit-${props.model.type.icon}`;
        className += !props.isSelected && !hasSuggestion ? ` card-stack-${props.model.source}` : "";
        className += props.isSelected ? " card-selected" : "";
        className += props.blink ? " blink" : "";
        //@todo onhover, trigger highlight of suggested target card/stack (preview what happens if picked up)
        className += hasSuggestion ? " card-suggested" : "";

        return className;
    };

    const getCardStyle = () => {
        const style = {
            zIndex: props.zIndex ? props.zIndex : !!props.offsetTop + 2,
            top: props.offsetTop ? props.offsetTop / 10 + "vw" : 0,
            ...props.model.entropyStyle,
        };

        //move to left on waste (triple draw)
        if (props.offsetLeft) {
            style.left = props.offsetLeft * 4 + "vw";
        }

        if (!props.onClick) {
            style.pointerEvents = "none";
        }

        return style;
    };

    const getStackbaseStyle = () => {
        if (!props.onClick) {
            return { pointerEvents: "none" };
        }

        return {};
    };

    // @todo 3d flip https://3dtransforms.desandro.com/card-flip on unhide
    // https://medium.com/hackernoon/5-ways-to-animate-a-reactjs-app-in-2019-56eb9af6e3bf

    return (
        <div style={getStackbaseStyle()} className="stack-base">
            <div style={getCardStyle()} className={getClassName()} onClick={onClick ? onClick : null}>
                {props.model.isHidden ? (
                    <div className="card-back">&nbsp;</div>
                ) : (
                    <div className="card-grid-container">
                        <div>
                            <div className="align-center">{props.model.type.icon}</div>
                        </div>
                        <div>
                            <div className="align-left">{props.model.face}</div>
                        </div>
                        <div>&nbsp;</div>
                        <div>
                            <div className="align-center">{props.model.type.icon}</div>
                        </div>
                        <div className="mainface">
                            <div className="align-center">{props.model.face}</div>
                        </div>
                        <div>
                            <div className="align-center">{props.model.type.icon}</div>
                        </div>
                        <div>&nbsp;</div>
                        <div>
                            <div className="align-right">{props.model.face}</div>
                        </div>
                        <div>
                            <div className="align-center">{props.model.type.icon}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
