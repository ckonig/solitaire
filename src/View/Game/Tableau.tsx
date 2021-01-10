import TableauModel, { TableauStack } from "../../Model/Game/Tableau";

import Card from "./Card";
import CardModel from "../../Model/Deck/Card";
import GlobalContext from "../Context";
import React from "react";
import StackBase from "./StackBase";
import useBlinkEffect from "./useBlinkEffect";
import { useDrop } from "react-dnd";

type TableauProps = { index: number; model: TableauStack; parent: TableauModel };

const TableauStacks = () => {
    const { state } = React.useContext(GlobalContext);
    if (!state) return null;
    return (
        <>
            {state.tableau.stacks.map((tableau, index) => (
                <Tableau key={index} index={index} model={tableau} parent={state.tableau} />
            ))}
        </>
    );
};
export default TableauStacks;

const Tableau = (props: TableauProps) => {
    useBlinkEffect((s) => s.tableau.stacks[props.index]);
    const [accepting, setAccepting] = React.useState<boolean>(false);
    const { updateGameContext } = React.useContext(GlobalContext);
    const [, drop] = useDrop({
        accept: "card",
        canDrop: (item: any) => {
            const accepts = props.model.accepts(item.model);
            setAccepting(accepts);
            return accepts;
        },
        drop: () => {
            updateGameContext(props.model.clickEmpty({ isKeyBoard: false }));
        },
    });

    const { state } = React.useContext(GlobalContext);
    const cards = state?.hand.source == props.model.source ? [...props.model.stack, ...state.hand.stack] : [...props.model.stack];

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

    return (
        <div className="board-field" ref={drop}>
            <StackBase model={props.model} />
            <Card
                index={0}
                key={0}
                accepting={accepting}
                models={cards}
                blink={props.model.blinkFor}
                isSuggested={(index) => props.model.suggestion && props.model.stack.length - 1 == index}
                offsetTop={(index, models) => getOffset(index, models)}
                isSelected={(index) => index > props.model.stack.length - 1}
            />
        </div>
    );
};
