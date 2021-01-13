import Card from "../../Model/Deck/Card";
import Model from "../../Model/Model";
import React from "react";
import SuggestionModes from "../../Model/Game/Settings/SuggestionModes";
import useGlobalContext from "../GlobalContext";

const FailDetector = () => {
    const { state } = useGlobalContext();
    const [suggestions, setSuggestions] = React.useState<boolean>(false);
    const [stockSuggestions, setStockSuggestions] = React.useState<boolean>(false);
    const [nonStockSuggestions, setNonStockSuggestions] = React.useState<boolean>(false);
    React.useEffect(() => {
        const copy = Model.copy(state);
        copy.settings.suggestionMode = SuggestionModes.get(SuggestionModes.FULL);
        copy.suggestor.evaluateOptions(copy);
        setSuggestions(copy.hasSuggestions());
        setStockSuggestions(copy._hasSuggestion(copy.stock));
        setNonStockSuggestions(copy.hasNonStockSuggestions());
    }, [state.token]);

    const [stockSuggestionCards, setStockSuggestionCards] = React.useState<Card[]>([]);

    React.useEffect(() => {
        if (!state.hand.currentCard()) {
            //fail detection never ends the game, merely offers to quit or keep trying
            //it also aquaints the user with the possibiltiy of undoing or restarting to be helpful
            if (nonStockSuggestions) {
                setStockSuggestionCards([]);
            } else if (stockSuggestions && !nonStockSuggestions) {
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
                console.log("only stock suggestions are suspicious, start to track cycle");
                const top = state.stock.getTop();
                if (top) {
                    setStockSuggestionCards([...stockSuggestionCards, top]);
                } 
                if (state.stock.stack.length + state.waste.stack.length <= stockSuggestionCards.length) {
                    console.log('we made a full cycle through the deck and had only stock suggestions, looks like a loss')
                }
                //however this whole fancy thing doesn't work if there are useless "full" suggestions.
                //if the user is in full mode, and ignores these, it's a sign it's over
                //if the user is in regular mode or lesser, we could recommend switching to full suggestions
                //but that's not really the job of a faildetector
            } else if (!suggestions) {
                //@todo SIMPLE FAIL DETECTION
                //no full suggestions = no moves possible mean fail unless all cards are in foundation
                console.log("no suggestions - looks like a loss");
                //@todo implement menu clone that suggests to stop since there is nothing to do anymore
            }
        }
    }, [suggestions, stockSuggestions, nonStockSuggestions, state.token]);
    return null;
};

export default FailDetector;
