import Hand from "./Hand";
import HandHoldingStack from "./HandHoldingStack";
import Settings from "./Settings";

export default class MultiStack<T extends HandHoldingStack> {
    stacks: T[];
    settings: Settings;
    hand: Hand;
    constructor(settings: Settings, hand: Hand, stacks: T[]) {
        this.stacks = stacks;
        this.settings = settings;
        this.hand = hand;
    }
}
