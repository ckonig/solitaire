import Model from "../Model/Facade";

export default class Service {
    constructor(stateholder) {
        this._setState = (a, b) =>
            stateholder.setState((state) => {
                state.game.modified = false;
                const previous = Model.copy(state);
                a(state);
                if (state.game.modified) {
                    //@todo  use localstorage for previous state, reduce react state for performance
                    state.game.pushPreviousState(previous);
                    this.evaluateOptions(state);
                    return { ...state };
                }

                // @todo enable undoing via browser back gesture/button
                return null;
            }, b);
    }

    getHandler(hand) {
        let handler = "dispatchPickup";
        if (hand && hand.isHoldingCard()) {
            handler = "dispatchPutDown";
        }
        return this[handler];
    }

    dispatchPutDown = (card, position, index) => {
        this._setState((state) => {
            if (state.hand.isHoldingCard()) {
                this._dispatchPutDown(card, position, state, index);
            }
        });
    };

    dispatchPickup = (card, position, index) => {
        this._setState((state) => {
            if (!state.hand.isHoldingCard()) {
                this._dispatchPickup(card, position, state, index);
            }
        });
    };

    //@todo move this somewhere else
    evaluateOptions = (state) => {
        const accepted = [];
        state.suggestions.suggestions = [];
        state.suggestions.hasSuggestion = false;
        if (state.settings.showSuggestions) {
            if (state.hand.isHoldingCard() && state.waste.wouldAccept(state.hand)) {
                accepted.push("waste");
                console.log("accepting hand in waste", state.hand);
                state.waste.suggestion = true;
            } else {
                state.waste.suggestion = false;
            }
            state.foundation.stacks.forEach((stack, index) => {
                if (state.hand.isHoldingCard() && state.foundation.wouldAccept(index, state.hand)) {
                    accepted.push("foundation-" + index);
                    state.foundation.stacks[index].suggestion = true;
                } else {
                    state.foundation.stacks[index].suggestion = false;
                }
            });
            state.tableau.stacks.forEach((stack, index) => {
                if (state.hand.isHoldingCard() && state.tableau.wouldAccept(index, state.hand)) {
                    accepted.push("tableau-" + index);
                    state.tableau.stacks[index].suggestion = true;
                } else {
                    state.tableau.stacks[index].suggestion = false;
                }
            });

            //@todo to show pickup suggestions we need to spin off new hypothetical states, 
            //and evaluate the options for each possible pickup.

            if (accepted.length && !state.suggestions.hasSuggestion) {
                state.suggestions.suggestions = accepted;
                state.suggestions.hasSuggestion = true;
            }
        }
    };

    _blink = (selector, state) => this.startBlink(selector, 10, state);

    startBlink = (selector, blinkFor, state) => {
        selector(state).blinkFor = blinkFor;
        state.game.registerBlink();
        selector(state).unblink = () => setTimeout(() => this.toggleBlink(selector, 0), 100);
    };

    toggleBlink = (selector, blinkFor) =>
        this._setState((state) => {
            selector(state).blinkFor = blinkFor;
            state.game.registerBlink();
        });
}
