import React, { Component } from 'react';

import Card from './Card';
import { MyContext } from '../MyContext';
import { targetStackStyle } from '../styles';

export default function PlayStack(props) {
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
                    <div style={targetStackStyle.cardStyle} onClick={() => ctx.clickOnPlayStack()}>{props.stack.length}</div>
                    {props.stack.map((card, index) => (
                        <div style={localStyle}>
                            <Card type={card.type}
                                face={card.face}
                                offset={index}
                                source="play"
                                clickCard={(c) => ctx.clickOnPlayStack(c)}
                            />
                        </div>

                    ))}
                </div>
            }</MyContext.Consumer>
    );
}