import '../App.css';

import { Component } from 'react';
import Engine from '../Service/Engine';
import Footer from './Footer';
import Foundation from './Foundation';
import Hand from './Hand';
import Interaction from '../Controller/Interaction';
import StockPile from './StockPile';
import TableauStack from './TableauStack';
import Waste from './Waste';
import { styles } from '../styles';

class Solitaire extends Component {

  constructor(props) {
    super(props);
    this.engine = new Engine(this);
    this.interaction = new Interaction(this);
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
              clickStockPile={this.interaction.stock.click}
              stockPile={this.state.stockPile} />
          </Box>
          <Box>
            <Waste
              clickOnWaste={this.interaction.waste.click}
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
                  //@todo rename to onclick
                  onFoundationClick={(c) => this.interaction.foundation.click(index, c)}
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
                  //@todo why source here but not elsewhere?
                  onClick={(card, source) => this.interaction.tableauStack.click(card, index, source)}
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