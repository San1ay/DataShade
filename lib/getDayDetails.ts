import { BirthdayData } from "@/types/colorsType";
import getDayPalette from "./getDayPalette";

const adjectives = [
    "Calm", "Bold", "Creative", "Energetic", "Wise",
    "Gentle", "Confident", "Mysterious", "Optimistic", "Focused"
];

const nouns = [
    "Spirit", "Dreamer", "Leader", "Thinker", "Explorer",
    "Visionary", "Artist", "Guardian", "Seeker", "Builder"
];

function getDayDetails(year: number | string, month: number | string, day: number | string): BirthdayData {
    const y = Number(year);
    const m = Number(month);
    const d = Number(day);

    const palette = getDayPalette(y, m, d);

    const seed = m * 31 + d * 97 + y * 367;

    const name = `${adjectives[seed % adjectives.length]} ${nouns[(seed * 3) % nouns.length]}`;

    const traits = [
        adjectives[(seed + 1) % adjectives.length],
        adjectives[(seed + 2) % adjectives.length],
        nouns[(seed + 3) % nouns.length],
    ];

    return { name, palette, traits };
}

export default getDayDetails;