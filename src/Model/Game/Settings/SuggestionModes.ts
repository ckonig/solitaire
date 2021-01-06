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
    static default = () => SuggestionModes.get(SuggestionModes.REGULAR);
    static getHintMode = () => SuggestionModes.get(SuggestionModes.ONCE);
    static next = (current: SuggestionMode) => {
        const all = SuggestionModes.allSuggestionModes();
        if (all[all.length - 1].key == current.key) {
            return all[0];
        }
        for (let i = 0; i < all.length; i++) {
            if (all[i].key == current.key) {
                return all[i + 1];
            }
        }
        return all[0];
    };
}
