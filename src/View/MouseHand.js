import Card from "./Card";
import React from "react";
import TouchAwareComponent from "./TouchAwareComponent";

export default class MouseHand extends TouchAwareComponent {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        if (!this.isTouch) {
            const node = this.myRef.current;
            document.addEventListener("mousemove", (e) => {
                var x = e.clientX,
                    y = e.clientY;
                node.style.top = y + "px";
                node.style.left = x + "px";
                node.style.position = "relative";
            });
        }
    }

    render() {
        return this.isTouch ? null : (
            <div ref={this.myRef}>
                {this.props.stack &&
                    this.props.stack.map((card, index) => (
                        <div className="stack-base" key={"H" + index}>
                            <Card
                                onClick={() => {
                                    console.log("clicked card in hand");
                                }}
                                offsetTop={index * 20}
                                zIndex={1000 + index * 20}
                                type={card.type}
                                face={card.face}
                                isSelected={true}
                            />
                        </div>
                    ))}
            </div>
        );
    }
}
