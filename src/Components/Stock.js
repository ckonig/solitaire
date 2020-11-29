import React, { Component } from 'react';

import StockPile from './StockPile';
import Waste from './Waste';

export default function Stock(props) {

    return (
        <tr>
            <StockPile stack={props.stockPile} />
            <Waste stack={props.waste} />
        </tr>
    );
}
