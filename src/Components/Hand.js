import React, { Component } from 'react';
import Card from './Card';

export default class Hand extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        const node = this.myRef.current;
        console.log('component mounted')
        console.log(node);
        document.addEventListener('mousemove', (e) => {
            console.log('moving')
            var x = e.clientX,
                y = e.clientY;
            node.style.top = (y) + 'px';
            node.style.left = (x ) + 'px';
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
        return (
            <div style={outer}>
                <div ref={this.myRef}>

                    {this.props.stack && this.props.stack.map((card, index) => (
                        <Card
                            clickCard={this.props.setCurrentCard}
                            type={card.props.type}
                            offsetTop="100"
                            face={card.props.face}
                            isSelected={this.props.currentCard != null && this.props.currentCard.props.face == card.props.face && this.props.currentCard.props.type.icon == card.props.type.icon}
                        />
                    ))}
                </div>
            </div>
        );
    }
}