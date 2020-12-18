class SuggestionMode {
    key: string;
    label: string;
    isTemporary: boolean;
    supportsHints: boolean;
    next: string | undefined;
    constructor(key: string, obj: ISuggestionMode) {
        this.key = key;
        this.label = obj.label;
        this.isTemporary = !!obj.isTemporary;
        this.supportsHints = !!obj.supportsHints;
        this.next = obj.next;
    }
}

type ISuggestionMode = {
    label: string;
    isTemporary?: boolean;
    supportsHints?: boolean;
    next?: string;
};

export default class SuggestionModes {
    static NONE: string = "NONE";
    static SCORED: string = "SCORED";
    static REGULAR: string = "REGULAR";
    static FULL: string = "FULL";
    static ONCE: string = "ONCE";
    static TWICE: string = "TWICE";
    static raw: { [id: string]: ISuggestionMode } = {
        NONE: {
            label: "None",
            supportsHints: true,
        },
        SCORED: {
            label: "Scored",
        },
        REGULAR: {
            label: "Regular",
        },
        FULL: {
            label: "Full",
        },
        ONCE: {
            label: "Single Action",
            isTemporary: true,
            next: "NONE",
        },
    };
    static get = (key: string) => new SuggestionMode(key, SuggestionModes.raw[key]);
    static all = () => Object.keys(SuggestionModes.raw).map(SuggestionModes.get);
    static allSuggestionModes = () => SuggestionModes.all().filter((mode) => !mode.isTemporary);
    static default = () => SuggestionModes.get(SuggestionModes.NONE);
    static getHintMode = () => SuggestionModes.get(SuggestionModes.ONCE);
}
