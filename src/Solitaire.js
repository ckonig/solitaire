import MainStack from './MainStack';
import Board from './Board';
import TargetStack from './TargetStack';
import React, { Component } from 'react';
import { getDeck } from './CardTypes';
import { targetStackStyle } from './styles';
import PlayStack from './PlayStack';
import { MyContext } from './MyContext';

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

  handleCardClick = (card) => {
    console.log('card was clicked');
    console.log(card);
    if (this.state.currentCard == null) {
      this.setState((state, props) => {
        return { ...state, currentCard: card };
      });
    } else {
      if (this.state.currentCard == card) {
        this.setState((state, props) => {
          return { ...state, currentCard: null };
        });
      } else {
        // current card is selected, but another card is clicked.
        // this type of card click should only happen on the board
        // if user clicks on card on TargetStack  or MainStack it's handled there.
        // if user clicks on playStack it's handled by that too, activating the top card.
        console.log('todo implement');
      }
    }
  }

  onStackClick = (stack) => {
    if (this.state.currentCard !== null) {
      stack.offer(this.state.currentCard);
    }
  }

  onMainstackClick = (card) => {
    console.log(card);
    console.log('was cl;iocke');
    this.handleCardClick(card);
  }

  handler = (props) => {
    this.handleCardClick(props);
  }

  unselect = () => {
    this.setState((state, props) => {
      return { ...state, currentCard: null };
    });
  }

  render() {
    var styles = {
      ...targetStackStyle
    };

    var ctxState = {
      currentCard: this.state.currentCard,
      resetCurrentCard: () => this.unselect(),
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
                  <PlayStack stack={this.state.playStack} />
                </td>
                <td>
                  <TargetStack onStackClick={this.onStackClick} icon="♥" cardStyle={styles.cardStyle} faceStyle={styles.faceStyleRed} />
                </td>
                <td>
                  <TargetStack onStackClick={this.onStackClick} icon="♦" cardStyle={styles.cardStyle} faceStyle={styles.faceStyleRed} />
                </td>
                <td>
                  <TargetStack onStackClick={this.onStackClick} icon="♣" cardStyle={styles.cardStyle} faceStyle={styles.faceStyle} />
                </td>
                <td>
                  <TargetStack onStackClick={this.onStackClick} icon="♠" cardStyle={styles.cardStyle} faceStyle={styles.faceStyle} />
                </td>
              </tr>
              <tr>
                <td colSpan="6">
                  <Board
                    deck={this.state.deck}
                    handler={this.handler}
                    cards={this.state.cards}
                    unselectCard={this.unselect}
                    currentCard={this.state.currentCard}
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