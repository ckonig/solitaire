import Card from "../Deck/Card";
import Model from "../Model";
import { XY } from "../../View/UI/XY";

export interface IStack {
    source: string;
    stack: Card[];
    getTop: () => Card | null;
    getClickable: () => Card[];
    setOnClick: (onClick: (c: any, p: XY, i: any) => (s: any) => void) => void;
    clickEmpty: (p: any) => (s: any) => void;
    blinkFor: number;
    //@todo this is broken
    unblink: (model: Model) => void;
    suggestion: boolean;
}
