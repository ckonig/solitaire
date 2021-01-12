import DelayedSuspense from "./common/DelayedSuspense";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import React from "react";
import ReactDOM from "react-dom";

const App = React.lazy(() => import("./App"));

ReactDOM.render(
    <React.StrictMode>
        <DelayedSuspense delay={500} fallback={<h3>Initializing...</h3>}>
            <DndProvider options={HTML5toTouch}>
                <App />
            </DndProvider>
        </DelayedSuspense>
    </React.StrictMode>,
    document.getElementById("root")
);
