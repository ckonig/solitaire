import Card from "../Deck/Card";
import Model from "../Model";

export interface IStack {
    source: string;
    stack: Card[];
    getTop: () => Card | null;
    getClickable: () => Card[];
    clickEmpty: (p: any) => (s: any) => void;
    blinkFor: number;
    unblink: (model: Model) => void;
    suggestion: boolean;
    accepts: (card: Card | null) => boolean;
}
