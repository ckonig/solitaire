import Card from './Card';
import { targetStackStyle } from '../styles';

export default function StockPile(props) {
    var localStyle = {
        position: 'absolute',
        left: '0px',
        top: '0px',
    };

    var localOuterStyle = {
        position: 'relative',
    };

    return (
        <div style={localOuterStyle}>
            <div style={targetStackStyle.cardStyle} onClick={() => props.clickStockPile()}>&nbsp;</div>
            {props.stockPile.map((card, index) => (
                <div style={localStyle}>
                    <Card type={card.type}
                        face={card.face}
                        source="main"
                        offsetTop={index}
                        isHidden={card.hidden}
                        canUncover={index == props.stockPile.length - 1}
                        clickCard={props.clickStockPile}
                    />
                </div>
            ))}
        </div>
    );
}
