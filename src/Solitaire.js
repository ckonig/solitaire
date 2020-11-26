import Board from './Board';
import TargetStack from './TargetStack';
import React, { Component } from 'react';
import { getDeck } from './CardTypes';

class Solitaire extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentCard: null,
      cards: getDeck()
    };
  }

  handleCardClick = (card) => {
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
    for (var i = 0; i < this.state.cards.length; i++) {
      var card = this.state.cards[i];
      if (card.face == props.face && card.type.icon == props.type.icon) {
        this.handleCardClick(card);
      }
    }
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
                <div style={styles.cardStyle}>&nbsp;</div>
              </td>
              <td>
                <div style={styles.cardStyle}>&nbsp;</div>
              </td>
              <td>
                <TargetStack onStackClick={this.onStackClick} icon="♥" cardStyle={styles.cardStyle} faceStyle={styles.faceStyleRed} />
                <TargetStack onStackClick={this.onStackClick} icon="♦" cardStyle={styles.cardStyle} faceStyle={styles.faceStyleRed} />
                <TargetStack onStackClick={this.onStackClick} icon="♣" cardStyle={styles.cardStyle} faceStyle={styles.faceStyle} />
                <TargetStack onStackClick={this.onStackClick} icon="♠" cardStyle={styles.cardStyle} faceStyle={styles.faceStyle} />
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <Board handler={this.handler} cards={this.state.cards} currentCard={this.state.currentCard} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Solitaire;