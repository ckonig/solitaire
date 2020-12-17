import GlobalContext from "./Context";
import React from "react";

const Dealer = () => {
    const { state, replaceContext } = React.useContext(GlobalContext);
    const timeouts = [];
    //@todo implement launch setting UI for quick dealing
    if (state.settings.launchSettings.quickDeal) {
        if (state && state.stock && !state.stock.isDealt) {
            replaceContext((state) => {
                if (state.stock.dealt != state.stock.dealt) {
                    return null;
                }
                while (!state.stock.isDealt) {
                    state.stock.deal(state.tableau);
                }
                state.game.started = Date.now();
                state.suggest();
                return state;
            });
        }
    } else {
        const deal = (dealt) => {
            //@todo based on settings, deal all-in-one or with delays
            timeouts.push(
                setTimeout(() => {
                    if (state && state.stock && !state.stock.isDealt) {
                        replaceContext((state) => {
                            if (dealt != state.stock.dealt) {
                                return null;
                            }

                            state.stock.deal(state.tableau);
                            if (state.stock.isDealt) {
                                state.game.started = Date.now();
                            }

                            if (state.stock.isDealt) {
                                state.suggest();
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
            deal(state.stock.dealt);
            return () => timeouts.forEach((timeout) => clearTimeout(timeout));
        }, []);
    }
    return null;
};
export default Dealer;
