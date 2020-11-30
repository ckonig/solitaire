export default class Base {
    constructor(stateholder) {
        this.stateHolder = stateholder;
        this.hand = () => stateholder.state.hand;
        this.state = () => stateholder.state;
    }
}