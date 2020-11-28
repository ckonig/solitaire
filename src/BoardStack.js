import React, { Component } from 'react';
import { MyContext } from './MyContext';
import { targetStackStyle } from './styles';
import Card from './Card';
import { CardRange } from './CardTypes';

class BoardStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blinkFor: 0,
        };
    }

    validate = (current, top) => {
        var range = [...CardRange];
        var currentIndex = range.indexOf(current.props.face);
        var topIndex = range.indexOf(top.props.face);
        console.log('comparing ' + currentIndex + ' to ' + topIndex)
        return (currentIndex + 1) == topIndex && (current.props.type.color != top.props.type.color);
    }

    onStackClick = (card) => {
        if (card && this.props.currentCard != null && this.props.currentCard != card) {
            if (this.validate(this.props.currentCard, card)) {
                if (this.props.currentCard != null && this.props.stack.indexOf(this.props.currentCard.props) == -1) {
                    this.props.currentCard.setOwner(this);
                    this.props.stack.push(this.props.currentCard.props);
                }
            } else {
                this.blinkRed();
            }
        }

        if (!card && this.props.currentCard && this.props.currentCard.props && this.props.currentCard.props.face == 'K') {
            if (this.props.currentCard != null && this.props.stack.indexOf(this.props.currentCard.props) == -1) {
                this.props.currentCard.setOwner(this);
                this.props.stack.push(this.props.currentCard.props);
            }
        }

        this.props.onStackClick(card);
    }

    addCardToStack(card) {
        this.props.currentCard.setOwner(this);
        this.props.stack.push(this.props.currentCard.props);
    }

    disown = (card) => {
        this.props.disown(card);
        this.props.unselectCard();
    }

    blinkRed() {
        this.setState((state, props) => {
            return { ...state, blinkFor: 10 };
        });
        setTimeout(() => {
            this.setState((state, props) => {
                return { ...state, blinkFor: 0 };
            });
        }, 100);
    }

    render() {
        var styles = {
            ...targetStackStyle
        };

        var localStyle = {
            position: 'absolute',
            left: '0px',
            top: '0px',
        };

        var localOuterStyle = {
            position: 'relative',
        };

        var localCardStyle = { ...styles.cardStyle };

        if (this.state.blinkFor > 0) {
            localCardStyle.borderColor = 'red';
        }

        return (
            <MyContext.Consumer>
                {ctx =>
                    <div style={localOuterStyle}>
                        <div style={localCardStyle} onClick={() => this.onStackClick()}>{this.props.stack.length}</div>
                        {this.props.stack.map((card, index) => (
                            <div className="localstyl0r" style={localStyle}>
                                <Card
                                    type={card.type}
                                    face={card.face}
                                    offsetTop={index * 20}
                                    isHidden={card.hidden}
                                    blink={this.state.blinkFor}
                                    owner={this}
                                    canUncover={index == this.props.stack.length - 1}
                                    clickCard={(c) => this.onStackClick(c)}
                                    isSelected={ctx.currentCard != null && ctx.currentCard.props.face == card.face && ctx.currentCard.props.type.icon == card.type.icon}
                                />
                            </div>

                        ))}

                    </div>
                }</MyContext.Consumer>
        );
    }
}

export default BoardStack;