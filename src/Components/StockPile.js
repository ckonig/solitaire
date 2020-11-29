import Card from './Card';
import { MyContext } from '../MyContext';
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
        <MyContext.Consumer>
            {ctx =>
                <div style={localOuterStyle}>
                    <div style={targetStackStyle.cardStyle} onClick={() => ctx.clickStockPile()}>&nbsp;</div>
                    {ctx.stockPile.map((card, index) => (
                        <div style={localStyle}>
                            <Card type={card.type}
                                face={card.face}
                                source="main"
                                offsetTop={index}
                                isHidden={card.hidden}
                                canUncover={index == ctx.stockPile.length - 1}
                                clickCard={ctx.clickStockPile}
                            />
                        </div>
                    ))}
                </div>
            }
        </MyContext.Consumer>
    );
}
