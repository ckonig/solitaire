import MainStack from './MainStack';
import Board from './Board';
import TargetStack from './TargetStack';
import React, { Component } from 'react';
import { getDeck } from './CardTypes';
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
    this.state = {
      currentCard: null,
      stack: stack,
      playStack: [],
      deck: board,
    };
  }

  onPlayStackCLick = (card) => {
    if (this.state.currentCard) {
      if (this.state.currentCard == card) {
        // deselect
        this.setState((state, props) => {
          return { ...state, currentCard: null };
        });
      }
    } else {
      // select card if there is one
      this.setCurrentCard(card);
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

  unselect = () => {
    this.setState((state, props) => {
      return { ...state, currentCard: null };
    });
  }

  requestReset = () => {
    console.log('RESET NOW')
    this.setState((state, props) => {
      state.stack = [...state.playStack];
      state.playStack = [];
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
                  <PlayStack disown={this.disownPlayStack} stack={this.state.playStack} onStackClick={(c) => this.onPlayStackCLick(c)} currentCard={ctxState.currentCard} unselectCard={this.unselect} />
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