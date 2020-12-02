import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Footer from './Footer';
import Foundation from './Foundation';
import Hand from './Hand';
import Row from 'react-bootstrap/Row';
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
        <Container fluid>
          <Row xs={7} sm={7}>
            <Col>
              <Stock
                onClick={this.service.clickStock}
                model={this.state.stock} />
            </Col>
            <Col>
              <Waste
                onClick={this.service.clickWaste}
                model={this.state.waste} />
            </Col>
            <Col></Col>
            {this.state.foundation.stacks.map((foundation, index) => (
              <Col>
                <Foundation
                  model={foundation}
                  index={index}
                  onClick={(c) => this.service.clickFoundation(index, c)}
                />
              </Col>
            ))}
          </Row>
          <Row xs={7}>
            {this.state.tableau.stacks.map((stack, index) => (
              <Col>
                <TableauStack
                  stackIndex={index}
                  model={stack}
                  onClick={(card, source) => this.service.clickTableauStack(card, index, source)}
                />
              </Col>))}
          </Row>
          <Row>
            <Col>
              <Footer end={this.state.end}
                started={this.state.started}
                points={this.state.points}
                isEnded={this.state.isEnded} />
              <Button variant="secondary" onClick={this.reset}>reset</Button>
            </Col>
          </Row>
        </Container>
      </div>

    );
  }
}

export default Solitaire;