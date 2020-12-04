import { Component } from "react";

export default class BlinkingComponent extends Component {
    componentDidUpdate() {
        console.debug("component mounted", this.props.model);
        if (this.props.model.blinkFor) {
            console.log("I AM BLINKING");
            this.props.model.unblink();
        }
    }
}