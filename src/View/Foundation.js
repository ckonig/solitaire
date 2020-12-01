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
        ...styles.faceStyle,
        fontSize: '30px',
        top: '0px',
    };

    var localOuterStyle = {
        position: 'relative',
    };

    var localCardStyle = { ...styles.cardStyle };

    if (props.blinkFor > 0) {
        localCardStyle.borderColor = 'red';
    }

    return (
        <div style={localOuterStyle}>
            <div style={localCardStyle} onClick={() => props.onClick()}>
                <div style={localFaceStyle} >
                    <h1>
                        {props.icon}
                    </h1>
                </div>
            </div>
            {props.stack.map(card => (
                <div style={localStyle}>
                    <Card
                        blink={props.blinkFor}
                        type={card.type}
                        source={"foundation-"+props.index}
                        face={card.face}
                        onClick={(c) => props.onClick(c)} />
                </div>))}
        </div>

    );
}
