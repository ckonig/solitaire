import Card from "./Card";
import GlobalContext from "../Context";
import React from "react";

export default class TouchHand extends React.Component {
    constructor(props) {
        super(props);
    }

    static contextType = GlobalContext;

    enableKeyNav = (context, mode) => {
        const isSinglePlayer = context.settings.launchSettings.gameMode === "singleplayer";
        context.focus.isKeyBoard(true);
        if (isSinglePlayer) {
            context.settings.mouseMode = "remain-on-stack";
            context.settings.launchSettings.inputMode = mode;
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
                                offsetTop={this.props.offsetTop + index * 24}
                                offsetLeft={this.props.offsetLeft}
                                zIndex={1000 + index * 20}
                                isSelected={true}
                                onClick={(_c, p) => this.props.onClick(p)}
                            />
                        )),
                ]}
            </>
        );
    }
}
