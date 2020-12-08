import Card from "./Card";
import { Component } from "react";
import React from "react";

export default class MouseHand extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousemove", this.onMouseMove, false);
        if (this.props.putBack) {
            document.addEventListener("keydown", this.onKeyDown, false);
        }
    }

    componentWillUnmount() {
        document.removeEventListener("mousemove", this.onMouseMove, false);
        document.addEventListener("keydown", this.onKeyDown, false);
    }

    onMouseMove(e) {
        this.updateDisplay(e);
    }

    updateDisplay(e) {
        const node = this.myRef.current;
        if (this.props.hand && this.props.parent == this.props.hand.source) {
            if (e) {
                const x = e.clientX - this.props.hand.position.click.x + this.props.hand.position.element.x,
                    y = e.clientY - this.props.hand.position.click.y + this.props.hand.position.element.y;
                node.style.top = y + "px";
                node.style.left = x + "px";
                node.style.display = "block";
            } else {
                this.setBasePosition(node);
            }

            node.style.position = "absolute";
        } else {
            node.style.display = "none";
        }
    }

    setBasePosition(node) {
        node.style.position = "absolute";
        if (this.props.hand && this.props.parent == this.props.hand.source) {
            const x = this.props.hand.position.element.x,
                y = this.props.hand.position.element.y;
            console.log('render as', x, y)
            node.style.top = y + "px";
            node.style.left = x + "px";
            node.style.display = "block";
        } else {
            node.style.display = "none";
        }
    }

    onKeyDown(e) {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 27 && this.props.hand && this.props.parent == this.props.hand.source) this.props.putBack();
    }

    render() {
        const node = { style: {} };
        this.setBasePosition(node);
        return (
            <div ref={this.myRef} style={node.style}>
                {this.props.hand &&
                    this.props.parent == this.props.hand.source &&
                    this.props.hand.stack &&
                    this.props.hand.stack.map((card, index) => (
                        <Card model={card} key={index} offsetTop={index * 24} zIndex={1000 + index * 20} isSelected={true} />
                    ))}
            </div>
        );
    }
}
