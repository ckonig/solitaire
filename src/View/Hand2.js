import React, { Component } from 'react';

import Card from './Card';

export default class Hand2 extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var outer = {
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '0px',
            height: '0px',
        }

        var localStyle = {
            position: 'absolute',
            left: '0px',
            top: '0px',
        };

        return (
            <div style={outer}>

                {this.props.stack && this.props.stack.map((card, index) => (
                    <div style={localStyle}>
                        <Card
                            offsetTop={this.props.offset + (index * 20)}
                            zIndex={1000 + (index * 20)}
                            type={card.type}
                            face={card.face}
                            isSelected={true}
                            source={card.source}
                            onClick={(c) => this.props.onClick(c)}
                        />
                    </div>
                ))}
            </div>
        );
    }
}