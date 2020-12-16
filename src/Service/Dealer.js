import Suggestions from "./Suggestions";

export default class Dealer {
    constructor(gamestate, state) {
        this.gamestate = gamestate;
        this.state = state;
        this.suggestor = new Suggestions();
    }

    deal = (dealt) => {
        //@todo based on settings, deal all-in-one or with delays
        this.dealWithTimeouts(dealt);
    };

    dealWithTimeouts = (dealt) => {
        //@todo move timeout to react component, gracefully handle unmount 
        setTimeout(() => {
            if (this.state && this.state.stock && !this.state.stock.isDealt) {
                this.gamestate.setState((state) => {
                    if (dealt != state.stock.dealt) {
                        return null;
                    }

                    state.stock.deal(state.tableau);
                    if (state.stock.isDealt) {
                        state.game.started = Date.now();
                    }

                    if (state.stock.isDealt) {
                        this.suggestor.evaluateOptions(state);
                    } else {
                        this.deal(state.stock.dealt);
                    }

                    return state;
                });
            }
        }, 25);
    };
}
