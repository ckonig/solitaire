import AutoSolve from "./AutoSolve";
import Evaluator from "./Evaluator";
import GlobalContext from "../Context";
import React from "react";

const Judge = () => {
    //- one checks a context from outside for final status
    //  - check if other player won
    //  - check if other player gave up
    //- the other analyses the game and reports to context
    //  - check if current player won
    //  - check if there are no more valid options and offer to give up

    const { state } = React.useContext(GlobalContext);
    if (!state) return null;

    return (
        <>
            <Evaluator token={state.token} />
            <AutoSolve canAutosolve={state.canAutoSolve()} />
        </>
    );
};

export default Judge;
