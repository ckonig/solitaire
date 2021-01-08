export class SuggestionMode {
    key: string;
    label: string;
    isTemporary: boolean;
    supportsHints: boolean;
    next: string | undefined;
    icon: string;
    description: string;
    constructor(key: string, obj: ISuggestionMode) {
        this.key = key;
        this.label = obj.label;
        this.icon = obj.icon;
        this.description = obj.description;
        this.isTemporary = !!obj.isTemporary;
        this.supportsHints = !!obj.supportsHints;
        this.next = obj.next;
    }
}

export type ISuggestionMode = {
    label: string;
    icon: string;
    description: string;
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
            description: 'No distractions. This enables one-time hints.',
            supportsHints: true,
            icon: "❌",
        },
        SCORED: {
            label: "Scored",
            description: 'Shows all actions that increase the score.',
            icon: "🏆",
        },
        REGULAR: {
            label: "Regular",
            description: 'Shows all possible actions except circular',
            icon: "💡",
        },
        FULL: {
            label: "Full",
            description: 'Shows all possible actions, even if they are circular',
            icon: "🎓",
        },
        ONCE: {
            label: "Single Action",
            description: 'triggered by manual hint in game',
            isTemporary: true,
            next: "NONE",
            icon: "⏳",
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
