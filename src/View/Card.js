import React, { Component } from "react";

export default class Card extends Component {
    constructor(props) {
        super(props);
    }

    onClick = (e) => {
        console.debug("internal click handlere", e.clientX, e.clientY);
        let ele = e.target;
        while (ele && !ele.className.includes("card-base")) {
            ele = ele.offsetParent;
        }

        console.log("taking pos from card-base", ele.getBoundingClientRect());
        const rect = ele.getBoundingClientRect();
        const position = {
            click: {
                x: e.clientX,
                y: e.clientY,
            },
            element: {
                x: rect.x,
                y: rect.y,
            },
        };

        this.props.onClick({ ...this.props.model }, position);
    };

    render() {
        const props = this.props;
        //@todo 3d flip https://3dtransforms.desandro.com/card-flip
        //run css animation first like this:
        //https://medium.com/hackernoon/5-ways-to-animate-a-reactjs-app-in-2019-56eb9af6e3bf
        //then trigger re-render through state change in parent
        const model = props.model;
        let className = props.className + " card card-base suit-" + model.type.icon;
        className += props.isSelected ? " card-selected" : "";
        className += props.blink ? " blink" : "";
        const style = {
            zIndex: props.zIndex ? props.zIndex : !!props.offsetTop + 2,
            top: props.offsetTop ? props.offsetTop / 10 + "vw" : 0,
            ...props.model.entropyStyle,
        };
        if (props.model.offsetTop) {
            console.log("found it", props.model.offsetTop);
            style["top"] += props.model.offsetTop;
        }
        if (!props.isSelected && !props.blink && (props.shadowOffsetX || (!props.shadowOffsetX && props.shadowOffsetX === 0))) {
            const offsetY = props.shadowOffsetY || "-1";
            style["boxShadow"] = props.shadowOffsetX + "px " + offsetY + "px 4px 4px rgba(0, 0, 0, 0.75)";
        }

        const _style = {};

        if (!this.props.onClick) {
            style["pointerEvents"] = "none";
            _style["pointerEvents"] = "none";
        }

        const _div = (props) => (
            <div style={_style} className={props.className}>
                {props.children}
            </div>
        );

        return (
            <_div className="stack-base">
                <div style={style} className={className} onClick={this.onClick ? this.onClick : null}>
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
            </_div>
        );
    }
}
