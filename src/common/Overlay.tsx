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
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.6",
                zIndex: 100,
            }}
        >
            {props.children}
        </div>
    );
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
