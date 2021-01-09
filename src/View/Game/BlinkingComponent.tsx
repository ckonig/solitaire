import { Component } from "react";
import GlobalContext from "../Context";
import { IStack } from "../../Model/Game/IStack";
import Model from "../../Model/Model";

export type _selector = (model: Model) => IStack;
export default class BlinkingComponent<T> extends Component<T> {
    timeout: any;
    selector: _selector;
    constructor(props: T, selector: _selector) {
        super(props);
        this.timeout = null;
        this.selector = selector;
    }

    static contextType = GlobalContext;

    componentDidUpdate() {
        if (this.selector(this.context.state).blinkFor) {
            this.timeout = setTimeout(
                () =>
                    this.context.updateGameContext((state: Model) => {
                        this.selector(state).unblink(state);
                    }),
                200
            );
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
}
