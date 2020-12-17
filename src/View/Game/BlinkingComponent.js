import { Component } from "react";
import GlobalContext from "../Context";

export default class BlinkingComponent extends Component {
    constructor(selector) {
        super();
        this.timeout = null;
        this.selector = selector;
    }

    static contextType = GlobalContext;

    componentDidUpdate() {
        if (this.selector(this.context.state).blinkFor) {
            this.timeout = setTimeout(() => this.selector(this.context.state).unblink(), 200);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
}
