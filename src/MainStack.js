import React, { Component } from 'react';
import { targetStackStyle } from './styles';

class MainStack extends Component {
    render() {
        var styles = {
            ...targetStackStyle
          };
        return (
            <div style={styles.cardStyle}>&nbsp;</div>
        );
    }
}

export default MainStack;