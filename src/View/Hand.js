import React, { Component } from 'react';

import Card from './Card';
import { targetStackStyle } from '../styles';

export default class Hand extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        const node = this.myRef.current;
        document.addEventListener('mousemove', (e) => {
            var x = e.clientX,
                y = e.clientY;
            node.style.top = (y) + 'px';
            node.style.left = (x) + 'px';
            node.style.position = 'relative'
        });
    }

    render() {
        var outer = {
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '0px',
            height: '0px',
        }

        var styles = {
            ...targetStackStyle
        };

        var localStyle = {
            position: 'absolute',
            left: '0px',
            top: '0px',
        };

        return (
            <div style={outer}>
                <div ref={this.myRef}>

                    {this.props.stack && this.props.stack.map((card, index) => (
                        <div style={localStyle}>
                            <Card
                                offsetTop={index * 20}
                                zIndex={1000 + (index * 20)}
                                type={card.props.type}
                                face={card.props.face}
                                isSelected={true}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}