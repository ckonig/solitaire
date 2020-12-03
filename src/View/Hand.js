import React, { Component } from 'react';

import Card from './Card';
import TouchAwareComponent from './TouchAwareComponent';

export default class Hand extends TouchAwareComponent {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        const node = this.myRef.current;
        if (!this.is_touch_device()) {
            document.addEventListener('mousemove', (e) => {
                var x = e.clientX,
                    y = e.clientY;
                node.style.top = (y) + 'px';
                node.style.left = (x) + 'px';
                node.style.position = 'relative'
            });
        }
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

        if (this.isTouch) {
            return (<span></span>);
        }

        return (
            <div style={outer}>
                <div ref={this.myRef}>

                    {this.props.stack && this.props.stack.map((card, index) => (
                        <div style={localStyle}>
                            <Card
                                offsetTop={index * 20}
                                zIndex={1000 + (index * 20)}
                                type={card.type}
                                face={card.face}
                                isSelected={true}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}