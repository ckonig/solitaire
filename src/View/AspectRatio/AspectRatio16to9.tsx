import React from "react";
import "./16to9.css";

export default class AspectRatio16to9 extends React.Component<any, { width: number; height: number }> {
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
        const suffix = this.state.width >= this.state.height * 1.778 ? "landscape" : "portrait";
        return (
            <div className="appwrapper">
                <div className={"appwrapper-" + suffix}>
                    <div className={"appwrapper-16-to-9-" + suffix}>
                        <div className="appwrapper-jail">{this.props.children}</div>
                    </div>
                </div>
            </div>
        );
    }
}
