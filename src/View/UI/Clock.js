import { Component } from "react";
import React from "react";

export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeElapsed: false,
        };
        this.interval = null;
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.props.started) {
                this.setState((state) => {
                    state.timeElapsed = this.props.game.getElapsed();
                    return { ...state };
                });
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
