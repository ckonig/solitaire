import '../App.css';

import React, { Component } from 'react';

import Board from './Board';
import Engine from '../Game/Engine';
import Hand from './Hand';
import MainStack from './MainStack';
import { MyContext } from '../MyContext';
import PlayStack from './PlayStack';
import TargetStack from './TargetStack';
import { targetStackStyle } from '../styles';

class Solitaire extends Component {

  constructor(props) {
    super(props);
    this.engine = new Engine(this);
    this.state = this.engine.getInitialState();
  }

  render() {
    return (
      <MyContext.Provider value={this.state}>
        <Hand
          currentCard={this.state.currentCard}
          stack={this.state.hand.stack}
          pickup={this.state.pickup} />
        <div style={targetStackStyle.tableStyle}>
          <table>
            <tbody>
              <tr>
                <td>
                  <MainStack stack={this.state.stack} />
                </td>
                <td>
                  <PlayStack stack={this.state.playStack} />
                </td>
                {this.state.targetStacks.map((targetStack, index) => (
                  <td>
                    <TargetStack
                      stack={targetStack.stack}
                      blinkFor={targetStack.blinkFor}
                      icon={targetStack.icon}
                      onTargetStackClick={(c) => this.state.onTargetStackClick(index, c)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td colSpan="6">
                  <Board
                    stacks={this.state.stacks}
                    deck={this.state.deck}
                    cards={this.state.cards}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </MyContext.Provider>
    );
  }
}

export default Solitaire;