import React, { Component } from 'react';
import { CardRange } from './CardTypes';
import Card from './Card';

class TargetStack extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blinkFor: 0,
            stack: [],
            acceptedCards: [...CardRange.reverse()],
        };
    }

    offer(card) {
        if (this.props.icon == card.props.type.icon) {
            console.log('matching icon');
            var currentAccepted = this.state.acceptedCards[this.state.acceptedCards.length - 1];
            if (currentAccepted == card.props.face) {
                console.log('yayayayayaya');
                this.setState((state, props) => {
                    if (state.stack.indexOf(card) == -1) {
                        console.log('update state', card);
                        state.stack.push(card);
                        state.acceptedCards.pop();
                        card.setOwner(this);
                    }
                    return { ...state };
                });
            } else {
                console.log('only accepting ' + currentAccepted);
                this.blinkRed();
            }
        } else {
            console.log('meh');
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

        var localStyle = {
            position: 'absolute',
            left: '0px',
            top: '0px',
        };

        var localOuterStyle = {
            position: 'relative',
        };

        var localCardStyle = { ...this.props.cardStyle };

        if (this.state.blinkFor > 0) {
            localCardStyle['borderColor'] = 'red';
        }

        return (
            <div style={localOuterStyle}>
                <div style={localCardStyle} onClick={() => this.props.onStackClick(this)}>
                    <div style={this.props.faceStyle} >
                        <h1>
                            {this.props.icon} ({this.state.stack.length}) ({this.state.acceptedCards.length})
                    </h1>
                    </div>
                </div>
                {this.state.stack.map(card => (
                    <div style={localStyle}>
                        <Card
                            blink={this.state.blinkFor}
                            type={card.props.type}
                            face={card.props.face}
                            clickCard={() => this.props.onStackClick(this)} />
                    </div>))}
            </div>

        );
    }
}

export default TargetStack;