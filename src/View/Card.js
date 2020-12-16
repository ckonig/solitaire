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
        const hasSuggestion = this.props.isSuggested || this.props.model.suggestion;
        let className = `card card-base suit-${this.props.model.type.icon}`;
        className += !this.props.isSelected && !hasSuggestion ? ` card-stack-${this.props.model.source}` : "";
        className += this.props.isSelected ? " card-selected" : "";
        className += this.props.blink ? " blink" : "";
        //@todo onhover, trigger highlight of suggested target card/stack (preview what happens if picked up)
        className += hasSuggestion ? " card-suggested" : "";

        return className;
    };

    getCardStyle = () => {
        const style = {
            //Why?
            zIndex: this.props.zIndex ? this.props.zIndex : !!this.props.offsetTop + 2,
            top: this.props.offsetTop ? this.props.offsetTop / 10 + "vw" : 0,
            ...this.props.model.entropyStyle,
        };

        //move to left on waste (triple draw)
        if (this.props.offsetLeft) {
            style.left = this.props.offsetLeft * 4 + "vw";
        }

        if (!this.props.onClick) {
            style.pointerEvents = "none";
        }

        return style;
    };

    getStackbaseStyle = () => {
        if (!this.props.onClick) {
            return { pointerEvents: "none" };
        }

        return {};
    };

    // @todo 3d flip https://3dtransforms.desandro.com/card-flip on unhide
    // https://medium.com/hackernoon/5-ways-to-animate-a-reactjs-app-in-2019-56eb9af6e3bf

    render() {
        return (
            <div style={this.getStackbaseStyle()} className="stack-base">
                <div style={this.getCardStyle()} className={this.getClassName()} onClick={this.onClick ? this.onClick : null}>
                    {this.props.model.isHidden ? (
                        <div className="card-back">&nbsp;</div>
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
