import { AppState, StateReplacer, StateUpdater } from "../../Common";

import Board from "./Board";
import BusinessModel from "../../Business/BusinessModel";
import Deck from "../../Model/Deck/Deck";
import { Provider } from "../Context";
import React from "react";

interface BoardWrapProps {
    settings: AppState;
    restart: () => void;
    deck: Deck;
}

export default class BoardWrap extends React.Component<BoardWrapProps, BusinessModel> {
    constructor(props: BoardWrapProps) {
        super(props);
        this.state = BusinessModel.getInitialState(props.settings, props.deck);
    }

    replaceContext = (modifier: StateReplacer) => this.setState(modifier);

    updateContext = (modifier: StateUpdater) =>
        this.replaceContext((state) => {
            modifier(state);
            return state;
        });

    updateGameContext = (modifier: StateUpdater) =>
        this.replaceContext((state) => {
            state.game.timemachine.modified = false;
            const previous = BusinessModel.copy(state);
            modifier(state);
            if (state.game.timemachine.modified) {
                state.game.timemachine.pushPreviousState(previous);
                return state;
            }

            return null;
        });

    render = () => {
        const context = {
            state: this.state.withHandlers().withSuggestions(),
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
