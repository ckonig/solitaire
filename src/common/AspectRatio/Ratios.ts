export interface Ratio {
    prefix: string;
    multiplier: number;
}
export default class Ratios {
    static _16to9: Ratio = {
        prefix: "16-to-9",
        multiplier: 1.7778,
    };
    static _4to3: Ratio = {
        prefix: "4-to-3",
        multiplier: 1.3333,
    };
}
