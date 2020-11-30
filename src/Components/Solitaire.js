import '../App.css';

import Clock from './Clock';
import { Component } from 'react';
import Engine from '../Game/Engine';
import Foundation from './Foundation';
import Hand from './Hand';
import StockPile from './StockPile';
import TableauStack from './TableauStack';
import Waste from './Waste';
import { styles } from '../styles';

class Solitaire extends Component {

  constructor(props) {
    super(props);
    this.engine = new Engine(this);
    this.state = this.engine.getInitialState();
  }

  render() {
    const style = styles.solitaire;
    const Box = (props) => <div style={style.stackbox}>{props.children}</div>
    return (
      <div style={style.table}>
        <Hand stack={this.state.hand.stack} />
        <div style={style.upperContainer}>
          <Box>
            <StockPile
              clickStockPile={this.engine.stock.clickStockPile}
              stockPile={this.state.stockPile} />
          </Box>
          <Box>
            <Waste
              clickOnWaste={this.engine.stock.clickWaste}
              stack={this.state.waste} />
          </Box>
          <Box>&nbsp;</Box>
          <div>
            {this.state.foundations.map((foundation, index) => (
              <Box>
                <Foundation
                  stack={foundation.stack}
                  index={index}
                  blinkFor={foundation.blinkFor}
                  icon={foundation.icon}
                  onFoundationClick={(c) => this.engine.foundation.click(index, c)}
                />
              </Box>
            ))}
          </div>
          <div style={style.middleContainer}>
            {this.state.stacks.map((stack, index) => (
              <Box>
                <TableauStack
                  stackIndex={index}
                  stack={stack.stack}
                  blinkFor={stack.blinkFor}
                  onClick={(card, source) => this.engine.tableauStack.click(card, index, source)}
                />
              </Box>))}
          </div>
          <div style={style.lowerContainer}>

            Points: {this.state.points}
            <br />
            <Clock started={this.state.started} end={this.state.end} />
            <br />
          Is Ended: {this.state.isEnded ? "Y" : "N"}

          </div>
        </div>
      </div>
    );
  }
}

export default Solitaire;