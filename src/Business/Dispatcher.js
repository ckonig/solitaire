export default class Dispatcher {
    constructor(clickHandler, gamestate) {
        this.clickHandler = clickHandler;
        this.gamestate = gamestate;
    }

    getHandler = (hand) => {
        if (hand && hand.isHoldingCard()) {
            return this.dispatchPutDown;
        } else {
            return this.dispatchPickup;
        }
    };

    dispatchPutDown = (card, position, index) => {
        this.gamestate._setState((state) => {
            if (state.hand.isHoldingCard()) {
                this.clickHandler.dispatchPutDown(card, position, state, index);
            }
        });
    };

    dispatchPickup = (card, position, index) => {
        this.gamestate._setState((state) => {
            if (!state.hand.isHoldingCard()) {
                this.clickHandler.dispatchPickup(card, position, state, index);
            }
        });
    };
}
