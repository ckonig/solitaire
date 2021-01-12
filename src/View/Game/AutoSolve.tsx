//- auto-resolver
//  - check if the board can auto-resolve and offer to complete automatically
//  - auto-complete becomes button in header and option in menu

import GlobalContext from "../Context";
import Model from "../../Model/Model";
import React from "react";
import SuggestionModes from "../../Model/Game/Settings/SuggestionModes";

const AutoSolve = (props: { canAutosolve: boolean }) => {
    const [solving, setSolving] = React.useState(false);
    const { state, updateGameContext } = React.useContext(GlobalContext);
    if (!state) return null;
    React.useEffect(() => {
        if (props.canAutosolve) {
            updateGameContext((ctx) => (ctx.settings.suggestionMode = SuggestionModes.get(SuggestionModes.NONE)));
            setSolving(true);
        }
    }, [props.canAutosolve]);
    const canSolve = solving && state?.settings.suggestionMode.key == SuggestionModes.NONE;
    return !canSolve ? null : <Solver />;
};

export default AutoSolve;

//@todo auto-uncover as feature, in which case action is not undoable
//@todo also start general confetti firework elements when autosolving

const Solver = () => {
    const { state, updateGameContext } = React.useContext(GlobalContext);
    if (!state) return null;
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            const copy = Model.copy(state).withHandlers();
            if (copy.hand.currentCard()) {
                copy.settings.suggestionMode = SuggestionModes.get(SuggestionModes.SCORED);
                copy.suggestor.evaluateOptions(copy);
                if (copy._hasSuggestion(copy.foundation)) {
                    const suggestedFoundations = copy.foundation.stacks.filter((s) => copy._hasSuggestion(s));
                    if (suggestedFoundations.length) {
                        const suggestedFoundation = suggestedFoundations[0];
                        updateGameContext(suggestedFoundation.clickEmpty({ isKeyboard: false }));
                    }
                }
            } else {
                copy.settings.suggestionMode = SuggestionModes.get(SuggestionModes.SCORED);
                copy.suggestor.evaluateOptions(copy);
                if (copy._hasSuggestion(copy.tableau)) {
                    const suggestedTableaus = copy.tableau.stacks.filter((s) => copy._hasSuggestion(s));
                    if (suggestedTableaus.length) {
                        const suggestedTableau = suggestedTableaus[0];
                        const suggestedCards = suggestedTableau.stack.filter((c) => c.suggestion);
                        if (suggestedCards.length) {
                            const suggestedCard = suggestedCards[0];
                            updateGameContext(suggestedCard.onClick({ isKeyboard: false }));
                        }
                    }
                }
            }
        }, 150);

        return () => clearTimeout(timeout);
    });
    return null;
};
