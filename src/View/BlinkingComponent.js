import { Component } from "react";

export default class BlinkingComponent extends Component {
    constructor(props) {
        super(props);
        this.timeout = null;
    }

    componentDidUpdate() {
        if (this.props.model.blinkFor) {
            this.timeout = setTimeout(() => this.props.model.unblink(), 200);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
}
