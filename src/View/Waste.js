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
    return (
        <div style={localOuterStyle}>
            <div style={targetStackStyle.cardStyle} onClick={() => props.onClick()}>&nbsp;</div>
            {props.stack.map((card, index) => (
                <div style={localStyle}>
                    <Card type={card.type}
                        face={card.face}
                        offsetTop={index}
                        source="waste"
                        onClick={(c) => props.onClick(c)}
                    />
                </div>

            ))}
        </div>
    );
}