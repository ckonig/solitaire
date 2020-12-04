import { Component } from "react";
import React from "react";

export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeElapsed: null,
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState((state) => {
                //@todo padleft or string format : 00:01
                let msec = (this.props.end || Date.now()) - this.props.started;
                const hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                const mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                const ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                state.timeElapsed = hh ? hh + ":" + mm + ":" + ss : mm + ":" + ss;
                return { ...state };
            });
        }, 1000);
    }

    render() {
        return <span>Time Elapsed: {this.state.timeElapsed}</span>;
    }
}
