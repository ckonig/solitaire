import Card from "./Card";
import GlobalContext from "../Context";
import React from "react";
import ReactGamePad from "react-gamepad";

export default class TouchHand extends React.Component {
    constructor(props) {
        super(props);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    static contextType = GlobalContext;

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyDown, false);
    }

    putBack = (context) => {
        this.props.hand.stack.length && this.props.hand.stack[0].onClick({ isKeyboard: true })(context);
    };

    enableKeyNav = (context, mode) => {
        const isSinglePlayer = context.settings.launchSettings.mode === "singleplayer";
        context.focus.isKeyBoard(true);
        if (isSinglePlayer) {
            context.settings.mouseMode = "remain-on-stack";
            context.settings.launchSettings.inputMode = mode;
        }
        //@hack: we need updateGameContext for UNDO but if there is not focus yet, this is not a business action
        context.game.timemachine.modified = true;
    };
    onKeyDown(e) {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 27 && this.props.hand && this.props.parentModel.source == this.props.hand.source) {
            this.context.updateGameContext((ctx) => {
                this.enableKeyNav(ctx, "keyboard");
                this.putBack(ctx);
            });
        }
    }
    buttonHandler = (e) => {
        if (e == "B" && this.props.hand.stack.length && this.props.parentModel.source == this.props.hand.source) {
            this.context.updateGameContext((ctx) => {
                this.enableKeyNav(ctx, "gamepad");
                this.putBack(ctx);
            });
        }
    };
    //@todo merge with mousehand
    render() {
        if (!this.props.hand || this.props.parentModel.source !== this.props.hand.source) {
            return null;
        }

        return (
            <>
                {[
                    this.props.hand &&
                        this.props.hand.stack &&
                        this.props.hand.stack.map((card, index) => (
                            <Card
                                key={index}
                                model={card}
                                canClick={true}
                                offsetTop={this.props.offsetTop + index * 24}
                                offsetLeft={this.props.offsetLeft}
                                zIndex={1000 + index * 20}
                                isSelected={true}
                                onClick={(_c, p) => this.props.onClick(p)}
                            />
                        )),
                ]}
                <ReactGamePad gamepadIndex={0} onButtonDown={this.buttonHandler}>
                    <span></span>
                </ReactGamePad>
            </>
        );
    }
}
