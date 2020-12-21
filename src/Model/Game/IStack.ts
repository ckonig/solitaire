import Card from "../Deck/Card";

export interface IStack {
    source: string;
    stack: Card[];
    getTop: () => Card;
    getClickable: () => Card[];
    setOnClick: () => void;
    clickEmpty: (p: any) => {};
}
