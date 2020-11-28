import React, { Component } from 'react';
import { getTargetOrder } from './CardTypes';
import Card from './Card';
import { targetStackStyle } from './styles';

class TargetStack extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blinkFor: 0,
            stack: [],
            acceptedCards: [...getTargetOrder()],
        };
    }

    //@todo move to solitaire component

    onTargetStackClick = (stack) => {
        if (this.props.currentCard !== null) {
            this.offer(this.props.currentCard);
        }
    }

    offer(card) {
        if (this.props.icon == card.props.type.icon) {
            var currentAccepted = this.state.acceptedCards[this.state.acceptedCards.length - 1];
            if (currentAccepted == card.props.face) {
                this.setState((state, props) => {
                    if (state.stack.indexOf(card) == -1) {
                        state.stack.push(card);
                        state.acceptedCards.pop();
                        card.setOwner(this);
                    }
                    return { ...state };
                });
            } else {
                //@todo blink via state machine model(?)
                this.blinkRed();
            }
        } else {
            this.blinkRed();
        }
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

        var localFaceStyle = {
            ...styles.faceStyle,
            fontSize: '30px',
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
            <div style={localOuterStyle}>
                <div style={localCardStyle} onClick={() => this.onTargetStackClick(this)}>
                    <div style={localFaceStyle} >
                        <h1>
                            {this.props.icon}
                        </h1>
                    </div>
                </div>
                {this.state.stack.map(card => (
                    <div style={localStyle}>
                        <Card
                            blink={this.state.blinkFor}
                            type={card.props.type}
                            face={card.props.face}
                            clickCard={() => this.onTargetStackClick(this)} />
                    </div>))}
            </div>

        );
    }
}

export default TargetStack;