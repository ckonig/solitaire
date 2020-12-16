import React from "react";
import Suggestions from "../Service/Suggestions";

export default class Dealer extends React.Component {
    constructor(props) {
        super(props);
        this.suggestor = new Suggestions();
        this.timeout = null;
    }

    componentDidMount = () => this.deal(this.props.state.stock.dealt);

    componentWillUnmount = () => clearTimeout(this.timeout);

    render = () => null;

    deal = (dealt) => {
        //@todo based on settings, deal all-in-one or with delays
        this.dealWithTimeouts(dealt);
    };

    dealWithTimeouts = (dealt) => {
        this.timeout = setTimeout(() => {
            if (this.props.state && this.props.state.stock && !this.props.state.stock.isDealt) {
                this.props.stateholder.setState((state) => {
                    if (dealt != state.stock.dealt) {
                        return null;
                    }

                    state.stock.deal(state.tableau);
                    if (state.stock.isDealt) {
                        state.game.started = Date.now();
                    }

                    if (state.stock.isDealt) {
                        this.suggestor.evaluateOptions(state);
                    } else {
                        this.deal(state.stock.dealt);
                    }

                    return state;
                });
            }
        }, 25);
    };
}
