import "./16to9.css";
import "./4to3.css";
import "./aspectratio.css";

import { Ratio } from "./Ratios";
import React from "react";

export const WindowDimensionContext = React.createContext<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
});

export default class AspectRatio extends React.Component<{ ratio: Ratio }, { width: number; height: number }> {
    constructor(props: { ratio: Ratio; children: React.ReactNode }) {
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
            <WindowDimensionContext.Provider value={this.state}>
                <div className="appwrapper">
                    <div className={`appwrapper-${this.props.ratio.prefix}-` + suffix}>
                        <div className={`appwrapper-${this.props.ratio.prefix}-` + suffix + "-inner"}>
                            <div className="appwrapper-jail">{this.props.children}</div>
                        </div>
                    </div>
                </div>
            </WindowDimensionContext.Provider>
        );
    }
}
