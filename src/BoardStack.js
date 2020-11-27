import React, { Component } from 'react';
import { MyContext } from './MyContext';
import Card from './Card';

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