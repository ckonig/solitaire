import Card from './Card';
import { targetStackStyle } from '../styles';

export default function TableauStack(props) {

    var styles = {
        ...targetStackStyle
    };

    var localStyle = {
        position: 'absolute',
        left: '0px',
        top: '0px',
    };

    var localOuterStyle = {
        position: 'relative',
        height: '30vw',

    };

    var localCardStyle = { ...styles.cardStyle };

    if (props.model.blinkFor > 0) {
        localCardStyle.borderColor = 'red';
    }

    var getOffset = (index) => {
        var i = 0;
        while (i <= index) {
            if (props.model.stack[i] && !props.model.stack[i].hidden) {
                return i * 12 + (index - i) * 24
            }
            i++;
        }
        return index*12;
    }

    return (
        <div style={localOuterStyle}>
            <div style={localCardStyle} onClick={() => props.onClick(null, "tableau-" + props.stackIndex)}>&nbsp;</div>
            {props.model.stack.map((card, index) => (
                <div style={localStyle}>
                    <Card
                        type={card.type}
                        face={card.face}
                        blink={props.model.blinkFor}
                        offsetTop={getOffset(index)}
                        //@todo control source in model
                        source={"tableau-" + props.stackIndex}
                        isHidden={card.hidden}
                        canUncover={index == props.model.stack.length - 1}
                        onClick={(c) => props.onClick(c, "tableau-" + props.stackIndex)}
                    />
                </div>
            ))}
        </div>
    );
}
