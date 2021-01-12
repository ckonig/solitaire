import GameContext from "./GameContext";
import React from "react";
import useGlobalContext from "../GlobalContext";

const Dealer = () => {
    const { state, replaceContext } = useGlobalContext();
    const { gameState, start } = React.useContext(GameContext);
    React.useEffect(() => {
        if (!gameState.started) {
            const timeouts: any[] = [];
            if (state.settings.launchSettings.quickDeal) {
                if (!state.dealer.isDealt) {
                    start();
                    replaceContext(state.dealer.dealAll());
                }
            } else {
                const deal = (dealt: number) =>
                    timeouts.push(
                        setTimeout(() => {
                            if (!state.dealer.isDealt) {
                                replaceContext(state.dealer.dealOne(dealt, deal));
                            } else {
                                start();
                            }
                        }, 35)
                    );

                deal(state.dealer.dealt);
                return () => timeouts.forEach((timeout) => clearTimeout(timeout));
            }
        }
    }, []);
    return null;
};
export default Dealer;
