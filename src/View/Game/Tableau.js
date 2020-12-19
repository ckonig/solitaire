import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import GlobalContext from "../Context";
import Hand from "./Hand";
import React from "react";
import StackBase from "./StackBase";

export default class Tableau extends BlinkingComponent {
    constructor(props) {
        super((s) => s.tableau.stacks[props.index]);
    }

    static Stacks = () => {
        const { state, updateGameContext } = React.useContext(GlobalContext);
        const onClick = (c, p, i) => updateGameContext(state.tableau.onClick(c, p, i));
        return state.tableau.stacks.map((tableau, index) => (
            <Tableau key={index} index={index} model={tableau} parent={state.tableau} onClick={onClick} />
        ));
    };

    render() {
        const props = this.props;
        let offset = 0;
        const getOffset = (index) => {
            for (let i = 0; i <= index; i++) {
                if (props.model.stack[i] && !props.model.stack[i].isHidden) {
                    offset = i * 12 + (index - i) * 24;
                    return offset;
                }
            }
            offset = index * 12;
            return offset;
        };

        return (
            <div>
                <StackBase
                    parent={props.model.source}
                    suggested={props.model.suggestion && !props.model.stack.length}
                    blink={props.model.blinkFor}
                    onClick={(c,p) => props.onClick(null, p, props.index)}
                    visible={!props.model.stack.length}
                />
                {props.model.stack.map((card, index) => (
                    <Card
                        key={index}
                        model={card}
                        canClick={!card.isHidden || props.parent.canUncover(props.index, card)}
                        blink={props.model.blinkFor}
                        isSuggested={props.model.suggestion && props.model.stack.length - 1 == index}
                        offsetTop={getOffset(index)}
                        onClick={(card, p) => props.onClick(card, p, props.index)}
                    />
                ))}
                <Hand
                    parent={"tableau-" + props.index}
                    onClick={(card, p) => props.onClick(card, p, props.index)}
                    stack={props.model.stack}
                    offsetTop={getOffset(props.model.stack.length)}
                />
            </div>
        );
    }
}
