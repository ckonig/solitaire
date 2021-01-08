import GlobalContext from "../Context";
import React from "react";

const Dealer: () => any = () => {
    const { state, replaceContext } = React.useContext(GlobalContext);
    if (!state) return null;
    const timeouts: any[] = [];

    if (state.settings.launchSettings.quickDeal) {
        if (state && state.dealer && !state.dealer.isDealt) {
            replaceContext(state.dealer.dealAll());
        }
    } else {
        const deal = (dealt: number) => {
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
        React.useEffect(() => {}, [state.dealer.isDealt]);
    }
    return null;
};
export default Dealer;
