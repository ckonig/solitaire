import '../App.css';

import { Component } from 'react';
import Controller from '../Controller/Facade';
import Footer from './Footer';
import Foundation from './Foundation';
import Hand from './Hand';
import Stock from './Stock';
import TableauStack from './TableauStack';
import Waste from './Waste';
import getInitialState from '../Model/getInitialState';
import { styles } from '../styles';

class Solitaire extends Component {

  constructor(props) {
    super(props);
    this.controller = new Controller(this);
    this.state = getInitialState();
  }

  render() {
    const style = styles.solitaire;
    const Box = (props) => <div style={style.stackbox}>{props.children}</div>
    return (
      <div style={style.table}>
        <Hand stack={this.state.hand.stack} />
        <div style={style.upperContainer}>
          <Box>
            <Stock
              onClick={this.controller.stock.click}
              blinkFor={this.state.stock.blinkFor}
              stack={this.state.stock.stack} />
          </Box>
          <Box>
            <Waste
              onClick={this.controller.waste.click}
              blinkFor={this.state.waste.blinkFor}
              stack={this.state.waste.stack} />
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
                  onClick={(c) => this.controller.foundation.click(index, c)}
                />
              </Box>
            ))}
          </div>
          <div style={style.middleContainer}>
            {this.state.tableau.stacks.map((stack, index) => (
              <Box>
                <TableauStack
                  stackIndex={index}
                  stack={stack.stack}
                  blinkFor={stack.blinkFor}
                  onClick={(card, source) => this.controller.tableauStack.click(card, index, source)}
                />
              </Box>))}
          </div>
          <div style={style.lowerContainer}>
            <Footer end={this.state.end}
              started={this.state.started}
              points={this.state.points}
              isEnded={this.state.isEnded} />
          </div>
        </div>
      </div>
    );
  }
}

export default Solitaire;