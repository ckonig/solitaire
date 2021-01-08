import React, { Suspense } from "react";

import RenderAfter from "./View/Game/RenderAfter";

const DelayedSuspense = (props: { children: any; fallback: any; delay: number }) => {
    return <Suspense fallback={<RenderAfter delay={props.delay}>{props.fallback}</RenderAfter>}>{props.children}</Suspense>;
};
export default DelayedSuspense;
