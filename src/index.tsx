import DelayedSuspense from "./common/DelayedSuspense";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "@pspdfkit-labs/react-dnd-html5-backend";
import React from "react";
import ReactDOM from "react-dom";

//@todo implement custom html5 provider using requestAnimationFrame
// see https://github.com/react-dnd/react-dnd/compare/main...PSPDFKit-labs:main
//@todo implement custom Html5totouch provider
//@todo implement custom dragLayer for preview

const App = React.lazy(() => import("./App"));

ReactDOM.render(
    <React.StrictMode>
        <DelayedSuspense delay={500} fallback={<h3>Initializing...</h3>}>
            <DndProvider backend={HTML5Backend}>
                <App />
            </DndProvider>
        </DelayedSuspense>
    </React.StrictMode>,
    document.getElementById("root")
);
