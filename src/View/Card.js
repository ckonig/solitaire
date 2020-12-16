import React, { Component } from "react";

export default class Card extends Component {
    onClick = (e) => {
        let ele = e.target;
        while (ele && !ele.className.includes("card-base")) {
            ele = ele.offsetParent;
        }

        //@todo use scroll difference instead
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

    getClassName = () => {
        let className = this.props.className + " card card-base suit-" + this.props.model.type.icon;
        className += this.props.isSelected ? " card-selected" : "";
        className += this.props.blink ? " blink" : "";
        //@todo onhover, trigger highlight of suggested target card/stack (preview what happens if picked up)
        className += this.props.isSuggested || this.props.model.suggestion ? " card-suggested" : "";
        return className;
    };

    getCardStyle = () => {
        const style = {
            zIndex: this.props.zIndex ? this.props.zIndex : !!this.props.offsetTop + 2,
            top: this.props.offsetTop ? this.props.offsetTop / 10 + "vw" : 0,
            ...this.props.model.entropyStyle,
        };
        if (
            !this.props.isSelected &&
            !(this.props.isSuggested || this.props.model.suggestion) &&
            !this.props.blink &&
            (this.props.shadowOffsetX || (!this.props.shadowOffsetX && this.props.shadowOffsetX === 0))
        ) {
            const offsetY = this.props.shadowOffsetY || "-1";
            style.boxShadow = this.props.shadowOffsetX + "px " + offsetY + "px 4px 4px rgba(0, 0, 0, 0.75)";
        }

        if (this.props.offsetLeft) {
            style.left = this.props.offsetLeft * 4 + "vw";
        }

        if (!this.props.onClick) {
            style.pointerEvents = "none";
        }

        return style;
    };

    getStackbaseStyle = () => {
        const _style = {};
        if (!this.props.onClick) {
            _style["pointerEvents"] = "none";
        }

        return _style;
    };

    // @todo 3d flip https://3dtransforms.desandro.com/card-flip on unhide
    // https://medium.com/hackernoon/5-ways-to-animate-a-reactjs-app-in-2019-56eb9af6e3bf

    render() {
        return (
            <div style={this.getStackbaseStyle()} className="stack-base">
                <div style={this.getCardStyle()} className={this.getClassName()} onClick={this.onClick ? this.onClick : null}>
                    {this.props.model.isHidden ? (
                        <div className="card-back quarot">&nbsp;</div>
                    ) : (
                        <div className="card-grid-container">
                            <div>
                                <div className="align-center">{this.props.model.type.icon}</div>
                            </div>
                            <div>
                                <div className="align-left">{this.props.model.face}</div>
                            </div>
                            <div>&nbsp;</div>
                            <div>
                                <div className="align-center">{this.props.model.type.icon}</div>
                            </div>
                            <div className="mainface">
                                <div className="align-center">{this.props.model.face}</div>
                            </div>
                            <div>
                                <div className="align-center">{this.props.model.type.icon}</div>
                            </div>
                            <div>&nbsp;</div>
                            <div>
                                <div className="align-right">{this.props.model.face}</div>
                            </div>
                            <div>
                                <div className="align-center">{this.props.model.type.icon}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
