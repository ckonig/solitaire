import DelayedSuspense from "./DelayedSuspense";
import React from "react";
import ReactDOM from "react-dom";

const App = React.lazy(() => import("./App"));

ReactDOM.render(
    <React.StrictMode>
        <DelayedSuspense>
            <App />
        </DelayedSuspense>
    </React.StrictMode>,
    document.getElementById("root")
);
