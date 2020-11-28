import React, { Component } from 'react';

import Card from './Card';
import { MyContext } from '../MyContext';
import { targetStackStyle } from '../styles';

class PlayStack extends Component {

    render() {
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
                        <div style={targetStackStyle.cardStyle} onClick={() => ctx.clickOnPlayStack()}>{this.props.stack.length}</div>
                        {this.props.stack.map((card, index) => (
                            <div style={localStyle}>
                                <Card type={card.type}
                                    face={card.face}
                                    offset={index}
                                    source="play"
                                    clickCard={(c) => ctx.clickOnPlayStack(c)}
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