import React, { Component } from 'react';
import BoardStack from './BoardStack';
import { MyContext } from './MyContext';
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
class Board extends Component {
    constructor(props) {
        super(props);
        for(var i = 0; i < props.deck.length; i++) {
            props.deck[i].hidden = true;
        }
        var pointer = 0;
        var oldpointer = pointer; pointer += getRndInteger(4, 7);
        var stacks = [[], [], [], [], [], [], []];
        stacks[6] = props.deck.slice(oldpointer, pointer);
        stacks[6][stacks[6].length-1].hidden=false;
        oldpointer = pointer; pointer += getRndInteger(4, 7);
        stacks[5] = props.deck.slice(oldpointer, pointer);
        stacks[5][stacks[5].length-1].hidden=false;
        oldpointer = pointer; pointer += getRndInteger(4, 7);
        stacks[4] = props.deck.slice(oldpointer, pointer);
        stacks[4][stacks[4].length-1].hidden=false;
        oldpointer = pointer; pointer += getRndInteger(4, 7);
        stacks[3] = props.deck.slice(oldpointer, pointer);
        stacks[3][stacks[3].length-1].hidden=false;
        oldpointer = pointer; pointer += getRndInteger(4, 7);
        stacks[2] = props.deck.slice(oldpointer, pointer);
        stacks[2][stacks[2].length-1].hidden=false;
        oldpointer = pointer; pointer += getRndInteger(4, 7);
        stacks[1] = props.deck.slice(oldpointer, pointer);
        stacks[1][stacks[1].length-1].hidden=false;
        oldpointer = pointer; pointer += getRndInteger(4, 7);
        stacks[0] = props.deck.slice(oldpointer, props.deck.length-1);
        stacks[0][stacks[0].length-1].hidden=false;
        this.state = {
            stacks,
            cards: props.deck
        };
    }

    disown = (card) => {
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