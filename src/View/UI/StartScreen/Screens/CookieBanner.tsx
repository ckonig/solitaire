import StorageManager from "../../StorageManager";
import React from "react";
import { CookieContext, ICookieContext } from "../../../Context";
import { useFocusEffect } from "./ScreenElement";
import { XY } from "../../XY";
import {NavigationContext} from "../Context";

interface RenderCookieBannerProps extends ICookieContext, XY {}

const RenderCookieBanner = (props: RenderCookieBannerProps) => {
    const { navigation } = React.useContext(NavigationContext);
    const hasFocus = (y: number, x: number) => navigation.focus == "screen" && navigation.screen.x == x && navigation.screen.y == y;
    const inputEl = React.useRef<HTMLButtonElement>(null);
    useFocusEffect({ hasFocus: hasFocus(props.y, props.x) }, inputEl);
    let className = "cookiebanner";
    if (hasFocus(props.y, props.x)) {
        className += " focused";
    }
    return !props.consented ? (
        <button
            ref={inputEl}
            className={className}
            onClick={() => {
                const storage = new StorageManager();
                const consent = storage.giveConsent();
                if (!props.consented && confirm(consent.prompt)) {
                    consent.confirm();
                    props.setConsented(true);
                }
            }}
        >
            <div className="icon">🍪</div>
            <div className="message">
                <b>Changes on this page will be lost after each game</b>, until you allow this app to store data on your machine. Click here
                to give consent.
            </div>
        </button>
    ) : null;
};

const CookieBanner = (props: { x?: number; y?: number }) => {
    if (typeof props.x == "undefined" || typeof props.y == "undefined") {
        return null;
    }
    const { consented, setConsented } = React.useContext(CookieContext);
    return <RenderCookieBanner x={props.x} y={props.y} consented={consented} setConsented={setConsented} />;
};

export default CookieBanner;
