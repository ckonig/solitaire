import Facade from "../Model/Facade";
import Foundation from "./Foundation";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

export default class Suggestions {
    constructor(state) {
        this.state = state;
        this.foundation = new Foundation(null);
        this.tableau = new Tableau(null);
        this.waste = new Waste(null);
        this.stock = new Stock(null);
    }

    getPutdownSuggestions = (state, onlyUseful) => {
        //@todo rate possible moves, enable toggling between none/all/most-useful options

        const accepted = [];
        if (
            state.settings.showSuggestions &&
            state.hand.isHoldingCard() &&
            state.waste.wouldAccept(state.hand) &&
            state.hand.source !== "waste"
        ) {
            accepted.push("waste");
            console.log("accepting hand in waste", state.hand);
            state.waste.suggestion = true;
        }
        state.foundation.stacks.forEach((stack, index) => {
            if (
                state.settings.showSuggestions &&
                state.hand.isHoldingCard() &&
                state.foundation.wouldAccept(index, state.hand) &&
                state.hand.source !== "foundation-" + index
            ) {
                accepted.push("foundation-" + index);
                state.foundation.stacks[index].suggestion = true;
            }
        });
        state.tableau.stacks.forEach((_stack, index) => {
            if (
                state.settings.showSuggestions &&
                state.hand.isHoldingCard() &&
                state.tableau.wouldAccept(index, state.hand) &&
                state.hand.source !== "tableau-" + index &&
                (!onlyUseful ||
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
                        )))
            ) {
                accepted.push("tableau-" + index);
                state.tableau.stacks[index].suggestion = true;
            }
        });

        return accepted;
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
        state.suggestions.suggestions = [];
        state.suggestions.hasSuggestion = false;

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

        if (state.settings.showSuggestions) {
            const uncoverOptions = this.getUncoverOptions(state);

            if (!uncoverOptions.length) {
                const acceptedPutdown = this.getPutdownSuggestions(state);

                if (!acceptedPutdown.length && !state.hand.isHoldingCard()) {
                    let foundAny = false;
                    const wasteState = Facade.copy(state);
                    this.waste._dispatchPickup(wasteState.waste.getTop(), null, wasteState);
                    if (wasteState.game.modified) {
                        const wasteSuggestions = this.getPutdownSuggestions(wasteState, true);
                        if (state.settings.showSuggestions && wasteSuggestions.length) {
                            state.waste.suggestion = true;
                            foundAny = true;
                        }
                    }

                    state.tableau.stacks.forEach((tableau, index) => {
                        state.tableau.getStack(index).stack.forEach((card, cardIndex) => {
                            if (!card.isHidden) {
                                console.debug("pickingf iup to tewst");
                                const tableauState = Facade.copy(state);
                                this.tableau._dispatchPickup(card, null, tableauState, index);
                                if (tableauState.game.modified) {
                                    const tableauSuggestions = this.getPutdownSuggestions(tableauState, true);
                                    if (state.settings.showSuggestions && tableauSuggestions.length) {
                                        state.tableau.stacks[index].stack[cardIndex].suggestion = true;
                                        foundAny = true;
                                    }
                                }
                            }
                        });
                    });

                    if (!foundAny) {
                        state.stock.suggestion = true;
                    }
                }
            }
        }
    };
}
