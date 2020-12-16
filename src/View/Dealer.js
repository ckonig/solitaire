import React from "react";
import Suggestions from "../Service/Suggestions";

const Dealer = (props) => {
    const suggestor = new Suggestions();
    const timeouts = [];

    const deal = (dealt) => {
        //@todo based on settings, deal all-in-one or with delays
        timeouts.push(
            setTimeout(() => {
                if (props.state && props.state.stock && !props.state.stock.isDealt) {
                    props.stateholder.setState((state) => {
                        if (dealt != state.stock.dealt) {
                            return null;
                        }

                        state.stock.deal(state.tableau);
                        if (state.stock.isDealt) {
                            state.game.started = Date.now();
                        }

                        if (state.stock.isDealt) {
                            suggestor.evaluateOptions(state);
                        } else {
                            deal(state.stock.dealt);
                        }

                        return state;
                    });
                }
            }, 35)
        );
    };

    React.useEffect(() => {
        deal(props.state.stock.dealt);
        return () => timeouts.forEach((timeout) => clearTimeout(timeout));
    }, []);
    return null;
};
export default Dealer;
