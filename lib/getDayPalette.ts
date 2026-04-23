import { Palette } from "@/types/colorsType";
import seedDate from "@/utils/seedDate";


function hslToHex(h: number, s: number, l: number) {
    s /= 100;
    l /= 100;

    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);

    const f = (n: number) =>
        Math.round(
            255 *
            (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))
        );

    return `#${[f(0), f(8), f(4)]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")}`;
}

// clamp helper
const clampHue = (h: number) => (h + 360) % 360;

function getDayPalette(year: number, month: number, day: number): Palette {

    const baseHue = Math.floor(seedDate(year, month, day) * 360);
    const satSeed = seedDate(year, month, day, 1000);
    const lightSeed = seedDate(year, month, day, 2000);

    const saturation = 55 + Math.floor(satSeed * 25);    // 55–80
    const lightness = 45 + Math.floor(lightSeed * 15);  // 45–60

    const primary = hslToHex(baseHue, saturation, lightness);
    const secondary = hslToHex(clampHue(baseHue + 30), saturation - 5, lightness);
    const accent = hslToHex(clampHue(baseHue + 180), saturation + 5, lightness - 5);
    const background = hslToHex(baseHue, 30, 95);
    const text = "#1a1a1a";

    return { primary, secondary, accent, background, text };
}

export default getDayPalette;