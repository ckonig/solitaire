import React, { Component } from 'react';
import Card from './Card';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stacks: [[], [], [], [], [], []],
            cards: props.deck
        };
    }

    disown = (card) => {
        console.log('disowning card', card);
        this.removeFromBoard(card);
    }

    removeFromBoard = (card) => {
        this.setState((state, props) => {
            var cards = state.cards.filter((value, index, arr) => {
                if (value.face !== card.props.face || value.type.icon !== card.props.type.icon) {
                    return true;
                }

                return false;
            });
            return { ...state, cards };
        });
        this.props.unselectCard();
    }

    render() {
        return (
            <div>
                {this.state.cards.map(card => (
                    <Card
                        key={card.key}
                        type={card.type}
                        face={card.face}
                        owner={this}
                        isSelected={this.props.currentCard != null && this.props.currentCard.props.face == card.face && this.props.currentCard.props.type.icon == card.type.icon}
                        clickCard={(props) => this.props.handler(props)} />
                ))}
            </div>
        );
    }
}

export default Board;