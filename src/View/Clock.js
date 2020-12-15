import { Component } from "react";
import React from "react";

export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeElapsed: false,
        };
    }

    componentDidMount() {
        const padleft = (i) => ((i + "").length == 1 ? "0" + i : i);
        setInterval(() => {
            if (this.props.started) {
                this.setState((state) => {
                    //@todo padleft or string format : 00:01
                    let msec = (this.props.end || Date.now()) - this.props.started;
                    const hh = Math.floor(msec / 1000 / 60 / 60);
                    msec -= hh * 1000 * 60 * 60;
                    const mm = Math.floor(msec / 1000 / 60);
                    msec -= mm * 1000 * 60;
                    const ss = Math.floor(msec / 1000);
                    msec -= ss * 1000;
                    state.timeElapsed = hh ? hh + ":" + padleft(mm) + ":" + padleft(ss) : padleft(mm) + ":" + padleft(ss);
                    return { ...state };
                });
            }
        }, 1000);
    }

    render() {
        return (
            this.props.started &&
            this.state.timeElapsed && (
                <div className={this.props.className}>
                    <div className="icon-container">🕒</div>
                    {this.state.timeElapsed}
                </div>
            )
        );
    }
}
