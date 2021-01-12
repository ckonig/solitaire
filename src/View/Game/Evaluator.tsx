import { ToastContentProps, toast } from "react-toastify";

import GlobalContext from "../Context";
import Model from "../../Model/Model";
import React from "react";
import SuggestionModes from "../../Model/Game/Settings/SuggestionModes";

const useEvaluation: (mode: string, token: number) => [number, () => void] = (mode, token) => {
    const { state } = React.useContext(GlobalContext);
    if (!state)
        return [
            0,
            () => {
                throw "no state";
            },
        ];
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

export default Evaluator;
