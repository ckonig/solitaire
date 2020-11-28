import React, { Component } from 'react';
import { targetStackStyle } from './styles';
import Card from './Card';
import { MyContext, defaultValue } from './MyContext';

class MainStack extends Component {

    onStackClick = (card) => {
        if (card) {
            this.props.setCurrentCard(card);
        } else {
            this.props.requestReset();
        }
    }

    disown() {
        this.props.disown();
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
                        <div style={styles.cardStyle} onClick={() => this.onStackClick()}>&nbsp;</div>
                        {this.props.stack.map((card, index) => (
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

export default MainStack;