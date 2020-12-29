import StorageManager from "../../StorageManager";
import React from "react";
import { CookieContext, ICookieContext } from "../../../Context";
import { useFocusEffect } from "./MenuElement";
interface RenderCookieBannerProps extends ICookieContext {
    hasFocus: boolean;
}
const RenderCookieBanner = (props: RenderCookieBannerProps) => {
    const inputEl = React.useRef<HTMLButtonElement>(null);
    useFocusEffect({ ...props, x: 0, y: 0 }, inputEl);
    let className = "cookiebanner";
    if (props.hasFocus) {
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

const CookieBanner = (props: { hasFocus: boolean }) => {
    const { consented, setConsented } = React.useContext(CookieContext);
    return <RenderCookieBanner hasFocus={props.hasFocus} consented={consented} setConsented={setConsented} />;
};

export default CookieBanner;
