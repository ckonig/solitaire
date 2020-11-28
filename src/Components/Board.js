import React, { Component } from 'react';

import BoardStack from './BoardStack';
import { MyContext } from '../MyContext';

export default function Board(props) {
    return (
        <MyContext.Consumer>
            {ctx => <div>
                <table><tbody><tr>
                    {props.stacks.map((stack, index) => (
                        <td>
                            <BoardStack
                                stackIndex={index}
                                stack={stack.stack}
                                blinkFor={stack.blinkFor}
                                currentCard={ctx.currentCard}
                                onBoardStackClick={(card) => ctx.onBoardStackClick(card, index)}
                            /></td>))
                    }
                </tr></tbody></table>

            </div>
            }
        </MyContext.Consumer>
    );
}