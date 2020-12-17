export default class Dealer {
    constructor() {
        this.dealt = 0;
        this.dealingAt = 0;
        this.isDealt = false;
    }

    dealOne = (dealt, callback) => (state) => {
        if (dealt != state.dealer.dealt) {
            return null;
        }

        state.dealer.deal(state.stock, state.tableau);
        if (state.dealer.isDealt) {
            state.game.started = Date.now();
        }

        if (state.dealer.isDealt) {
            state.suggest();
        } else {
            callback(state.dealer.dealt);
        }

        return state;
    };

    dealAll = () => (state) => {
        if (this.dealt != state.dealer.dealt) {
            return null;
        }
        while (!state.dealer.isDealt) {
            state.dealer.deal(state.stock, state.tableau);
        }
        state.game.started = Date.now();
        state.suggest();
        return state;
    };

    deal = (stock, tableau) => {
        for (let i = this.dealingAt; i < tableau.stacks.length; i++) {
            const stack = tableau.stacks[i].stack;
            if (stack.length <= tableau.stacks.length - i - 1) {
                const newCard = stock.stack.pop();
                newCard.source = "tableau-" + i;
                if (stack.length == tableau.stacks.length - 1 - i) {
                    newCard.isHidden = false;
                }
                stack.push(newCard);
                this.dealt++;
                this.dealingAt++;
                if (this.dealingAt == tableau.stacks.length) {
                    this.dealingAt = 0;
                }
                this.isDealt = false;
                return;
            } else {
                const isFirst = this.dealingAt == 0;
                this.dealingAt = 0;
                this.isDealt = isFirst;
                return;
            }
        }

        this.isDealt = true;
    };
}
