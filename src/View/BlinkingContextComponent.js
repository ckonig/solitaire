import { Component } from "react";

export default class BlinkingContextComponent extends Component {
    constructor(selector) {
        super();
        this.timeout = null;
        this.selector = selector;
    }

    componentDidUpdate() {
        if (this.selector(this.context.state).blinkFor) {
            this.timeout = setTimeout(() => this.selector(this.context.state).unblink(), 200);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
}
