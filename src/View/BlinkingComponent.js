import { Component } from "react";

export default class BlinkingComponent extends Component {
    componentDidUpdate() {
        if (this.props.model.blinkFor) {
            this.props.model.unblink();
        }
    }
}