"use client";

import { differenceInCalendarYears } from "date-fns";
import MonthGrid from "@/components/monthGrid";
import { MONTHS } from "@/utils/constants";
import YearDetails from "@/components/yearDetails";
import MonthSelector from "@/components/monthSelector";
import YearSelector from "@/components/yearSelector";
import HomeButton from "@/components/homeButton";

// Helper to format year labels based on the year's mathematical significance
function yearLabel(year: number, currentYear: number) {
    // 1. Calculate relative distance using date-fns
    const diff = differenceInCalendarYears(
        new Date(year, 0, 1),
        new Date(currentYear, 0, 1)
    );

    let relativeText = "";
    if (diff === 0) relativeText = "this year";
    else if (diff === 1) relativeText = "next year";
    else if (diff === -1) relativeText = "last year";
    else if (diff > 0) relativeText = `${diff} years from now`;
    else relativeText = `${Math.abs(diff)} years ago`;

    // 2. Determine the historical milestone of the year itself
    let milestone = "";
    if (year % 1000 === 0) {
        milestone = "Millennium";
    } else if (year % 100 === 0) {
        milestone = "Turn of the Century";
    } else if (year % 100 === 75) {
        milestone = "Diamond Jubilee"; // 75th year of the century
    } else if (year % 100 === 50) {
        milestone = "Golden Jubilee"; // 50th year of the century
    } else if (year % 100 === 25) {
        milestone = "Silver Jubilee"; // 25th year of the century
    } else if (year % 10 === 0) {
        milestone = "New Decade";
    }

    // Combine them smoothly
    if (milestone) {
        return `— ${milestone} • ${relativeText}`;
    }

    return `— ${relativeText}`;
}

export default function YearPageClient({ year, today }: { year: number; today: Date }) {
    return (
        <div style={{ minHeight: "100dvh", padding: "1rem", fontFamily: "Georgia, serif" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>

                {/* Left Side: Main Heading with Year Selector */}
                <h1 style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    fontSize: "1.5rem",
                    fontWeight: 300,
                    letterSpacing: "0.2em",
                    opacity: 0.9,
                    margin: 0
                }}>
                    <HomeButton />

                    <YearSelector currentYear={year} />

                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5 }}>
                        {yearLabel(year, today.getFullYear())}
                    </span>
                </h1>

                {/* Right Side: Month Details/Jump */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.4 }}>
                        Jump to Month
                    </span>
                    <MonthSelector />
                </div>

            </div>

            <div style={{ display: "flex", gap: "2rem", height: "calc(100dvh - 6rem)", overflow: "hidden" }}>

                {/* Left 2/5 — month grids */}
                <div style={{ flex: "2", overflowY: "auto", paddingRight: "0.5rem" }}>
                    <style>{`
                        .calendar-grid {
                            display: grid;
                            grid-template-columns: repeat(1, 1fr);
                            gap: 1.5rem;
                        }
                        @media (min-width: 640px) {
                            .calendar-grid { grid-template-columns: repeat(2, 1fr); }
                        }
                    `}</style>
                    <div className="calendar-grid">
                        {Array.from({ length: 12 }, (_, mi) => (
                            <MonthGrid
                                key={mi}
                                month={mi + 1}
                                monthName={MONTHS[mi]}
                                year={year}
                                today={today}
                            />
                        ))}
                    </div>
                </div>

                {/* Right 3/5 — year details */}
                <div style={{ flex: "3", overflowY: "auto", paddingLeft: "1rem", borderLeft: "1px solid rgba(0,0,0,0.1)" }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 300, letterSpacing: "0.2em", marginBottom: "1.5rem", opacity: 0.8 }}>
                        {year} — Overview
                    </h3>
                    <YearDetails year={year} />
                </div>

            </div>
        </div>
    );
}