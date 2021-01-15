import React, { Suspense } from "react";

import RenderAfter from "./RenderAfter";

const DelayedSuspense = (props: { children: React.ReactNode; fallback: React.ReactNode; delay: number }) => {
    return <Suspense fallback={<RenderAfter delay={props.delay}>{props.fallback}</RenderAfter>}>{props.children}</Suspense>;
};
export default DelayedSuspense;