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
                <button onClick={this.props.undo}>undo (penalty:-{this.props.undoLabel()})</button>
            </div>
        );
    }
}
