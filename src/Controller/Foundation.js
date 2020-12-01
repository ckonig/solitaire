import BaseInteraction from "./Base";

export default class Foundation extends BaseInteraction {
    click = (index) => {
        if (this.hand().isHoldingCard()) {
            this.service.foundation.tryPutDown(index);
        } else {
            this.service.foundation.pickup(index);
        }
    }
}