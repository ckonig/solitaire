import '../App.css';

import { Component } from 'react';
import Footer from './Footer';
import Foundation from './Foundation';
import Hand from './Hand';
import Service from '../Service/Facade';
import Stock from './Stock';
import TableauStack from './TableauStack';
import Waste from './Waste';
import generateDeck from '../Model/Deck/DeckGenerator';
import getInitialState from '../Model/getInitialState';
import { styles } from '../styles';

class Solitaire extends Component {

  constructor(props) {
    super(props);
    this.deck = generateDeck();
    this.deck.shuffle();
    this.state = getInitialState(this.deck);
    this.service = new Service(this);
  }

  reset = () => this.setState(() => ({ ...getInitialState(this.deck) }))

  render() {
    const style = styles.solitaire;
    const Box = (props) => <div style={style.stackbox}>{props.children}</div>
    return (
      <div style={style.table} >
        <Hand stack={this.state.hand.stack} />
        <div style={style.upperContainer}>
          <Box>
            <Stock
              onClick={this.service.clickStock}
              model={this.state.stock} />
          </Box>
          <Box>
            <Waste
              onClick={this.service.clickWaste}
              model={this.state.waste} />
          </Box>
          <Box>&nbsp;</Box>
          <div>
            {this.state.foundation.stacks.map((foundation, index) => (
              <Box>
                <Foundation
                  model={foundation}
                  index={index}
                  onClick={(c) => this.service.clickFoundation(index, c)}
                />
              </Box>
            ))}
          </div>
          <div style={style.middleContainer}>
            {this.state.tableau.stacks.map((stack, index) => (
              <Box>
                <TableauStack
                  stackIndex={index}
                  model={stack}
                  onClick={(card, source) => this.service.clickTableauStack(card, index, source)}
                />
              </Box>))}
          </div>
          <div style={style.lowerContainer}>
            <Footer end={this.state.end}
              started={this.state.started}
              points={this.state.points}
              isEnded={this.state.isEnded} />
            <button onClick={this.reset}>reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Solitaire;