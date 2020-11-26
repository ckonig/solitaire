import React, { Component } from 'react';
import { targetStackStyle } from './styles';
import Card from './Card';

class MainStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stack: this.props.stack,
        };
    }

    onStackClick = (card) => {
        console.log(card);
        this.props.onStackClick(card);
    }

    disown() {
        this.setState((state, props) => {
            state.stack && state.stack.pop();
            return { ...state };
        });
        this.props.unselectCard();
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
            ...this.props.faceStyle,
            fontSize: '30px',
            top: '0px',
        };

        var localOuterStyle = {
            position: 'relative',
        };

        var localCardStyle = { ...this.props.cardStyle };


        return (
            <div>
                <div style={styles.cardStyle}>&nbsp;</div>
                {this.props.stack.map(card => (
                    <div style={localStyle}>
                        <Card type={card.type}
                            face={card.face}
                            owner={this}
                            clickCard={(c) => this.onStackClick(c)}
                            isSelected={this.props.currentCard != null && this.props.currentCard.props.face == card.face && this.props.currentCard.props.type.icon == card.type.icon}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default MainStack;