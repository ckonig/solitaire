import BaseInteraction from "./Base";

export default class Foundation extends BaseInteraction {
    click = (index) => {
        if (this.hand().isHoldingCard()) {
            this.engine.foundation._tryPutOntoStack(index);
        } else {
            this.engine.foundation._tryPickup(index);
        }
    }
}