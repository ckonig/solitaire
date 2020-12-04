import Card from "./Card";
import React from "react";
import TouchAwareComponent from "./TouchAwareComponent";

export default class TouchHand extends TouchAwareComponent {
    render() {
        if (!this.isTouch || !this.props.hand || this.props.parent !== this.props.hand.source) {
            return null;
        }
        return (
            <div>
                {this.props.hand &&
                    this.props.hand.stack &&
                    this.props.hand.stack.map((card, index) => (
                        <Card
                            model={card}
                            key={index}
                            offsetTop={this.props.offset + index * 20}
                            zIndex={1000 + index * 20}
                            isSelected={true}
                            onClick={(c) => this.props.onClick(c)}
                        />
                    ))}
            </div>
        );
    }
}
