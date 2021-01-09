import DelayedSuspense from "./common/DelayedSuspense";
import React from "react";
import ReactDOM from "react-dom";

const App = React.lazy(() => import("./App"));

ReactDOM.render(
    <React.StrictMode>
        <DelayedSuspense delay={500} fallback={<h3>Initializing...</h3>}>
            <App />
        </DelayedSuspense>
    </React.StrictMode>,
    document.getElementById("root")
);
