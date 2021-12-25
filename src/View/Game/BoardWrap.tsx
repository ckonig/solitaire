import { LaunchSettings, StateReplacer, StateUpdater } from "../../Common";

import Board from "./Board";
import { BoardProvider } from "../Context/BoardContext";
import Deck from "../../Model/Deck/Deck";
import EndScreen from "../UI/EndScreen";
import Model from "../../Model/Model";
import { Provider } from "../GlobalContext";
import React from "react";

interface BoardWrapProps {
    settings: LaunchSettings;
    restart: () => void;
    deck: Deck;
    player: number;
}

//We use class component here because setState allows partial updates
//in theory, useState supports partial updates and bailouts too but needs testing of Object.is compatibility on Model 
export default class BoardWrap extends React.Component<BoardWrapProps, Model> {
    constructor(props: BoardWrapProps) {
        super(props);
        this.state = Model.getInitialState(props.settings, props.deck, props.player);
    }

    //replacecontext is hard replacement, for restart and undo
    replaceContext = (modifier: StateReplacer) => this.setState(modifier);

    //updatecontext is soft replacement used for navigation.
    updateContext = (modifier: StateUpdater) =>
        this.replaceContext((state) => {
            modifier(state);
            return state;
        });

    //updateGameContext is for undo-able game actions
    updateGameContext = (modifier: StateUpdater) =>
        this.replaceContext((state) => {
            state.game.timemachine.modified = false;
            const previous = Model.copy(state);
            if (previous.game.timemachine.previousStates.length) {
                previous.game.timemachine.previousStates = [
                    //@todo this also assigns non-memorable states
                    //@todo instead of array, always have single previous state
                    //@todo this could still grow too big in memory
                    //@todo implement model.boardEquals and pointsEquals to get rid of 'memorable' states?
                    previous.game.timemachine.previousStates[previous.game.timemachine.previousStates.length - 1],
                ];
            } else {
                previous.game.timemachine.previousStates = [];
            }

            modifier(state);
            if (state.game.timemachine.modified) {
                state.game.timemachine.pushPreviousState(previous);
                state.setToken(Math.random());
                return state;
            }

            return null;
        });

    //on every render, we refresh the click handlers in the model and the suggestions
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
                <BoardProvider value={{ player: this.props.player }}>
                    <Board mode={this.props.settings.boardMode} />
                </BoardProvider>
                <EndScreen />
            </Provider>
        );
    };
}
