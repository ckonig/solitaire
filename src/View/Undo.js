import React, { Component } from "react";

export default class Undo extends Component {
    componentDidMount() {
        document.addEventListener("keydown", (e) => {
            const evtobj = window.event ? event : e;
            if (evtobj.keyCode == 90 && evtobj.ctrlKey) this.props.undo();
        });
    }

    render() {
        return (
            <div>
                <button
                    disabled={!this.props.model.previousStates.length}
                    title={"Undo (Penalty:" + this.props.undoLabel() + ")"}
                    onClick={this.props.undo}
                >
                    ⏪
                </button>
            </div>
        );
    }
}
