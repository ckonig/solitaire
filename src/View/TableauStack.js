import Card from './Card';
import StackBase from './StackBase';
import TouchHand from './TouchHand';

export default function TableauStack(props) {

    var offset = 0;
    var getOffset = (index) => {
        var i = 0;
        while (i <= index) {
            if (props.model.stack[i] && !props.model.stack[i].isHidden) {
                offset = i * 12 + (index - i) * 24
                return offset;
            }
            i++;
        }
        offset = index * 12;
        return offset;
    }

    return (
        <div>
            <StackBase blink={props.model.blinkFor} onClick={() => props.onClick(null, "tableau-" + props.index)} />
            {props.model.stack.map((card, index) => (
                <div className="stack-base" key={"tsc"+index}>
                    <Card                        
                        type={card.type}
                        face={card.face}
                        blink={props.model.blinkFor}
                        offsetTop={getOffset(index)}
                        source={card.source}
                        isHidden={card.isHidden}
                        canUncover={index == props.model.stack.length - 1}
                        onClick={(c) => props.onClick(c, "tableau-" + props.index)}
                    />
                </div>
            ))}
            <TouchHand
                parent={"tableau-" + props.index}
                hand={props.hand}
                offset={getOffset(props.model.stack.length)}
                onClick={(c) => props.onClick(props.model.stack[props.model.stack.length - 1], "tableau-" + props.index)} />
        </div>
    );
}
