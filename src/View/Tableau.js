import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import GlobalContext from "./Context";
import Hand from "./Hand";
import React from "react";
import StackBase from "./StackBase";

export default class Tableau extends BlinkingComponent {
    static Stacks = () => {
        const {state, business} = React.useContext(GlobalContext);
        return state.tableau.stacks.map((tableau, index) => (
            <Tableau
                settings={state.settings}
                key={index}
                index={index}
                model={tableau}
                hand={state.hand}
                onClick={(card, p) => business.clickTableau(card, p, index)}
            />
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
                    suggested={props.model.suggestion && !props.model.stack.length}
                    blink={props.model.blinkFor}
                    onClick={() => props.onClick(null, null, "tableau-" + props.index)}
                    visible={!props.model.stack.length}
                />
                {props.model.stack.map((card, index) => (
                    <Card
                        key={index}
                        model={card}
                        blink={props.model.blinkFor}
                        isSuggested={props.model.suggestion && props.model.stack.length - 1 == index}
                        offsetTop={getOffset(index)}
                        onClick={props.onClick}
                    />
                ))}
                <Hand
                    settings={props.settings}
                    parent={"tableau-" + props.index}
                    onClick={props.onClick}
                    model={props.hand}
                    stack={props.model.stack}
                    offsetTop={getOffset(props.model.stack.length)}
                />
            </div>
        );
    }
}
