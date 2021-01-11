import GlobalContext from "../Context";
import Model from "../../Model/Model";
import React from "react";
import SuggestionModes from "../../Model/Game/Settings/SuggestionModes";

const Judge = () => {
    //@todo split in three components
    //- one checks a context from outside for final status
    //  - check if other player won
    //  - check if other player gave up
    //- the other analyses the game and reports to context
    //  - check if current player won
    //  - check if there are no more valid options and offer to give up
    //- auto-resolver
    //  - check if the board can auto-resolve and offer to complete automatically
    //  - auto-complete becomes button in header and option in menu

    const { state } = React.useContext(GlobalContext);
    if (!state) return null;

    return <Evaluator token={state.token} />;
};

const useEvaluation = (mode: string, token: number) => {
    const { state } = React.useContext(GlobalContext);
    if (!state) return 0;
    const [falseResults, setFalseResults] = React.useState<number>(0);
    React.useEffect(() => {
        const copy = Model.copy(state);
        copy.settings.suggestionMode = SuggestionModes.get(mode);
        copy.suggestor.evaluateOptions(copy);
        if (copy.hasSuggestions()) {
            if (falseResults !== 0) {
                setFalseResults(0);
            }
        } else {
            setFalseResults(falseResults + 1);
        }
        console.log("failed to evaluated options x times in mode:", mode, falseResults);
    }, [token]);
    return falseResults;
};

const Evaluator = (props: { token: number }) => {
    const full = useEvaluation(SuggestionModes.FULL, props.token);
    const regular = useEvaluation(SuggestionModes.REGULAR, props.token);
    React.useEffect(() => {
        console.log(full, regular);
        if (full > 0) {
            console.log("looks like the game is over");
        }
        if (regular > full && regular > 15) {
            console.log("looks like youre stuck here");
        }
    }, [full, regular]);
    return null;
};

export default Judge;
