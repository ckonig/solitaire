import { ToastContentProps, ToastOptions, toast } from "react-toastify";

import { AppliedRating } from "../../Model/Game/Rating";
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

    return (
        <>
            <Evaluator token={state.token} />
            <RatingNotifier />
            <AutoSolve canAutosolve={state.canAutoSolve()} />
        </>
    );
};

const AutoSolve = (props: { canAutosolve: boolean }) => {
    const [solving, setSolving] = React.useState(false);
    React.useEffect(() => {
        if (props.canAutosolve) {
            setSolving(true);
        }
    }, [props.canAutosolve]);
    return !solving ? null : <Solver />;
};

//@todo auto-uncover as feature, in which case action is not undoable
//@todo when auto-solving until the end, disable all visible hints!
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

const useEvaluation: (mode: string, token: number) => [number, () => void] = (mode, token) => {
    const { state } = React.useContext(GlobalContext);
    if (!state) return [0, () => {}];
    const [falseResults, setFalseResults] = React.useState<number>(0);
    const reset = () => setFalseResults(0);
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
    }, [token]);
    return [falseResults, reset];
};

const Evaluator = (props: { token: number }) => {
    const { state } = React.useContext(GlobalContext);
    if (!state) return null;
    const [full, resetFull] = useEvaluation(SuggestionModes.FULL, props.token);
    const [regular, resetRegular] = useEvaluation(SuggestionModes.REGULAR, props.token);
    const [noRegularSince, setNoRegularSince] = React.useState<number>(0);
    const [noFullSince, setNoFullSince] = React.useState<number>(0);
    React.useEffect(() => {
        if (!state.hand.currentCard()) {
            console.log(full, regular);

            if (full > 0 && regular > 0) {
                if (noFullSince >= 0) {
                    //@todo we need full blown menu here, not just a toast.
                    toast.error(
                        (props: ToastContentProps) => (
                            <div>
                                <div>😢 looks like the game is over</div>
                                <div></div>
                                <div>
                                    <button
                                        onClick={() => {
                                            setNoFullSince(-3);
                                            props.closeToast && props.closeToast();
                                        }}
                                    >
                                        Keep trying
                                    </button>
                                    <button onClick={() => alert("@todo")}>Restart</button>
                                    <button onClick={() => alert("@todo")}>Give up</button>
                                </div>
                            </div>
                        ),
                        { autoClose: false, closeButton: false }
                    );
                }
                setNoFullSince(noFullSince + 1);
                resetFull();
            } else if (regular > 0 && full == 0) {
                if (state.settings.suggestionMode.key !== SuggestionModes.FULL && noRegularSince >= 0) {
                    // toast.warn((props: ToastContentProps) => (
                    //     <div>
                    //         <div>😢 looks like youre stuck here. Have you tried enabling full suggestions?</div>
                    //         <div></div>
                    //         <div>
                    //             <button>Enable</button>
                    //             <button
                    //                 onClick={() => {
                    //                     setNoRegularSince(-2);
                    //                     props.closeToast && props.closeToast();
                    //                 }}
                    //             >
                    //                 Maybe Later
                    //             </button>
                    //             <button>Dont ask again</button>
                    //         </div>
                    //     </div>
                    // ));
                }
                resetRegular();

                setNoRegularSince(noRegularSince + 1);
            }
        }
    }, [full, regular, state.hand.currentCard()]);
    return null;
};
const RatingToast = (props: { rating: AppliedRating }) => {
    return (
        <div>
            <div>Rating</div>
            <div>{props.rating.text}</div>
        </div>
    );
};
const RatingToastProps: ToastOptions = { autoClose: 2000, hideProgressBar: true, position: "bottom-center" };
const RatingNotifier = () => {
    const { state, updateContext } = React.useContext(GlobalContext);
    React.useEffect(() => {
        if (state?.game.rating && state?.game.rating.hasNotifications()) {
            const notification = state?.game.rating.getNextNotification();
            if (notification) {
                const setNotified = () => {
                    updateContext((ctx) => {
                        ctx.game.rating.setNotified(notification.id);
                    });
                };

                if (notification.points > 0) {
                    toast.success(<RatingToast rating={notification} />, RatingToastProps);
                    setNotified();
                } else {
                    toast.warn(<RatingToast rating={notification} />, RatingToastProps);
                    setNotified();
                }
            }
        }
    }, [state?.token]);
    return null;
};

export default Judge;
