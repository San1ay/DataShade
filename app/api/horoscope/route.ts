import PREDICTIONS, { COLORS, ZODIAC_FACTS, ZODIAC_SYMBOLS } from "@/lib/horoscope";
import { NextResponse } from "next/server";

// Helper function to create a deterministic hash
function generateHash(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    if (!year || !month) {
        return NextResponse.json({ error: "Missing year or month" }, { status: 400 });
    }

    // Tracking sets to ensure uniqueness across the 12 signs
    const usedColors = new Set<string>();
    const usedNumbers = new Set<number>();

    const allHoroscopes = Object.keys(ZODIAC_FACTS).map((sign) => {
        const seedString = `${sign}-${year}-${month}`;
        const uniqueHash = generateHash(seedString);

        // 1. Predictions can be shared if needed
        const predictionIndex = uniqueHash % PREDICTIONS.length;

        // 2. Find a unique color
        let colorIndex = uniqueHash % COLORS.length;
        // If the color name is already in the Set, move to the next one until we find a free one
        while (usedColors.has(COLORS[colorIndex].name)) {
            colorIndex = (colorIndex + 1) % COLORS.length;
        }
        // Mark this color as used for this month/year
        usedColors.add(COLORS[colorIndex].name);

        // 3. Find a unique lucky number (between 1 and 99)
        let luckyNumber = (uniqueHash % 99) + 1;
        // If the number is already in the Set, increment until we find a free one
        while (usedNumbers.has(luckyNumber)) {
            luckyNumber += 1;
            if (luckyNumber > 99) luckyNumber = 1; // Wrap around if it hits 100
        }
        // Mark this number as used
        usedNumbers.add(luckyNumber);

        // 4. Assemble the data
        const colorObj = COLORS[colorIndex];

        return {
            sign: sign,
            symbol: ZODIAC_SYMBOLS[sign],
            period: `${month}/${year}`,
            details: ZODIAC_FACTS[sign],
            monthly_horoscope: PREDICTIONS[predictionIndex],
            lucky_color_name: colorObj.name,
            lucky_color_hex: colorObj.hex,
            lucky_number: luckyNumber
        };
    });

    return NextResponse.json({ data: allHoroscopes }, {
        headers: { 'Cache-Control': 'public, s-maxage=31536000, immutable' }
    });
}