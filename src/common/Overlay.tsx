import "./Overlay.css";

import React from "react";

interface IOverlayContext {
    overlayActive: boolean;
    toggleOverlay: (content?: any) => void;
}

const OverlayContext = React.createContext<IOverlayContext>({
    overlayActive: false,
    toggleOverlay: () => {},
});

export const useOverlayContext = () => React.useContext(OverlayContext);

const Overlay = (props: { children: any }) => {
    return <div className="overlay">{props.children}</div>;
};
export const OverlayContextProvider = (props: { children: any }) => {
    const [overlayActive, setActive] = React.useState<boolean>(false);
    const [content, setContent] = React.useState<any>(null);
    const context = {
        overlayActive,
        toggleOverlay: (content?: any) => {
            setActive(!!content);
            setContent(content);
        },
    };
    return (
        <OverlayContext.Provider value={context}>
            {overlayActive && <Overlay>{content}</Overlay>}
            {props.children}
        </OverlayContext.Provider>
    );
};
