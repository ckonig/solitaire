import BaseInteraction from "./Base";

export default class Foundation extends BaseInteraction {
    click = (index) => {
        if (this.hand().isHoldingCard()) {
            this.engine.foundation.tryPutDown(index);
        } else {
            this.engine.foundation.pickup(index);
        }
    }
}