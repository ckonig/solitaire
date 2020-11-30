export default class BaseInteraction {
    constructor(stateholder) {
        this.engine = stateholder.engine;
        this.hand = () => stateholder.state.hand;
    }
}