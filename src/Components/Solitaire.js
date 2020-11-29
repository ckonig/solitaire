import '../App.css';

import Clock from './Clock';
import { Component } from 'react';
import Engine from '../Game/Engine';
import Foundation from './Foundation';
import Hand from './Hand';
import StockPile from './StockPile';
import TableauStack from './TableauStack';
import Waste from './Waste';
import { targetStackStyle } from '../styles';

class Solitaire extends Component {

  constructor(props) {
    super(props);
    this.engine = new Engine(this);
    this.state = this.engine.getInitialState();
  }

  //@todo use CSS instead of HTML table for layout
  render() {
    return (
      <div>
        <Hand stack={this.state.hand.stack} />
        <div style={targetStackStyle.tableStyle}>
          <table>
            <tbody>
              <tr>
                <td>
                  <StockPile
                    clickStockPile={this.state.clickStockPile}
                    stockPile={this.state.stockPile} />
                </td>
                <td>
                  <Waste
                    clickOnWaste={this.state.clickOnWaste}
                    stack={this.state.waste} />
                </td>
                <td style={{ width: '100px' }}>&nbsp;</td>
                {this.state.foundations.map((foundation, index) => (
                  <td>
                    <Foundation
                      stack={foundation.stack}
                      index={index}
                      blinkFor={foundation.blinkFor}
                      icon={foundation.icon}
                      onFoundationClick={(c) => this.state.onFoundationClick(index, c)}
                    />
                  </td>
                ))}
                {/*@todo move to display component*/}
                <td>
                  Points: {this.state.points}
                  <br />
                  <Clock started={this.state.started} end={this.state.end} />
                  <br />
                  Is Ended: {this.state.isEnded ? "Y" : "N"}
                </td>
              </tr>
              <tr>
                <td colSpan="7">
                  <table>
                    <tbody>
                      <tr>
                        {this.state.stacks.map((stack, index) => (
                          <td>
                            <TableauStack
                              stackIndex={index}
                              stack={stack.stack}
                              blinkFor={stack.blinkFor}
                              onClick={(card, source) => this.state.onTableauStackClick(card, index, source)}
                            /></td>))}
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Solitaire;