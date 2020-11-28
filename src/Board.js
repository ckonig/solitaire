import React, { Component } from 'react';
import BoardStack from './BoardStack';
import { MyContext } from './MyContext';

class Board extends Component {

    render() {
        return (
            <MyContext.Consumer>
                {ctx => <div>
                    <table><tbody><tr>
                        {this.props.stacks.map((stack, index) => (
                            <td>
                                <BoardStack
                                    stack={stack}
                                    disown={(card) => this.props.disownBoardStack(index, card)}
                                    currentCard={ctx.currentCard}
                                    unselectCard={this.props.unselectCard}
                                    onBoardStackClick={(card) => this.props.onBoardStackClick(card, index)}
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