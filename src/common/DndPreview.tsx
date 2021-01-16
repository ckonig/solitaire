import React from "react";
import { WindowDimensionContext } from "./AspectRatio/AspectRatio";
import { usePreview } from "react-dnd-preview";

const DndPreview = (props: { reff: HTMLElement }) => {
    const [rect, setRect] = React.useState<{ left: number; top: number }>();
    const { width, height } = React.useContext(WindowDimensionContext);
    React.useEffect(() => {
        const domRect = props.reff.getBoundingClientRect();
        setRect({
            left: domRect.left * -1,
            top: domRect.top * -1,
        });
        //@todo introduce resizeContext that we can subscribe to, so we only recalculate the BoundingClientRect of the container when window was resized
    }, [props.reff, width, height]);
    const { display, item, style } = usePreview();
    if (!display || !rect || !item) {
        return null;
    }
    return (
        <div
            style={{
                ...style,
                position: "relative",
                width: "100%",
                left: rect.left,
                top: rect.top,
                zIndex: 2000,
                opacity: 1,
            }}
        >
            {item.render}
        </div>
    );
};

export default DndPreview;
