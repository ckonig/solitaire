import React, { Suspense } from "react";

const DelayedFallback = () => {
    const [show, setShow] = React.useState(false);
    React.useEffect(() => {
        const timeout = setTimeout(() => setShow(true), 500);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return <>{show && <h3>Loading ...</h3>}</>;
};
const DelayedSuspense = (props: { children: any }) => {
    return <Suspense fallback={<DelayedFallback />}>{props.children}</Suspense>;
};
export default DelayedSuspense;
