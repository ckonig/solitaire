import Card from './Card';
import { targetStackStyle } from '../styles';

export default function Foundation(props) {
    var styles = {
        ...targetStackStyle
    };

    var localStyle = {
        position: 'absolute',
        left: '0px',
        top: '0px',
    };

    var localFaceStyle = {
        fontSize: '6vw',
    };
    localFaceStyle.color = props.model.color;
    
    var localOuterStyle = {
        position: 'relative',
    };

    var localCardStyle = { ...styles.cardStyle };

    if (props.model.blinkFor > 0) {
        localCardStyle.borderColor = 'red';
    }

    return (
        <div style={localOuterStyle}>
            <div style={localCardStyle} onClick={() => props.onClick()}>
                <div className="mcontent" style={localFaceStyle}>
                    {props.model.icon}
                </div>
            </div>
            {props.model.stack.map(card => (
                <div style={localStyle}>
                    <Card
                        blink={props.model.blinkFor}
                        type={card.type}
                        source={"foundation-" + props.index}
                        face={card.face}
                        onClick={(c) => props.onClick(c)} />
                </div>))}
        </div>

    );
}
