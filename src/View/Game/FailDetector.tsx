import Card from "../../Model/Deck/Card";
import Model from "../../Model/Model";
import PossibleFailScreen from "./PossibleFailScreen";
import React from "react";
import SuggestionModes from "../../Model/Game/Settings/SuggestionModes";
import useGameContext from "./GameContext";
import useGlobalContext from "../GlobalContext";

const FailDetector = () => {
    const { state } = useGlobalContext();
    const { gameState } = useGameContext();

    const [suggestions, setSuggestions] = React.useState<{ any: boolean; stock: boolean; nonStock: boolean }>({
        any: false,
        stock: false,
        nonStock: false,
    });
    React.useEffect(() => {
        if (gameState.started) {
            const copy = Model.copy(state);
            copy.settings.suggestionMode = SuggestionModes.get(SuggestionModes.FULL);
            copy.suggestor.evaluateOptions(copy);
            setSuggestions({
                any: copy.hasSuggestions(),
                stock: copy._hasSuggestion(copy.stock),
                nonStock: copy.hasNonStockSuggestions(),
            });
        }
        //@todo use memo?
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.token]);

    const [stockSuggestionCards, setStockSuggestionCards] = React.useState<Card[]>([]);
    const [isPossibleFail, setPossibleFail] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (!state.hand.currentCard() && gameState.started) {
            //fail detection never ends the game, merely offers to quit or keep trying
            //it also aquaints the user with the possibiltiy of undoing or restarting to be helpful
            if (suggestions.nonStock) {
                setStockSuggestionCards([]);
                setPossibleFail(false);
            } else if (suggestions.stock && !suggestions.nonStock) {
                //@todo CYCLING FAIL DETECTION
                //even with a full suggestion available, the situation may be hopeless
                //that is true if the suggestion concerns the stock
                //to find out if it's really hopeless, we need to track full cycles through the deck
                //if a full cycle through the stack was performed and only stock suggestions came up
                //it's basically a loss, same as above
                //to achieve this we can store all cards that produced stock suggestions in a list
                //as long as stock suggestions come up we add to the list
                //once list has same length as stock + waste + hand(waste) we know it's over
                //once we find a non-stock suggestion we empty out the list
                const top = state.stock.getTop();
                if (top) {
                    setStockSuggestionCards([...stockSuggestionCards, top]);
                }
                if (state.stock.stack.length + state.waste.stack.length <= stockSuggestionCards.length) {
                    setPossibleFail(true);
                }
                //however this whole fancy thing doesn't work if there are useless "full" suggestions.
                //if the user is in full mode, and ignores these, it's a sign it's over
                //if the user is in regular mode or lesser, we could recommend switching to full suggestions
                //but that's not really the job of a faildetector
            } else if (!suggestions.any) {
                //@todo SIMPLE FAIL DETECTION
                //no full suggestions = no moves possible mean fail unless all cards are in foundation
                setPossibleFail(true);
                //@todo implement menu clone that suggests to stop since there is nothing to do anymore
            }
        }
        //@todo anti pattern?
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [suggestions]);

    return isPossibleFail ? <PossibleFailScreen /> : null;
};

export default FailDetector;
