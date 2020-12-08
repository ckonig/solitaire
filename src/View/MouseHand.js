import Card from "./Card";
import React from "react";
import TouchAwareComponent from "./TouchAwareComponent";

export default class MouseHand extends TouchAwareComponent {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidMount() {
        if (!this.isTouch) {
            document.addEventListener("mousemove", this.onMouseMove, false);

            if (this.props.putBack) {
                document.addEventListener("keydown", this.onKeyDown, false);
            }
        }
    }

    componentWillUnmount() {
        if (!this.isTouch) {
            document.removeEventListener("mousemove", this.onMouseMove, false);
            document.addEventListener("keydown", this.onKeyDown, false);
        }
    }

    onMouseMove(e) {
        if (!this.isTouch) {
            const node = this.myRef.current;
            if (this.props.hand && this.props.parent == this.props.hand.source) {
                const x = e.clientX,
                    y = e.clientY;
                node.style.top = y + 25 + "px";
                node.style.left = x + 25 + "px";
                node.style.position = "absolute";
                node.style.display = "block";
            } else {
                node.style.display = "none";
            }
        }
    }

    onKeyDown(e) {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 27 && !this.isTouch && this.props.hand && this.props.parent == this.props.hand.source) this.props.putBack();
    }

    render() {
        return (
            <div ref={this.myRef}>
                {!this.isTouch &&
                    this.props.hand &&
                    this.props.parent == this.props.hand.source &&
                    this.props.stack &&
                    this.props.stack.map((card, index) => (
                        <Card
                            model={card}
                            key={index}
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
