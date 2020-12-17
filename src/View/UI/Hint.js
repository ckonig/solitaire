import React from "react";

const Hint = (props) => {
    const listenForH = (e) => {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 72) {
            props.suggestOnce();
        }
    };

    React.useEffect(() => {
        document.addEventListener("keydown", listenForH);
        return () => document.removeEventListener("keydown", listenForH);
    }, []);

    return props.suggestionMode !== "none" ? null : (
        <div>
            <button title="Hint" onClick={() => props.suggestOnce()}>
                💡
            </button>
        </div>
    );
};

export default Hint;
