import BlinkingComponent from "./BlinkingComponent";
import Card from "./Card";
import GlobalContext from "../Context";
import PauseContext from "../PauseContext";
import React from "react";
import StackBase from "./StackBase";

const usePrevious = (value) => {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

const Renderer = (props) => {
    const { state } = React.useContext(PauseContext);
    const { paused, started } = state;
    return <InnerRenderer length={props.length} paused={paused} started={started} />;
};

const InnerRenderer = (props) => {
    const context = React.useContext(GlobalContext);
    const { length, started, paused } = props;
    const previous = usePrevious({ length, paused, started });
    React.useEffect(() => {
        let timeout = null;
        if (context.state.settings.launchSettings.speed && previous && started && !paused && (previous.length != length || previous.started != started || previous.paused != paused)) {
            timeout = setTimeout(() => {
                context.updateContext((state) => {
                    if (length == state.stock.stack.length && state.stock.passes > 0 && (state.stock.stack.length || state.waste.stack.length)) {
                        if (state.hand.isFromWaste()) {
                            state.waste.putDownHand();
                        }
                        if (state.stock.stack.length) {
                            state.waste.addAll(state.stock.popTop());
                        } else if (state.stock.canRecycle()) {
                            state.stock.recycle(state.waste.recycle());
                        }
                    }
                });
            }, 10000);
        }
        return () => clearTimeout(timeout);
    }, [length, paused, started]);

    return (
        <div className="board-field stock">
            <StackBase model={context.state.stock} />
            {context.state.stock.stack.map((card, index) => (
                <Card
                    key={index}
                    model={card}
                    offsetTop={(index / 2) * -1}
                    zIndex={index}
                    blink={context.state.stock.blinkFor}
                    isSuggested={context.state.stock.suggestion && index == context.state.stock.stack.length - 1}
                />
            ))}
        </div>
    );
};
//Can't use multiple contexts in one React class, need two renderer functions to feed two contexts into props for reliable detection of changes
export default class Stock extends BlinkingComponent {
    constructor() {
        super((s) => s.stock);
    }

    render() {
        return <Renderer length={this.context.state.stock.stack.length} />;
    }
}
