import Card from "./Card";
import CardModel from "../../Model/Deck/Card";
import Hand from "../../Model/Game/Hand";
import React from "react";
import StackBase from "./StackBase";
import TableauModel from "../../Model/Game/Tableau";
import TableauStackModel from "../../Model/Game/TableauStack";
import useBlinkEffect from "./Hooks/useBlinkEffect";
import useGlobalContext from "../GlobalContext";
import { useStackDrop } from "./Hooks/useStackDrop";

type TableauProps = { index: number; model: TableauStackModel; parent: TableauModel; hand: Hand };

const Tableau = () => {
    const { state } = useGlobalContext();
    return (
        <>
            {state.tableau.stacks.map((tableau, index) => (
                <TableauStack key={index} index={index} model={tableau} parent={state.tableau} hand={state.hand} />
            ))}
        </>
    );
};
export default Tableau;

const TableauStack = (props: TableauProps) => {
    useBlinkEffect((s) => s.tableau.stacks[props.index]);
    const drop = useStackDrop(props.model);
    const cards = props.hand.source === props.model.source ? [...props.model.stack, ...props.hand.stack] : [...props.model.stack];
    let offset = 1;
    const getOffset = (index: number, cards: CardModel[]) => {
        for (let i = 0; i <= index; i++) {
            if (cards[i] && !cards[i].isHidden) {
                offset = i * 12 + (index - i) * 24;
                return offset;
            }
        }
        offset = index * 12;
        return offset;
    };

    const classNames = "board-field tableau tableau-" + props.index

    return (
        <div className={classNames} ref={drop}>
            <StackBase model={props.model} />
            <Card
                index={0}
                key={0}
                models={cards}
                blink={props.model.blinkFor}
                isSuggested={(index) => props.model.suggestion && props.model.stack.length - 1 === index}
                offsetTop={(index, models) => getOffset(index, models)}
                isSelected={(index) => index > props.model.stack.length - 1}
            />
        </div>
    );
};
