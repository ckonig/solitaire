import React, { Component } from 'react';
import { targetStackStyle } from './styles';
import Card from './Card';
import { MyContext } from './MyContext';

class PlayStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stack: [],
        };
    }

    disown = (card) => {
        this.removeFromStack(card);
        this.props.unselectCard();
    }

    removeFromStack = (card) => {
        this.setState((state, props) => {
            var stack = state.stack.filter((value, index, arr) => {
                return value.face !== card.props.face || value.type.icon !== card.props.type.icon;
            });
            return { ...state, stack };
        });
    }

    onStackClick = (card) => {
        if (this.props.currentCard != null && this.props.currentCard != card) {
            this.props.currentCard.setOwner(this);
            this.setState((state, props) => {
                if (this.props.currentCard != null && state.stack.indexOf(card) == -1) {
                    state.stack.push(this.props.currentCard.props);
                }
                return { ...state };
            });

        }
        this.props.onStackClick(card);
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
        return (
            <MyContext.Consumer>
                {ctx =>
                    <div style={localOuterStyle}>
                        <div style={styles.cardStyle} onClick={() => this.onStackClick()}>{this.state.stack.length}</div>
                        {this.state.stack.map((card, index) => (
                            <div style={localStyle}>
                                <Card type={card.type}
                                    face={card.face}
                                    offset={index}
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

export default PlayStack;