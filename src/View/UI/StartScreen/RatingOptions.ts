import { RatingSettings } from "../../../Common";
import { StartScreenState } from "./StartScreenContext";
import SuggestionModes from "../../../Model/Game/Settings/SuggestionModes";

export interface RatingPreset {
    id: number;
    icon: string;
    label: string;
    settings: RatingSettings;
    apply: (s: StartScreenState) => void;
}

const apply = (after: RatingSettings, s: StartScreenState, id: number) => {
    if (!s.ratingSettings.hintPenalty && after.hintPenalty) {
        s.suggestionMode = SuggestionModes.NONE;
    }
    //@todo remember which suggestion mode was there before, and reset to that on next change of hint penalty
    s.ratingSettings = { ...after };
    s.ratingPreset = id;
};

export default class RatingPresets {
    static CHILL = {
        timedMode: false,
        missPenalty: false,
        undoPenalty: false,
        hintPenalty: false,
    };

    static REGULAR = {
        timedMode: true,
        missPenalty: false,
        undoPenalty: true,
        hintPenalty: false,
    };

    static COMPETITIVE = {
        timedMode: true,
        missPenalty: true,
        undoPenalty: true,
        hintPenalty: true,
    };

    static ALL: RatingPreset[] = [
        {
            id: 0,
            icon: "🌴",
            label: "Chill",
            settings: { ...RatingPresets.CHILL },
            apply: (s) => apply(RatingPresets.CHILL, s, 0),
        },
        {
            id: 1,
            icon: "⚖️",
            label: "Regular",
            settings: { ...RatingPresets.REGULAR },
            apply: (s) => apply(RatingPresets.REGULAR, s, 1),
        },
        {
            id: 2,
            icon: "🏆",
            label: "Competitive",
            settings: { ...RatingPresets.COMPETITIVE },
            apply: (s) => apply(RatingPresets.COMPETITIVE, s, 2),
        },
    ];

    static matchPreset = (settings: any) => {
        const filterd = RatingPresets.ALL.filter((preset) => RatingPresets.equals(preset.settings, settings));
        if (filterd.length > 0) {
            return filterd[0].id;
        }
        return -1;
    };

    static equals = (s1: any, s2: any) =>
        s1.timedMode === s2.timedMode &&
        s1.missPenalty === s2.missPenalty &&
        s1.undoPenalty === s2.undoPenalty &&
        s1.hintPenalty === s2.hintPenalty;
}
