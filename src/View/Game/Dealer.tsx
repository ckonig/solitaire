import React from "react";
import useGameContext from "./GameContext";
import useGlobalContext from "../GlobalContext";

const Dealer = () => {
    const { state, replaceContext } = useGlobalContext();
    const { gameState, start } = useGameContext();
    React.useEffect(() => {
        if (!gameState.started) {
            const timeouts: NodeJS.Timeout[] = [];
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
        //@todo how to one-time hook in valid way?
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return null;
};
export default Dealer;
