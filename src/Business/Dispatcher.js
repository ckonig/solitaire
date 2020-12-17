export default class Dispatcher {
    constructor(clickHandler, updateGameContext) {
        this.clickHandler = clickHandler;
        this.updateGameContext = updateGameContext;
    }

    getHandler = (hand) => {
        if (hand && hand.isHoldingCard()) {
            return this.dispatchPutDown;
        } else {
            return this.dispatchPickup;
        }
    };

    dispatchPutDown = (card, position, index) => {
        this.updateGameContext((state) => {
            if (state.hand.isHoldingCard()) {
                this.clickHandler.dispatchPutDown(card, position, state, index);
            }
        });
    };

    dispatchPickup = (card, position, index) => {
        this.updateGameContext((state) => {
            if (!state.hand.isHoldingCard()) {
                this.clickHandler.dispatchPickup(card, position, state, index);
            }
        });
    };
}
