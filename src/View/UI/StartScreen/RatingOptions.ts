export default class RatingPresets {
    static all = [
        {
            id: 0,
            icon: "🌴",
            label: "Chill",
            settings: {
                timedMode: false,
                missPenalty: false,
                undoPenalty: false,
                hintPenalty: false,
            },
        },
        {
            id: 1,
            icon: "⚖️",
            label: "Regular",
            settings: {
                timedMode: true,
                missPenalty: false,
                undoPenalty: true,
                hintPenalty: false,
            },
        },
        {
            id: 2,
            icon: "🏆",
            label: "Competitive",
            settings: {
                timedMode: true,
                missPenalty: true,
                undoPenalty: true,
                hintPenalty: true,
            },
        },
    ];
    static matchPreset = (settings: any) => {
        const filterd = RatingPresets.all.filter((preset) => RatingPresets.equals(preset.settings, settings));
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
