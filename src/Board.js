import React, { Component } from 'react';
import Card from './Card';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stacks: [[], [], [], [], [], []],
        };
    }

    disown = (card) => {
        console.log('disowning card', card);
        this.props.removeCard(card);
    }

    render() {
        return (
            <div>
                {this.props.cards.map(card => (
                    <Card
                        key={card.key}
                        type={card.type}
                        face={card.face}
                        owner={this}
                        isSelected={this.props.currentCard != null && this.props.currentCard.key == card.key}
                        clickCard={(props) => this.props.handler(props)} />
                ))}
            </div>
        );
    }
}

export default Board;