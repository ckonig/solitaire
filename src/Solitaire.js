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
      deck: board,
    };
  }

  onMainstackClick = (card) => {
    if (!card || card == null) {
      console.log('todo: transfer playstack to mainstack')
    }
    this.setCurrentCard(card);
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

  handler = (props) => {
    this.setCurrentCard(props);
  }

  unselect = () => {
    this.setState((state, props) => {
      return { ...state, currentCard: null };
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
                  <MainStack stack={this.state.stack} onStackClick={(c) => this.onMainstackClick(c)} unselectCard={this.unselect} />
                </td>
                <td>
                  <PlayStack onStackClick={(c) => this.onPlayStackCLick(c)} currentCard={ctxState.currentCard} unselectCard={this.unselect} />
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
                    handler={this.handler}
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