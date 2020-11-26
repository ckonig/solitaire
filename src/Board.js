import React, { Component } from 'react';
import Card from './Card';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stacks: [[], [], [], [], [], []],
        };
    }

    render() {
        return (
            <div>
                {this.props.cards.map(card => (
                    <Card
                        key={card.key}
                        type={card.type}
                        face={card.face}
                        isSelected={this.props.currentCard == card}
                        handler={(props) => this.props.handler(props)} />
                ))}
            </div>
        );
    }
}

export default Board;