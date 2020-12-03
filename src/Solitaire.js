import './App.css';

import { Component } from 'react';
import Footer from './View/Footer';
import Foundation from './View/Foundation';
import Hand from './View/MouseHand';
import Service from './Service/Facade';
import Stock from './View/Stock';
import TableauStack from './View/TableauStack';
import Waste from './View/Waste';

class Solitaire extends Component {

  constructor(props) {
    super(props);
    this.service = new Service(this);
    this.state = this.service.getInitialState();
  }

  render() {
    return (
      <div>
        <Hand stack={this.state.hand.stack} />
        <div className="layout-grid-container">
          <Stock
            model={this.state.stock}
            onClick={this.service.clickStock} />
          <Waste
            model={this.state.waste}
            hand={this.state.hand}
            onClick={this.service.clickWaste} />
          <div className="spacer">&nbsp;</div>
          {this.state.foundation.stacks.map((foundation, index) => (
            <Foundation
              key={"f" + index}
              index={index}
              model={foundation}
              hand={this.state.hand}
              onClick={(c) => this.service.clickFoundation(index, c)}
            />
          ))}
          {this.state.tableau.stacks.map((stack, index) => (
            <TableauStack
              key={"t" + index}
              index={index}
              model={stack}
              hand={this.state.hand}
              onClick={(card, source) => this.service.clickTableauStack(card, index, source)}
            />
          ))}
          <Footer
            reset={this.service.reset}
            model={this.state.game} />
        </div>
      </div>
    );
  }
}

export default Solitaire;