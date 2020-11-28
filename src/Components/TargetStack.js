import React, { Component } from 'react';
import Card from './Card';
import { targetStackStyle } from '../styles';

class TargetStack extends Component {

    render() {

        var styles = {
            ...targetStackStyle
        };

        var localStyle = {
            position: 'absolute',
            left: '0px',
            top: '0px',
        };

        var localFaceStyle = {
            ...styles.faceStyle,
            fontSize: '30px',
            top: '0px',
        };

        var localOuterStyle = {
            position: 'relative',
        };

        var localCardStyle = { ...styles.cardStyle };

        if (this.props.blinkFor > 0) {
            localCardStyle.borderColor = 'red';
            console.log('setting RED border color');
        }

        return (
            <div style={localOuterStyle}>
                <div style={localCardStyle} onClick={() => this.props.onTargetStackClick()}>
                    <div style={localFaceStyle} >
                        <h1>
                            {this.props.icon}
                        </h1>
                    </div>
                </div>
                {this.props.stack.map(card => (
                    <div style={localStyle}>
                        <Card
                            blink={this.props.blinkFor}
                            type={card.props.type}
                            face={card.props.face}
                            clickCard={(c) => this.props.onTargetStackClick(c)} />
                    </div>))}
            </div>

        );
    }
}

export default TargetStack;