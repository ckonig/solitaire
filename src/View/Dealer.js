import React from "react";

const Dealer = (props) => {
    const timeouts = [];
    //@todo implement launch setting UI for quick dealing
    if (props.state.settings.launchSettings.quickDeal) {
        if (props.state && props.state.stock && !props.state.stock.isDealt) {
            props.stateholder.setState((state) => {
                if (props.state.stock.dealt != state.stock.dealt) {
                    return null;
                }
                while (!state.stock.isDealt) {
                    state.stock.deal(state.tableau);
                }
                state.game.started = Date.now();
                state.evaluateOptions(state);
                return state;
            });
        }
    } else {
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
                                props.suggestor.evaluateOptions(state);
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
    }
    return null;
};
export default Dealer;
