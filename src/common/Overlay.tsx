import "./Overlay.css";

import React from "react";

interface IOverlayContext {
    overlayActive: boolean;
    toggleOverlay: (content?: any, before?: () => void, after?: () => void) => void;
}

const OverlayContext = React.createContext<IOverlayContext>({
    overlayActive: false,
    toggleOverlay: () => {},
});

export const useOverlayContext = () => React.useContext(OverlayContext);

const Overlay = (props: { children: any; before?: () => void; after?: () => void }) => {
    React.useEffect(() => {
        props.before && props.before();
        return () => {
            props.after && props.after();
        };
        //@todo once-time rendering
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className="overlay">{props.children}</div>;
};
type callable = { call: () => void };
const defaultCallable = { call: () => {} };
export const OverlayContextProvider = (props: { children: any }) => {
    const [overlayActive, setActive] = React.useState<boolean>(false);
    const [content, setContent] = React.useState<any>(null);
    const [_after, setAfter] = React.useState<callable>(defaultCallable);
    const [_before, setBefore] = React.useState<callable>(defaultCallable);
    const context = {
        overlayActive,
        toggleOverlay: (content?: any, before?: () => void, after?: () => void) => {
            setActive(!!content);
            setContent(content);
            if (before) {
                setBefore({ call: before });
            }
            if (after) {
                setAfter({ call: after });
            }
        },
    };
    return (
        <OverlayContext.Provider value={context}>
            {overlayActive && (
                <Overlay before={_before.call} after={_after.call}>
                    {content}
                </Overlay>
            )}
            {props.children}
        </OverlayContext.Provider>
    );
};
