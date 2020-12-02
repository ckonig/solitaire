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

    if (props.model.blinkFor > 0) {
        localCardStyle.borderColor = 'red';
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
                        offsetTop={index * 20}
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
