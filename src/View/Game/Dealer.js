import GlobalContext from "../Context";
import React from "react";

const Dealer = () => {
    const { state, replaceContext } = React.useContext(GlobalContext);
    const timeouts = [];

    //@todo implement launch setting UI for quick dealing
    if (state.settings.launchSettings.quickDeal) {
        if (state && state.dealer && !state.dealer.isDealt) {
            replaceContext(state.dealer.dealAll(state));
        }
    } else {
        const deal = (dealt) => {
            timeouts.push(
                setTimeout(() => {
                    if (state && state.dealer && !state.dealer.isDealt) {
                        replaceContext(state.dealer.dealOne(dealt, deal));
                    }
                }, 35)
            );
        };

        React.useEffect(() => {
            deal(state.dealer.dealt);
            return () =>
                timeouts.forEach((timeout) => {
                    clearTimeout(timeout);
                });
        }, []);
        React.useEffect(() => {
            
        }, [state.dealer.isDealt]);
    }
    return null;
};
export default Dealer;
