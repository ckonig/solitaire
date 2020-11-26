import Card from './Card';
import React, { Component } from 'react';
import { getDeck } from './CardTypes';

class Solitaire extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentCard: null,
      cards: getDeck()
    };
    this.setStyles();
  }

  setStyles() {
    var faceStyle = {
      textAlign: 'center',
      position: 'absolute',
      top: '20px',
      width: '80px',
    };

    this.styles = {
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
  }

  handleCardClick(card) {
    if (this.state.currentCard == null) {
      this.setState((state, props) => {
        return {...state, currentCard: card};
      });
    } else {
      if (this.state.currentCard == card) {
        this.setState((state, props) => {
          return {...state, currentCard: null};
        });
      } else {
        console.log('todo implement');
      }
    }
  }

  handler(props) {
    console.log(props);
    console.log(this.state.cards);
    for (var i = 0; i < this.state.cards.length; i++) {
      var card = this.state.cards[i];
      if (card.face == props.face && card.type.icon == props.type.icon) {
        console.log(' found in deck ');
        this.handleCardClick(card);
      }
    }
  }

  render() {
    console.log('re-render');
    return (
      <div style={this.styles.tableStyle}>

        <table>
          <tbody>
            <tr>
              <td>
                <div style={this.styles.cardStyle}>&nbsp;</div>
              </td>
              <td>
                <div style={this.styles.cardStyle}>&nbsp;</div>
              </td>
              <td>
                <div style={this.styles.cardStyle}><div style={this.styles.faceStyleRed} ><h1>♥</h1></div></div>
                <div style={this.styles.cardStyle}><div style={this.styles.faceStyleRed} ><h1>♦</h1></div></div>
                <div style={this.styles.cardStyle}><div style={this.styles.faceStyle} ><h1>♣</h1></div></div>
                <div style={this.styles.cardStyle}><div style={this.styles.faceStyle} ><h1>♠</h1></div></div>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                {this.state.cards.map(card => (
                  <Card
                    key={card.key}
                    type={card.type}
                    face={card.face}
                    isSelected={this.state.currentCard == card}
                    handler={(props) => this.handler(props)} />
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Solitaire;