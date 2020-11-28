import MainStack from './MainStack';
import Board from './Board';
import TargetStack from './TargetStack';
import React, { Component } from 'react';
import { getDeck, getStacks } from './CardTypes';
import { targetStackStyle } from './styles';
import PlayStack from './PlayStack';
import { MyContext } from './MyContext';
import './App.css';

class Solitaire extends Component {

  constructor(props) {
    super(props);
    var deck = getDeck();
    var stack = deck.slice(0, 15);
    var board = deck.slice(15);
    var stacks = getStacks([...board]);
    this.state = {
      currentCard: null,
      stack: stack,
      playStack: [],
      deck: board,
      stacks: stacks,
    };
  }

  addToPlayStack = (card) => {
    console.log('hello here ', card, this.state.currentCard);
    if (this.state.currentCard != null && this.state.currentCard != card) {
      if (this.state.currentCard != null && this.state.stack.indexOf(card) == -1
        && this.state.stack[this.state.stack.length - 1].face == this.state.currentCard.props.face
        && this.state.stack[this.state.stack.length - 1].type.icon == this.state.currentCard.props.type.icon
      ) {
        this.state.playStack.push(this.state.stack.pop());
        this.unselect();
      }
    } else if (card && this.state.currentCard == card) {
      this.unselect();
    } else if (card && this.state.currentCard == null) {
      this.setState((state, props) => {
        state.currentCard = card;
        return { ...state };
      });
    }
  }

  disownPlayStack = (card) => {
    this.setState((state, props) => {
      var playStack = state.playStack.filter((value, index, arr) => {
        return value.face !== card.props.face || value.type.icon !== card.props.type.icon;
      });
      return { ...state, playStack };
    });
    this.unselect();
  }

  disownMainStack = () => {
    this.setState((state, props) => {
      state.stack && state.stack.pop();
      return { ...state };
    });
    this.unselect();
  }

  disownBoardStack = (index, card) => {
    this.setState((state, props) => {
      var stack = state.stacks[index].filter((value, index, arr) => {
        return value.face !== card.props.face || value.type.icon !== card.props.type.icon;
      });
      state.stacks[index] = stack;
      return { ...state };
    });
    this.unselect();
  }

  unselect = () => {
    this.setState((state, props) => {
      return { ...state, currentCard: null };
    });
  }

  requestReset = () => {
    console.log('before transfer')
    console.log(this.state.stack.length, this.state.playStack.length);
    this.setState((state, props) => {
      state.stack = [...state.playStack].reverse();
      state.playStack = [];
      console.log('after transfer')
      console.log(state.stack.length, state.playStack.length);
      return { ...state };
    });
  }

  setCurrentCard = (card) => {
    if (this.state.currentCard == null) {
      this.setState((state, props) => {
        return { ...state, currentCard: card };
      });
    } else if (this.state.currentCard == card) {
      this.setState((state, props) => {
        return { ...state, currentCard: null };
      });
    }
  }

  render() {
    var styles = {
      ...targetStackStyle
    };

    var ctxState = {
      currentCard: this.state.currentCard,
      resetCurrentCard: () => this.unselect(),
      setCurrentCard: (card) => this.setCurrentCard(card),
    }

    return (
      <MyContext.Provider value={ctxState}>
        <div style={styles.tableStyle}>
          <table>
            <tbody>
              <tr>
                <td>
                  <MainStack disown={this.disownMainStack} stack={this.state.stack} setCurrentCard={(c) => this.setCurrentCard(c)} unselectCard={this.unselect} requestReset={this.requestReset} />
                </td>
                <td>
                  <PlayStack addToPlayStack={this.addToPlayStack} disown={this.disownPlayStack} stack={this.state.playStack} currentCard={ctxState.currentCard} unselectCard={this.unselect} />
                </td>
                <td>
                  <TargetStack currentCard={ctxState.currentCard} icon="♥" />
                </td>
                <td>
                  <TargetStack currentCard={ctxState.currentCard} icon="♦" />
                </td>
                <td>
                  <TargetStack currentCard={ctxState.currentCard} icon="♣" />
                </td>
                <td>
                  <TargetStack currentCard={ctxState.currentCard} icon="♠" />
                </td>
              </tr>
              <tr>
                <td colSpan="6">
                  <Board
                    disownBoardStack={this.disownBoardStack}
                    stacks={this.state.stacks}
                    deck={this.state.deck}
                    handler={this.setCurrentCard}
                    cards={this.state.cards}
                    unselectCard={this.unselect}
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