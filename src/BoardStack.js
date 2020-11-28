import React, { Component } from 'react';
import { MyContext } from './MyContext';
import { targetStackStyle } from './styles';
import Card from './Card';

class BoardStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blinkFor: 0,
        };
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
                        <div style={localCardStyle} onClick={() => this.props.onBoardStackClick()}>{this.props.stack.length}</div>
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
                                    clickCard={(c) => this.props.onBoardStackClick(c)}
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