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
                const x = e.clientX,
                    y = e.clientY;
                node.style.top = y + 25 +"px";
                node.style.left = x + 25 +"px";
                node.style.position = "relative";
            });
        }
    }

    render() {
        return this.isTouch ? null : (
            <div ref={this.myRef}>
                {this.props.stack &&
                    this.props.stack.map((card, index) => (
                        <Card
                            model={card}
                            key={"H" + index}
                            onClick={() => {
                                console.error("clicked card in mouse hand");
                            }}
                            offsetTop={index * 20}
                            zIndex={1000 + index * 20}
                            isSelected={true}
                        />
                    ))}
            </div>
        );
    }
}
