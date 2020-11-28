import React, { Component } from 'react';

import Card from './Card';
import { MyContext } from '../MyContext';
import { targetStackStyle } from '../styles';

class BoardStack extends Component {

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

        if (this.props.blinkFor > 0) {
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
                                    source={"board-" + this.props.stackIndex}
                                    isHidden={card.hidden}
                                    blink={this.props.blinkFor}
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