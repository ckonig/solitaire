import Card from './Card';
import StackBase from './StackBase';
import TouchHand from './TouchHand';

export default function Foundation(props) {
    return (
        <div>
            <StackBase blink={props.model.blinkFor} onClick={() => props.onClick()} >
                <div className={"align-center foundation-base suit-" + props.model.icon}>
                    {props.model.icon}
                </div>
            </StackBase>
            {props.model.stack.map((card, index) => (
                <div className="stack-base" key={"fc" + index}>
                    <Card
                        blink={props.model.blinkFor}
                        type={card.type}
                        source={card.source}
                        face={card.face}
                        onClick={(c) => props.onClick(c)} />
                </div>))}
            <TouchHand
                parent={'foundation-' + props.index}
                hand={props.hand}
                onClick={(c) => props.onClick(props.model.stack[props.model.stack.length - 1])} />
        </div>
    );
}
