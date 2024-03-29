import { mdiDuck, mdiGoogleDownasaur, mdiKangaroo, mdiRodent, mdiShark, mdiSnake } from "@mdi/js";

export interface DifficultyOption {
    id: number;
    settings: {
        drawMode: string;
        recyclingMode: string;
    };
    icon: string;
    lines: string[];
}
const DifficultyOptions: DifficultyOption[] = [
    {
        id: 0,
        settings: { drawMode: "single", recyclingMode: "infinite" },
        icon: mdiDuck ,
        lines: ["Turn 1 card", "No Limit"],
    },
    {
        id: 1,
        settings: { drawMode: "single", recyclingMode: "3-pass" },
        icon: mdiKangaroo ,
        lines: ["Turn 1 card", "Three passes"],
    },
    {
        id: 2,
        settings: { drawMode: "single", recyclingMode: "1-pass" },
        icon: mdiShark  ,
        lines: ["Turn 1 card", "Only a single pass"],
    },
    {
        id: 3,
        settings: { drawMode: "triple", recyclingMode: "infinite" },
        icon: mdiRodent  ,
        lines: ["Turn 3 cards", "No limit"],
    },
    {
        id: 4,
        settings: { drawMode: "triple", recyclingMode: "3-pass" },
        icon: mdiSnake  ,
        lines: ["Turn 3 cards ", "Three passes"],
    },
    {
        id: 5,
        settings: { drawMode: "triple", recyclingMode: "1-pass" },
        icon: mdiGoogleDownasaur ,
        lines: ["Turn 3 cards ", "Only a single pass"],
    },
];

export default DifficultyOptions;
