import '../App.css';

import { Component } from 'react';
import Engine from '../Game/Engine';
import Foundation from './Foundation';
import Hand from './Hand';
import { MyContext } from '../MyContext';
import StockPile from './StockPile';
import Tableau from './Tableau';
import Waste from './Waste';
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
          stack={this.state.hand.stack} />
        <div style={targetStackStyle.tableStyle}>
          <table>
            <tbody>
              <tr>
                <td>
                  <StockPile />
                </td>
                <td>
                  <Waste stack={this.state.waste} />
                </td>
                <td style={{ width: '100px' }}>
                  &nbsp;
                </td>
                {this.state.foundations.map((foundation, index) => (
                  <td>
                    <Foundation
                      stack={foundation.stack}
                      blinkFor={foundation.blinkFor}
                      icon={foundation.icon}
                      onFoundationClick={(c) => this.state.onFoundationClick(index, c)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td colSpan="7">
                  <Tableau
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