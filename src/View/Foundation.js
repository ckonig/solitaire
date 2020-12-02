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
        //fontSize: '30px',
        top: '0px',
    };

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
                <div style={localFaceStyle} >
                    <h1>
                        {props.model.icon}
                    </h1>
                </div>
            </div>
            {props.model.stack.map(card => (
                <div style={localStyle}>
                    <Card
                        blink={props.model.blinkFor}
                        type={card.type}
                        source={"foundation-"+props.index}
                        face={card.face}
                        onClick={(c) => props.onClick(c)} />
                </div>))}
        </div>

    );
}
