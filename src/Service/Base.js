import Actions from "./Actions";

export default class Base {
    constructor(stateholder) {
        this.stateHolder = stateholder;
        this.actions = new Actions(stateholder);
        this.hand = () => stateholder.state.hand;
        this.state = () => stateholder.state;
    }
}