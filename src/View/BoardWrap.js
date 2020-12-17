import Board from "./Board";
import BusinessModel from "../Business/BusinessModel";
import { Provider } from "./Context";
import React from "react";

export default class BoardWrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = BusinessModel.getInitialState(props.settings);
    }

    replaceContext = (a, b) => this.setState(a, b);

    updateContext = (modifier) =>
        this.replaceContext((state) => {
            modifier(state);
            return state;
        });

    updateGameContext = (modifier, callback) =>
        this.replaceContext((state) => {
            state.game.timemachine.modified = false;
            const previous = BusinessModel.copy(state);
            modifier(state);
            if (state.game.timemachine.modified) {
                state.game.timemachine.pushPreviousState(previous);
                state.suggest();
                return state;
            }

            return null;
        }, callback);

    render = () => {
        this.state.assignHandlers(this.updateGameContext);
        const context = {
            state: this.state,
            replaceContext: this.replaceContext,
            updateContext: this.updateContext,
            restart: this.props.restart,
        };
        return (
            <Provider value={context}>
                <Board />
            </Provider>
        );
    };
}
