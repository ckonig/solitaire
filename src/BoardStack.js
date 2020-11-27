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
            stack: [...props.stack],
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
                this.setState((state, props) => {
                    if (this.props.currentCard != null && state.stack.indexOf(this.props.currentCard.props) == -1) {
                        this.props.currentCard.setOwner(this);
                        state.stack.push(this.props.currentCard.props);
                    }
                    return { ...state };
                });
            } else {
                this.blinkRed();
            }
        }
        this.props.onStackClick(card);
    }

    addCardToStack(card) {
        this.setState((state, props) => {
            if (this.props.currentCard != null && state.stack.indexOf(this.props.currentCard.props) == -1) {
                this.props.currentCard.setOwner(this);
                state.stack.push(this.props.currentCard.props);
            }
            return { ...state };
        });
        if (card.getChild()) {
            console.log('adding child too');
            this.addCardToStack(card.getChild());
        }
    }

    disown = (card) => {
        this.removeFromStack(card);
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

    removeFromStack = (card) => {
        this.setState((state, props) => {
            var stack = state.stack.filter((value, index, arr) => {
                return value.face !== card.props.face || value.type.icon !== card.props.type.icon;
            });
            return { ...state, stack };
        });
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
                        <div style={localCardStyle} onClick={() => this.onStackClick()}>{this.state.stack.length}</div>
                        {this.state.stack.map((card, index) => (
                            <div className="localstyl0r" style={localStyle}>
                                <Card 
                                    type={card.type}
                                    face={card.face}
                                    offsetTop={index * 20}
                                    isHidden={card.hidden}
                                    blink={this.state.blinkFor}
                                    owner={this}
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