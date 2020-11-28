import React, { Component } from 'react';
import { targetStackStyle } from './styles';
import Card from './Card';
import { MyContext } from './MyContext';

class MainStack extends Component {

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
                        <div style={targetStackStyle.cardStyle} onClick={() => this.props.requestReset()}>&nbsp;</div>
                        {this.props.stack.map((card, index) => (
                            <div style={localStyle}>
                                <Card type={card.type}
                                    face={card.face}
                                    source="main"
                                    offset={index}
                                    clickCard={(c) => this.props.setCurrentCard(c)}
                                    isSelected={ctx.currentCard != null && ctx.currentCard.props.face == card.face && ctx.currentCard.props.type.icon == card.type.icon}
                                />
                            </div>
                        ))}
                    </div>
                }</MyContext.Consumer>
        );
    }
}

export default MainStack;