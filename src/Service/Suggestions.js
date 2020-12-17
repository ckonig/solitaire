import Model from "../Model/Model";
import Tableau from "../Business/Tableau";
import Waste from "../Business/Waste";

export default class Suggestions {
    constructor() {
        this.tableau = new Tableau();
        this.waste = new Waste();
    }

    evaluateOptions = (state) => {
        this.disableAllSuggestions(state);

        if (state.settings.suggestionMode !== "none") {
            const foundUncoverOptions = this.getUncoverOptions(state);

            if (!foundUncoverOptions) {
                const foundAcceptedPutdown = this.getPutdownSuggestions(state);

                if (!foundAcceptedPutdown && !state.hand.isHoldingCard()) {
                    const foundAny = this.getPickupOptions(state);

                    if (!foundAny || state.settings.suggestionMode == "full") {
                        // @todo only highlight if it's not empty or there are recyclings left
                        state.stock.suggestion = true;
                    }
                }
            }
        }
    };

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
        state.foundation.stacks.forEach((stack, index) => {
            if (state.settings.suggestionMode !== "none" && state.hand.isHoldingCard() && state.foundation.wouldAccept(index, state.hand)) {
                if (state.settings.suggestionMode === "full" || state.hand.source !== "foundation-" + index) {
                    const move = { target: "foundation-" + index, source: state.hand.source };
                    if (state.settings.suggestionMode !== "scored" || state.game.rateMove(move) > 0) {
                        accepted.push(move);
                        stack.suggestion = true;
                    }
                }
            }
        });
        state.tableau.stacks.forEach((stack, index) => {
            if (state.settings.suggestionMode != "none" && state.hand.isHoldingCard() && state.tableau.wouldAccept(index, state.hand)) {
                if (state.settings.suggestionMode === "full" || state.hand.source !== "tableau-" + index) {
                    if (
                        !onlyUseful ||
                        state.settings.suggestionMode === "full" ||
                        // filter out moves of King from empty slot to empty slot
                        (!(
                            state.hand.currentCard().face == "K" &&
                            stack.stack.length == 0 &&
                            state.hand.source.substring(0, 8) == "tableau-" &&
                            state.tableau.stacks[state.hand.source.substring(8)].stack.length == 0
                        ) &&
                            // filter out moves between stacks if same (non-hidden) parent card
                            !(
                                stack.stack.length > 0 &&
                                state.hand.source.substring(0, 8) == "tableau-" &&
                                state.tableau.stacks[state.hand.source.substring(8)].stack.length > 0 &&
                                stack.stack[stack.stack.length - 1].face ==
                                    state.tableau.stacks[state.hand.source.substring(8)].stack[
                                        state.tableau.stacks[state.hand.source.substring(8)].stack.length - 1
                                    ].face &&
                                !state.tableau.getTop(state.hand.source.substring(8)).isHidden
                            ))
                    ) {
                        const move = { target: "tableau-" + index, source: state.hand.source };
                        if (state.settings.suggestionMode !== "scored" || state.game.rateMove(move) > 0) {
                            accepted.push(move);
                            stack.suggestion = true;
                        }
                    }
                }
            }
        });

        return accepted.length;
    };

    getPickupOptions = (state) => {
        let foundAny = false;
        const wasteState = Model.copy(state);
        this.waste._dispatchPickup(wasteState.waste.getTop(), null, wasteState);
        if (wasteState.game.modified) {
            const foundWasteSuggestions = this.getPutdownSuggestions(wasteState, true);
            if (foundWasteSuggestions > (state.settings.suggestionMode == "full" ? 1 : 0)) {
                state.waste.suggestion = true;
                foundAny = true;
            }
        }

        state.tableau.stacks.forEach((tableau, index) => {
            tableau.stack.forEach((card, cardIndex) => {
                if (!card.isHidden) {
                    const tableauState = Model.copy(state);
                    this.tableau._dispatchPickup(card, null, tableauState, index);
                    if (tableauState.game.modified) {
                        const foundTableauSuggestions = this.getPutdownSuggestions(tableauState, true);
                        if (foundTableauSuggestions > (state.settings.suggestionMode == "full" ? 1 : 0)) {
                            tableau.stack[cardIndex].suggestion = true;
                            foundAny = true;
                        }
                    }
                }
            });
        });
        return foundAny;
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

        return options.length;
    };

    disableAllSuggestions = (state) => {
        const disableSuggestion = (obj) => {
            obj.suggestion = false;
            obj.stack && obj.stack.forEach(disableSuggestion);
            obj.stacks && obj.stacks.forEach(disableSuggestion);
        };

        disableSuggestion(state.waste);
        disableSuggestion(state.stock);
        disableSuggestion(state.tableau);
        disableSuggestion(state.foundation);
    };
}
