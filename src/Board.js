import React, { Component } from 'react';
import BoardStack from './BoardStack';
import { MyContext } from './MyContext';
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
class Board extends Component {
    constructor(props) {
        super(props);
        var pointer = 0;
        var oldpointer = pointer; pointer += getRndInteger(4, 7);;
        var stacks = [[], [], [], [], [], [], []];
        stacks[6] = props.deck.slice(oldpointer, pointer);
        oldpointer = pointer; pointer += getRndInteger(4, 7);
        stacks[5] = props.deck.slice(oldpointer, pointer);
        oldpointer = pointer; pointer += getRndInteger(4, 7);
        stacks[4] = props.deck.slice(oldpointer, pointer);
        oldpointer = pointer; pointer += getRndInteger(4, 7);
        stacks[3] = props.deck.slice(oldpointer, pointer);
        oldpointer = pointer; pointer += getRndInteger(4, 7);
        stacks[2] = props.deck.slice(oldpointer, pointer);
        oldpointer = pointer; pointer += getRndInteger(4, 7);
        stacks[1] = props.deck.slice(oldpointer, pointer);
        oldpointer = pointer; pointer += getRndInteger(4, 7);
        stacks[0] = props.deck.slice(oldpointer, props.deck.length-1);
        this.state = {
            stacks,
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
                return value.face !== card.props.face || value.type.icon !== card.props.type.icon;
            });
            return { ...state, cards };
        });
        this.props.unselectCard();
    }

    render() {
        return (
            <MyContext.Consumer>
                {ctx => <div>
                    <table><tbody><tr>
                        {this.state.stacks.map((stack, index) => (
                            <td>
                                <BoardStack
                                    stack={stack}
                                    currentCard={ctx.currentCard}
                                    unselectCard={this.props.unselectCard}
                                    onStackClick={(props) => this.props.handler(props)}
                                     /></td>))
                        }
                    </tr></tbody></table>

                </div>
                }
            </MyContext.Consumer>
        );
    }
}

export default Board;