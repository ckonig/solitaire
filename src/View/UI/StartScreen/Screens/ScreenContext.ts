import React from "react";

interface IScreenContext {
    closeScreen: () => void;
}

const ScreenContext = React.createContext<IScreenContext>({
    closeScreen: () => {},
});

export default ScreenContext;
