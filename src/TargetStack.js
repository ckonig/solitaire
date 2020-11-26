import React, { Component } from 'react';

class TargetStack extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blinkFor: 0,
        };
    }

    offer(card) {
        if (this.props.icon == card.type.icon) {
            console.log('matching');
            console.log('todo implement')
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
        var cardStyle = { ...this.props.cardStyle };
        if (this.state.blinkFor > 0) {
            if (this.state.blinkFor % 2 == 0) {
                cardStyle['borderColor'] = 'red';
            }
        }
        return (
            <div style={cardStyle} onClick={() => this.props.onStackClick(this)}>
                <div style={this.props.faceStyle} >
                    <h1>
                        {this.props.icon}
                    </h1>
                </div>
            </div>
        );
    }
}

export default TargetStack;