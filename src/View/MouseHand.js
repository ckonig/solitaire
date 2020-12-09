import Card from "./Card";
import { Component } from "react";
import React from "react";

export default class MouseHand extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.state = {
            positionFixed: true,
        };
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousemove", this.onMouseMove, false);
        if (this.props.putBack) {
            document.addEventListener("keydown", this.onKeyDown, false);
        }
        this.setState(() => ({
            positionFixed: true,
        }));
    }

    componentWillUnmount() {
        document.removeEventListener("mousemove", this.onMouseMove, false);
        document.addEventListener("keydown", this.onKeyDown, false);
    }

    onMouseMove = (e) => {
        if (this.state.positionFixed) {
            this.setState((state) => {
                state.positionFixed = false;
                return { ...state };
            });
        }
        this.updateDisplay(e);
    };

    updateDisplay(e) {
        if (!this.state.positionFixed) {
            const node = this.myRef.current;
            if (this.props.hand && this.props.parent == this.props.hand.source) {
                if (e) {
                    const x = e.clientX - this.props.hand.position.click.x + this.props.hand.position.element.x,
                        y = e.clientY - this.props.hand.position.click.y + this.props.hand.position.element.y;
                    node.style.top = y + "px";
                    node.style.left = x + "px";
                    node.style.position = "absolute";
                }
            }
        }
    }

    onKeyDown(e) {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 27 && this.props.hand && this.props.parent == this.props.hand.source) this.props.putBack();
    }

    render() {
        const getOffsetTop = (index) => {
            if (this.state.positionFixed) {
                return this.props.offsetTop + index * 24;
            }
            return index * 24;
        };
        if (!this.props.hand || this.props.parent !== this.props.hand.source) {
            return null;
        }
        return (
            <div ref={this.myRef}>
                {this.props.hand &&
                    this.props.hand.stack &&
                    this.props.hand.stack.map((card, index) => (
                        <Card model={card} key={index} offsetTop={getOffsetTop(index)} zIndex={1000 + index * 20} isSelected={true} />
                    ))}
            </div>
        );
    }
}
