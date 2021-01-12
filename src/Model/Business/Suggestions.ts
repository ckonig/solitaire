import Model from "../Model";
import SuggestionModes from "../Game/Settings/SuggestionModes";
import Tableau from "./Tableau";
import Waste from "./Waste";

export default class Suggestions {
    tableau: Tableau;
    waste: Waste;

    constructor() {
        this.tableau = new Tableau();
        this.waste = new Waste();
    }

    evaluateOptions = (state: Model) => {
        this.disableAllSuggestions(state);
        if (
            state.settings.suggestionMode.key !== SuggestionModes.NONE &&
            !this.getUncoverOptions(state) &&
            !this.getPutdownSuggestions(state) &&
            !state.hand.isHoldingCard() &&
            (!this.getPickupOptions(state) || state.settings.suggestionMode.key == SuggestionModes.FULL) &&
            (state.stock.getTop() || state.stock.canRecycle()) &&
            state.settings.suggestionMode.key !== SuggestionModes.SCORED
        ) {
            state.stock.suggestion = true;
        }
    };

    getPutdownSuggestions = (state: Model, onlyUseful?: boolean) => {
        if (!state.hand.isHoldingCard() || state.settings.suggestionMode.key == SuggestionModes.NONE) {
            return 0;
        }

        const accepted = [];
        if (state.waste.wouldAcceptHand()) {
            if (state.settings.suggestionMode.key === SuggestionModes.FULL || !state.hand.isFromWaste()) {
                const move = { target: "waste", source: state.hand.source };
                if (state.settings.suggestionMode.key !== SuggestionModes.SCORED || state.game.rating.rateMove(move, null) > 0) {
                    accepted.push(move);
                    state.waste.suggestion = true;
                }
            }
        }

        state.foundation.stacks.forEach((stack, index) => {
            if (state.foundation.wouldAcceptHand(index)) {
                if (state.settings.suggestionMode.key === SuggestionModes.FULL || !state.hand.isFromFoundation(index)) {
                    const move = { target: stack.source, source: state.hand.source };
                    if (state.settings.suggestionMode.key !== SuggestionModes.SCORED || state.game.rating.rateMove(move, null) > 0) {
                        accepted.push(move);
                        stack.suggestion = true;
                    }
                }
            }
        });

        state.tableau.stacks.forEach((stack, index) => {
            if (state.tableau.wouldAcceptHand(index)) {
                if (state.settings.suggestionMode.key === SuggestionModes.FULL || !state.hand.isFromTableau(index)) {
                    const isMoveOfKingBetweenEmptySlots =
                        state.hand.isHoldingKing() &&
                        stack.stack.length == 0 &&
                        state.hand.isFromAnyTableau() &&
                        state.tableau.stacks[state.hand.getTableauIndex()].stack.length == 0;

                    const isMoveBetweenSimilarParentCards =
                        stack.stack.length > 0 &&
                        state.hand.isFromAnyTableau() &&
                        state.tableau.stacks[state.hand.getTableauIndex()].stack.length > 0 &&
                        stack.stack[stack.stack.length - 1].face ==
                            state.tableau.stacks[state.hand.getTableauIndex()].stack[
                                state.tableau.stacks[state.hand.getTableauIndex()].stack.length - 1
                            ].face &&
                        !state.tableau.getTop(state.hand.getTableauIndex()).isHidden;

                    const isNotLoop = !isMoveOfKingBetweenEmptySlots && !isMoveBetweenSimilarParentCards;

                    if (!onlyUseful || state.settings.suggestionMode.key === SuggestionModes.FULL || isNotLoop) {
                        const move = { target: stack.source, source: state.hand.source };
                        if (state.settings.suggestionMode.key !== SuggestionModes.SCORED || state.game.rating.rateMove(move, null) > 0) {
                            accepted.push(move);
                            stack.suggestion = true;
                        }
                    }
                }
            }
        });

        return accepted.length;
    };

    getPickupOptions = (state: Model) => {
        let foundAny = false;
        const wasteState = Model.copy(state);
        this.waste.dispatchPickup(wasteState.waste.getTop(), null, wasteState);
        if (wasteState.game.timemachine.modified) {
            if (this.getPutdownSuggestions(wasteState, true) > (state.settings.suggestionMode.key == SuggestionModes.FULL ? 1 : 0)) {
                state.waste.suggestion = true;
                foundAny = true;
            }
        }

        state.tableau.stacks.forEach((tableau, index) =>
            tableau.stack
                .map((card, cardIndex) => ({ cardIndex, card }))
                .filter(({ card }) => !card.isHidden)
                .forEach(({ card, cardIndex }) => {
                    const tableauState = Model.copy(state);
                    this.tableau.dispatchPickup(card, null, tableauState, index);
                    if (tableauState.game.timemachine.modified) {
                        if (
                            this.getPutdownSuggestions(tableauState, true) >
                            (state.settings.suggestionMode.key == SuggestionModes.FULL ? 1 : 0)
                        ) {
                            tableau.stack[cardIndex].suggestion = true;
                            foundAny = true;
                        }
                    }
                })
        );
        return foundAny;
    };

    getUncoverOptions = (state: Model) => {
        if (!state.hand.isHoldingCard()) {
            const filtered = state.tableau.stacks
                .map((_stack, index) => index)
                .filter((index) => state.tableau.getTop(index) && state.tableau.getTop(index).isHidden);
            filtered.forEach((index) => {
                state.tableau.getTop(index).suggestion = true;
            });
            return filtered.length;
        }

        return 0;
    };

    disableAllSuggestions = (state: Model) => {
        const disableSuggestion = (obj: any) => {
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
