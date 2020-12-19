import Card from "./Card";
import React from "react";

export default class TouchHand extends React.Component {
    //@todo merge with mousehand
    render() {
        if (!this.props.hand || this.props.parent !== this.props.hand.source) {
            return null;
        }
        return [
            this.props.hand &&
                this.props.hand.stack &&
                this.props.hand.stack.map((card, index) => (
                    <Card
                        key={index}
                        model={card}
                        canClick={true}
                        offsetTop={this.props.offsetTop + index * 24}
                        offsetLeft={this.props.offsetLeft}
                        zIndex={1000 + index * 20}
                        isSelected={true}
                        onClick={(c) => this.props.onClick(c)}
                    />
                )),
        ];
    }
}
