import React, { Component } from 'react';
import { targetStackStyle } from './styles';

class PlayStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stack: [],
        };
    }

    render() {
        var styles = {
            ...targetStackStyle
        };
        return (
            <div style={styles.cardStyle}>&nbsp;</div>
        );
    }
}

export default PlayStack;