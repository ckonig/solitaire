import React, { ReactNode } from "react";

//@todo move to universal package
const RenderAfter = (props: { children: ReactNode | ReactNode[] | null; delay: number }) => {
    const [hidden, setHidden] = React.useState(true);
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setHidden(false);
        }, props.delay);

        return () => clearTimeout(timeout);
    }, []);
    if (hidden) return null;
    return <>{props.children}</>;
};

export default RenderAfter;
