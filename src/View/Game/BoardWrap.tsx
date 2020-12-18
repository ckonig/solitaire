import { AppState, StateReplacer, StateUpdater } from "../../Common";

import Board from "./Board";
import BusinessModel from "../../Business/BusinessModel";
import { Provider } from "../Context";
import React from "react";

interface BoardWrapProps {
    settings: AppState;
    restart: () => void;
}

export default class BoardWrap extends React.Component<BoardWrapProps, BusinessModel> {
    constructor(props: BoardWrapProps) {
        super(props);
        this.state = BusinessModel.getInitialState(props.settings);
    }

    replaceContext = (a: StateReplacer, b?: any) => this.setState(a, b);

    updateContext = (modifier: StateUpdater) =>
        this.replaceContext((state) => {
            modifier(state);
            return state;
        });

    updateGameContext = (modifier: StateUpdater, callback?: any) =>
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
        //this.state.withSuggestions(); @todo this will work once hints are implemented differently
        const context = {
            state: this.state.withHandlers(),
            replaceContext: this.replaceContext,
            updateContext: this.updateContext,
            updateGameContext: this.updateGameContext,
            restart: this.props.restart,
        };
        return (
            <Provider value={context}>
                <Board />
            </Provider>
        );
    };
}
