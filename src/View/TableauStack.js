import Card from './Card';
import { targetStackStyle } from '../styles';

export default function TableauStack(props) {

    var styles = {
        ...targetStackStyle
    };

    var localStyle = {
        position: 'absolute',
        left: '0px',
        top: '-0px',
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
            <div style={localCardStyle} onClick={() => props.onClick(null, "tableau-" + props.stackIndex)}>&nbsp;</div>
            {props.stack.map((card, index) => (
                <div style={localStyle}>
                    <Card
                        type={card.type}
                        face={card.face}
                        offsetTop={index * 20}
                        source={"tableau-" + props.stackIndex}
                        isHidden={card.hidden}
                        blink={props.blinkFor}
                        canUncover={index == props.stack.length - 1}
                        onClick={(c) => props.onClick(c, "tableau-" + props.stackIndex)}
                    />
                </div>
            ))}
        </div>
    );
}
