const DifficultyOptions = [
    {
        id: 0,
        settings: { drawMode: "single", recyclingMode: "infinite" },
        icon: "🐭",
        lines: ["Turn 1 card at once.", "No limit on passes", "through the deck."],
    },
    {
        id: 1,
        settings: { drawMode: "single", recyclingMode: "3-pass" },
        icon: "🐹",
        lines: ["Turn 1 card at once.", "Three passes", "through the deck."],
    },
    {
        id: 2,
        settings: { drawMode: "single", recyclingMode: "1-pass" },
        icon: "🐰",
        lines: ["Turn 1 card at once.", "Only a single pass", "through the deck."],
    },
    {
        id: 3,
        settings: { drawMode: "triple", recyclingMode: "infinite" },
        icon: "🐨",
        lines: ["Turn 3 cards at once", "No limit on passes", "through the deck"],
    },
    {
        id: 4,
        settings: { drawMode: "triple", recyclingMode: "3-pass" },
        icon: "🐼",
        lines: ["Turn 3 cards at once.", "Three passes", "through the deck."],
    },
    {
        id: 5,
        settings: { drawMode: "triple", recyclingMode: "1-pass" },
        icon: "🐻",
        lines: ["Turn 3 cards at once.", "Only a single pass", "through the deck."],
    },
];

export default DifficultyOptions;
