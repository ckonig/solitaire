import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import React from "react";
import StackBase from "./StackBase";

export default class Stock extends BlinkingComponent {
    constructor() {
        super((s) => s.stock);
    }

    render() {
        const { state, updateGameContext } = this.context;
        const onClick = (c, p, i) => updateGameContext(state.stock.onClick(c, p, i));
        return (
            <div className="board-field stock">
                <StackBase
                    parent={state.stock.source}
                    blink={state.stock.blinkFor}
                    onClick={onClick}
                    suggested={state.stock.suggestion && !state.stock.stack.length}
                    visible={!state.stock.stack.length}
                />
                {state.stock.stack.map((card, index) => (
                    <Card
                        key={index}
                        model={card}
                        offsetTop={(index / 2) * -1}
                        blink={state.stock.blinkFor}
                        isSuggested={state.stock.suggestion && index == state.stock.stack.length - 1}
                        onClick={onClick}
                    />
                ))}
            </div>
        );
    }
}
