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
                        <div style={targetStackStyle.cardStyle} onClick={ctx.requestReset}>&nbsp;</div>
                        {this.props.stack.map((card, index) => (
                            <div style={localStyle}>
                                <Card type={card.type}
                                    face={card.face}
                                    source="main"
                                    offset={index}
                                    isHidden={card.hidden}
                                    canUncover={index == this.props.stack.length - 1}
                                    clickCard={ctx.clickMainStack}
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