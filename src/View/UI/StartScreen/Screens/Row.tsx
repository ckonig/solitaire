import React from "react";
import { ScreenNavigator } from "./ScreenNavigator";

const Row = (props: { skip?: boolean; y?: number; navigator?: ScreenNavigator; children?: any[] | any | undefined }) => {
    if (typeof props.y == "undefined" || typeof props.navigator == "undefined") {
        return null;
    }
    const addElement = (child: any, index: number) => {
        const assign = (n: any[]) => {
            n[props.y || 0].buttons[index || 0] = { x: index, y: props.y };
        };
        if (!props.skip) {
            assign(props.navigator?.rows || []);
        }
        return React.cloneElement(child, { key: index, x: index, y: props.y });
    };
    return !props.children ? null : (
        <div className="row">{Array.isArray(props.children) ? props.children.map(addElement) : addElement(props.children, 0)}</div>
    );
};
export default Row;
