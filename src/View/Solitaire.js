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
    return (
      <div style={style.table} >
        <Hand stack={this.state.hand.stack} />
        <div className="grid-container">

          <div className="stock">
            <Stock
              onClick={this.service.clickStock}
              model={this.state.stock} />
          </div>
          <div className="waste">
            <Waste
              onClick={this.service.clickWaste}
              hand={this.state.hand}
              model={this.state.waste} />
          </div>
          <div className="spacer">&nbsp;</div>
          {this.state.foundation.stacks.map((foundation, index) => (
            <div className={"f" + index}>

              <Foundation
                model={foundation}
                index={index}
                hand={this.state.hand}
                onClick={(c) => this.service.clickFoundation(index, c)}
              />

            </div>
          ))}
          {this.state.tableau.stacks.map((stack, index) => (
            <div className={"t" + index}>

              <TableauStack
                stackIndex={index}
                model={stack}
                hand={this.state.hand}
                onClick={(card, source) => this.service.clickTableauStack(card, index, source)}
              />
            </div>
          ))}

          <div className="footer">
            <Footer end={this.state.end}
              started={this.state.started}
              points={this.state.points}
              isEnded={this.state.isEnded} />
            <button variant="secondary" onClick={this.reset}>reset</button>
          </div>

        </div>
      </div>

    );
  }
}

export default Solitaire;