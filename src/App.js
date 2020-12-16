import "./App.css";

import Launcher from "./View/Launcher";
import React from "react";
import StartScreen from "./View/StartScreen";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { initialized: false };
    }

    start = (settings) => {
        this.setState({
            ...settings,
            initialized: true,
        });
    };

    restart = () => {
        this.setState({ initialized: false });
    };

    render() {
        if (!this.state.initialized) {
            return <StartScreen start={this.start} />;
        }
        return <Launcher settings={this.state} restart={this.restart} />;
    }
}
