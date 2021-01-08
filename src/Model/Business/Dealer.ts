import Model from "../Model";
import Stock from "../Game/Stock";
import Tableau from "../Game/Tableau";

export default class Dealer {
    dealt: number;
    dealingAt: number;
    isDealt: boolean;

    constructor() {
        this.dealt = 0;
        this.dealingAt = 0;
        this.isDealt = false;
    }

    dealOne = (dealt: number, callback: any) => (state: Model) => {
        if (dealt != state.dealer.dealt) {
            return null;
        }

        state.dealer.deal(state.stock, state.tableau);
        if (state.dealer.isDealt) {
            state.game.started = Date.now();
        }

        if (!state.dealer.isDealt) {
            callback(state.dealer.dealt);
        }

        return state;
    };

    dealAll = () => (state: Model) => {
        if (this.dealt != state.dealer.dealt) {
            return null;
        }
        while (!state.dealer.isDealt) {
            state.dealer.deal(state.stock, state.tableau);
        }
        state.game.started = Date.now();
        return state;
    };

    deal = (stock: Stock, tableau: Tableau) => {
        for (let i = this.dealingAt; i < tableau.stacks.length; i++) {
            const stack = tableau.stacks[i].stack;
            if (stack.length <= tableau.stacks.length - i - 1) {
                const newCard = stock.popOne();
                if (newCard) {
                    newCard.source = tableau.stacks[i].source;
                    if (stack.length == tableau.stacks.length - 1 - i) {
                        newCard.isHidden = false;
                    }
                    tableau.deal(newCard, i);
                    this.dealt++;
                    this.dealingAt++;
                    if (this.dealingAt == tableau.stacks.length) {
                        this.dealingAt = 0;
                    }
                    this.isDealt = false;
                }
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
