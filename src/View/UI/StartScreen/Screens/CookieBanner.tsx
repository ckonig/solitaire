import StorageManager from "../../StorageManager";
import React from "react";
import { CookieContext, ICookieContext } from "../../../Context";

const RenderCookieBanner = (props: ICookieContext) => {
    return !props.consented ? (
        <button
            className="cookiebanner"
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

const CookieBanner = () => {
    const { consented, setConsented } = React.useContext(CookieContext);
    return <RenderCookieBanner consented={consented} setConsented={setConsented} />;
};

export default CookieBanner;
