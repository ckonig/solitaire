import Card from './Card';
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

    var localBase = {...targetStackStyle.cardStyle}
    if (props.blinkFor > 0) {
        localBase.borderColor = 'red';
    }

    return (
        <div style={localOuterStyle}>
            <div style={localBase} onClick={() => props.onClick()}>&nbsp;</div>
            {props.model.stack.map((card, index) => (
                <div style={localStyle}>
                    <Card type={card.type}
                        face={card.face}
                        blink={props.model.blinkFor}
                        source="main"
                        offsetTop={index}
                        isHidden={card.hidden}
                        canUncover={index == props.model.stack.length - 1}
                        onClick={props.onClick}
                    />
                </div>
            ))}
        </div>
    );
}
