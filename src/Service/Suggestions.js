import Facade from "../Model/Facade";
import Foundation from "./Foundation";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

//@todo this works nicely, but looks too verbose to comprehend
export default class Suggestions {
    constructor(state) {
        this.state = state;
        this.foundation = new Foundation(null);
        this.tableau = new Tableau(null);
        this.waste = new Waste(null);
        this.stock = new Stock(null);
    }

    getPutdownSuggestions = (state, onlyUseful) => {
        const accepted = [];
        if (state.settings.suggestionMode !== "none" && state.hand.isHoldingCard() && state.waste.wouldAccept(state.hand)) {
            if (state.settings.suggestionMode === "full" || state.hand.source !== "waste") {
                const move = { target: "waste", source: state.hand.source };
                if (state.settings.suggestionMode !== "scored" || state.game.rateMove(move) > 0) {
                    accepted.push(move);
                    state.waste.suggestion = true;
                }
            }
        }
        state.foundation.stacks.forEach((_stack, index) => {
            if (state.settings.suggestionMode !== "none" && state.hand.isHoldingCard() && state.foundation.wouldAccept(index, state.hand)) {
                if (state.settings.suggestionMode === "full" || state.hand.source !== "foundation-" + index) {
                    const move = { target: "foundation-" + index, source: state.hand.source };
                    if (state.settings.suggestionMode !== "scored" || state.game.rateMove(move) > 0) {
                        accepted.push(move);
                        state.foundation.stacks[index].suggestion = true;
                    }
                }
            }
        });
        state.tableau.stacks.forEach((_stack, index) => {
            if (state.settings.suggestionMode != "none" && state.hand.isHoldingCard() && state.tableau.wouldAccept(index, state.hand)) {
                if (state.settings.suggestionMode === "full" || state.hand.source !== "tableau-" + index) {
                    if (
                        !onlyUseful ||
                        state.settings.suggestionMode === "full" ||
                        //filter out moves of King from empty slot to empty slot
                        (!(
                            state.hand.currentCard().face == "K" &&
                            state.tableau.stacks[index].stack.length == 0 &&
                            state.hand.source.substring(0, 8) == "tableau-" &&
                            state.tableau.stacks[state.hand.source.substring(8)].stack.length == 0
                        ) &&
                            //// filter out moves between stacks if same (non-hidden) parent card
                            !(
                                state.tableau.stacks[index].stack.length > 0 &&
                                state.hand.source.substring(0, 8) == "tableau-" &&
                                state.tableau.stacks[state.hand.source.substring(8)].stack.length > 0 &&
                                state.tableau.stacks[index].stack[state.tableau.stacks[index].stack.length - 1].face ==
                                    state.tableau.stacks[state.hand.source.substring(8)].stack[
                                        state.tableau.stacks[state.hand.source.substring(8)].stack.length - 1
                                    ].face &&
                                !state.tableau.getTop(state.hand.source.substring(8)).isHidden
                            ))
                    ) {
                        const move = { target: "tableau-" + index, source: state.hand.source };
                        if (state.settings.suggestionMode !== "scored" || state.game.rateMove(move) > 0) {
                            accepted.push(move);
                            state.tableau.stacks[index].suggestion = true;
                        }
                    }
                }
            }
        });

        return accepted.map((a) => ({ ...a, points: state.game.rateMove(a) }));
    };

    getUncoverOptions = (state) => {
        const options = [];
        if (!state.hand.isHoldingCard()) {
            state.tableau.stacks.forEach((stack, stackindex) => {
                const top = state.tableau.getTop(stackindex);
                if (top && top.isHidden) {
                    top.suggestion = true;
                    options.push("tableau-" + stackindex);
                }
            });
        }

        return options;
    };

    evaluateOptions = (state) => {
        state.waste.suggestion = false;
        state.waste.stack.forEach((c) => {
            c.suggestion = false;
        });

        state.stock.suggestion = false;
        state.stock.stack.forEach((c) => {
            c.suggestion = false;
        });

        state.tableau.stacks.forEach((s) => {
            s.suggestion = false;
            s.stack.forEach((c) => {
                c.suggestion = false;
            });
        });

        state.foundation.stacks.forEach((s) => {
            s.suggestion = false;
            s.stack.forEach((c) => {
                c.suggestion = false;
            });
        });

        if (state.settings.suggestionMode !== "none") {
            const uncoverOptions = this.getUncoverOptions(state);

            if (!uncoverOptions.length) {
                const acceptedPutdown = this.getPutdownSuggestions(state);

                if (!acceptedPutdown.length && !state.hand.isHoldingCard()) {
                    let foundAny = false;
                    const wasteState = Facade.copy(state);
                    this.waste._dispatchPickup(wasteState.waste.getTop(), null, wasteState);
                    if (wasteState.game.modified) {
                        const wasteSuggestions = this.getPutdownSuggestions(wasteState, true);
                        if (wasteSuggestions.length > (state.settings.suggestionMode == "full" ? 1 : 0)) {
                            state.waste.suggestion = true;
                            foundAny = true;
                        }
                    }

                    state.tableau.stacks.forEach((tableau, index) => {
                        state.tableau.getStack(index).stack.forEach((card, cardIndex) => {
                            if (!card.isHidden) {
                                const tableauState = Facade.copy(state);
                                this.tableau._dispatchPickup(card, null, tableauState, index);
                                if (tableauState.game.modified) {
                                    const tableauSuggestions = this.getPutdownSuggestions(tableauState, true);
                                    if (tableauSuggestions.length > (state.settings.suggestionMode == "full" ? 1 : 0)) {
                                        state.tableau.stacks[index].stack[cardIndex].suggestion = true;
                                        foundAny = true;
                                    }
                                }
                            }
                        });
                    });

                    if (!foundAny || state.settings.suggestionMode == "full") {
                        state.stock.suggestion = true;
                    }
                }
            }
        }
    };
}
