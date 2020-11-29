import React, { Component } from 'react';

import Card from './Card';
import { MyContext } from '../MyContext';
import { targetStackStyle } from '../styles';

export default function Stock(props) {
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
                    <div style={targetStackStyle.cardStyle} onClick={ctx.recycle}>&nbsp;</div>
                    {props.stack.map((card, index) => (
                        <div style={localStyle}>
                            <Card type={card.type}
                                face={card.face}
                                source="main"
                                offsetTop={index}
                                isHidden={card.hidden}
                                canUncover={index == props.stack.length - 1}
                                clickCard={ctx.clickStock}
                            />
                        </div>
                    ))}
                </div>
            }</MyContext.Consumer>
    );
}
