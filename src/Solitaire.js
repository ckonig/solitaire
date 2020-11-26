import MainStack from './MainStack';
import Board from './Board';
import TargetStack from './TargetStack';
import React, { Component } from 'react';
import { getDeck } from './CardTypes';

class Solitaire extends Component {

  constructor(props) {
    super(props);
    var deck = getDeck();
    var stack = deck.slice(0,15);
    var board = deck.slice(15);
    this.state = {
      currentCard: null,
      stack: stack,
      deck: board,
    };
  }

  handleCardClick = (card) => {
    console.log('current card is ', this.state.currentCard);
    if (this.state.currentCard == null) {
      console.log('select')
      this.setState((state, props) => {
        return { ...state, currentCard: card };
      });
    } else {
      if (this.state.currentCard == card) {
        console.log('deselect')
        this.setState((state, props) => {
          return { ...state, currentCard: null };
        });
      } else {
        console.log('todo implement');
      }
    }
  }

  onStackClick = (stack) => {
    if (this.state.currentCard !== null) {
      stack.offer(this.state.currentCard);
    }
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
    console.log('re-render');
    var faceStyle = {
      textAlign: 'center',
      position: 'absolute',
      top: '20px',
      width: '80px',
    };

    var styles = {
      cardStyle: {
        borderStyle: 'dashed',
        borderColor: 'gray',
        width: '80px',
        height: '120px',
        float: 'left',
        margin: '10px',
        borderRadius: '5px',
        position: 'relative',
      },

      faceStyle: {
        ...faceStyle
      },
      faceStyleRed: {
        ...faceStyle,
        color: 'red'
      },
      tableStyle: {
        backgroundColor: 'darkgreen',
      },
    };
    return (
      <div style={styles.tableStyle}>

        <table>
          <tbody>
            <tr>
              <td>
                <MainStack cardStyle={styles.cardStyle} />
              </td>
              <td>
                <div style={styles.cardStyle}>&nbsp;</div>
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
    );
  }
}

export default Solitaire;