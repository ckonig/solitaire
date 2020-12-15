import Model from "../Model/Facade";

export default class Dealer {
    constructor(gamestate, state, suggestor) {
        this.gamestate = gamestate;
        this.state = state;
        this.suggestor = suggestor;
    }

    deal = (dealt) => {
        setTimeout(() => {
            if (this.state && this.state.deck && !this.state.deck.isDealt) {
                this.gamestate.setState((state) => {
                    if (dealt != state.deck.dealt) {
                        return null;
                    }
                    const model = Model.deal(state);
                    if (model.deck.isDealt) {
                        this.suggestor.evaluateOptions(model);
                    }
                    return model;
                });
            }
        }, 50);
    };
}
