import React from "react";
import { usePreview } from "react-dnd-preview";

const DndPreview = (props: { reff: any }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { display, _itemType, item, style } = usePreview();
    if (!display) {
        return null;
    }
    const rect = props.reff.getBoundingClientRect();
    return (
        <div
            style={{
                ...style,
                position: "relative",
                width: "100%",
                left: rect.left * -1,
                top: rect.top * -1,
                zIndex: 2000,
                opacity: 1,
            }}
        >
            {item.render}
        </div>
    );
};

export default DndPreview;
