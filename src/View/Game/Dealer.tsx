import GameContext from "./GameContext";
import React from "react";
import useGlobalContext from "../GlobalContext";

const Dealer = () => {
    const { state, replaceContext } = useGlobalContext();
    const { gameState, start } = React.useContext(GameContext);
    const timeouts: any[] = [];
    React.useEffect(() => {
        if (!gameState.started) {
            if (state.settings.launchSettings.quickDeal) {
                if (state && state.dealer && !state.dealer.isDealt) {
                    start();
                    replaceContext(state.dealer.dealAll());
                }
            } else {
                const deal = (dealt: number) => {
                    timeouts.push(
                        setTimeout(() => {
                            if (state && state.dealer && !state.dealer.isDealt) {
                                replaceContext(state.dealer.dealOne(dealt, deal));
                            } else {
                                start();
                            }
                        }, 35)
                    );
                };

                deal(state.dealer.dealt);
                return () =>
                    timeouts.forEach((timeout) => {
                        clearTimeout(timeout);
                    });
            }
        }
    }, []);
    return null;
};
export default Dealer;
