import Card from "./Card";
import { Component } from "react";
import React from "react";

export default class TouchHand extends Component {
    render() {
        if (!this.props.hand || this.props.parent !== this.props.hand.source) {
            return null;
        }
        return [
            this.props.hand &&
                this.props.hand.stack &&
                this.props.hand.stack.map((card, index) => (
                    <Card
                        model={card}
                        key={index}
                        shadowOffsetX={this.props.shadowOffsetX}
                        shadowOffsetY={this.props.shadowOffsetY}
                        offsetTop={this.props.offsetTop + index * 24}
                        zIndex={1000 + index * 20}
                        isSelected={true}
                        onClick={(c) => this.props.onClick(c)}
                    />
                )),
        ];
    }
}
