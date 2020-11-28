import MainStack from './MainStack';
import Board from './Board';
import Hand from './Hand';
import TargetStack from './TargetStack';
import React, { Component } from 'react';
import { getDeck, getStacks, getTargetOrder } from './CardTypes';
import { targetStackStyle } from './styles';
import PlayStack from './PlayStack';
import { MyContext } from './MyContext';
import './App.css';
import Engine from './Engine';

class Solitaire extends Component {

  constructor(props) {
    super(props);
    var deck = getDeck();
    var stack = deck.slice(0, 20);
    var board = deck.slice(20);
    var stacks = getStacks([...board]);
    this.engine = new Engine(this);
    var getStack = (icon) => {
      return {
        stack: [],
        acceptedCards: [...getTargetOrder()],
        icon,
      };
    };
    this.state = {
      currentCard: null,
      stack: stack,
      playStack: [],
      targetStacks: [getStack("♥"), getStack("♦"), getStack("♣"), getStack("♠")],
      deck: board,
      stacks: stacks,
      hand: {
        stack: null,
        source: null
      },
      onBoardStackClick: this.engine.onBoardStackClick,
      onTargetStackClick: this.engine.onTargetStackClick,
      clickMainStack: this.engine.clickMainStack,
      setCurrentCard: this.engine.setCurrentCard,
      addToPlayStack: this.engine.addToPlayStack,
      requestReset: this.engine.requestReset,
    };
  }

  render() {
    return (
      <MyContext.Provider value={this.state}>
        <Hand
          currentCard={this.state.currentCard}
          stack={this.state.hand.stack}
          setCurrentCard={this.state.setCurrentCard} />
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