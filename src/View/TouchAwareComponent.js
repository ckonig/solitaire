import { Component } from "react";

export default class TouchAwareComponent extends Component {

    constructor(props) {
        super(props);
        this.isTouch = this.is_touch_device();
    }

    is_touch_device() {
        try {
            let prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

            let mq = function (query) {
                return window.matchMedia(query).matches;
            };

            if (('ontouchstart' in window) || (typeof window.DocumentTouch !== "undefined" && document instanceof window.DocumentTouch)) {
                return true;
            }

            return mq(['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join(''));
        } catch (e) {
            console.error('(Touch detect failed)', e);
            return false;
        }
    }

    shouldShowHand(source) {
        return this.isTouch && this.props.hand.isHoldingCard() && this.props.hand.source === source
    }
}