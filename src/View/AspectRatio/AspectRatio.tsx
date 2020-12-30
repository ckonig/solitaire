import React from "react";
import "./16to9.css";
import "./4to3.css";
import { Ratio } from "./Ratios";

export default class AspectRatio extends React.Component<{ ratio: Ratio }, { width: number; height: number }> {
    constructor(props: any) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        const suffix = this.state.width >= this.state.height * this.props.ratio.multiplier ? "landscape" : "portrait";
        return (
            <div className="appwrapper">
                <div className={`appwrapper-${this.props.ratio.prefix}-` + suffix}>
                    <div className={`appwrapper-${this.props.ratio.prefix}-` + suffix + "-inner"}>
                        <div className="appwrapper-jail">{this.props.children}</div>
                    </div>
                </div>
            </div>
        );
    }
}
