import MainStack from './MainStack';
import Board from './Board';
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
      onBoardStackClick: this.engine.onBoardStackClick,
      onTargetStackClick: this.engine.onTargetStackClick,
      unselect: this.engine.unselect,
      setCurrentCard: this.engine.setCurrentCard,
      addToPlayStack: this.engine.addToPlayStack,
      requestReset: this.engine.requestReset,
    };
  }

  render() {
    return (
      <MyContext.Provider value={this.state}>
        <div style={targetStackStyle.tableStyle}>
          <table>
            <tbody>
              <tr>
                <td>
                  <MainStack stack={this.state.stack} setCurrentCard={(c) => this.state.setCurrentCard(c)}
                    unselectCard={this.state.unselect} requestReset={this.state.requestReset} />
                </td>
                <td>
                  <PlayStack addToPlayStack={this.state.addToPlayStack} stack={this.state.playStack} currentCard={this.state.currentCard}
                    unselectCard={this.state.unselect} />
                </td>
                {this.state.targetStacks.map((targetStack, index) => (
                  <td>
                    <TargetStack stack={targetStack.stack} onTargetStackClick={(c) => this.state.onTargetStackClick(index, c)} currentCard={this.state.currentCard} icon={targetStack.icon} />
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