import Card from './Card';
import { targetStackStyle } from '../styles';

export default function Waste(props) {
    //@todo cleanup css
    var localStyle = {
        position: 'absolute',
        left: '0px',
        top: '0px',
    };
    var localOuterStyle = {
        position: 'relative',
    };
    var localBase = {...targetStackStyle.cardStyle}
    if (props.model.blinkFor > 0) {
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
                        //offsetTop={index}
                        source="waste"
                        onClick={(c) => props.onClick(c)}
                    />
                </div>

            ))}
        </div>
    );
}