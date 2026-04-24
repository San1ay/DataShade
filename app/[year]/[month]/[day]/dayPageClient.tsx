"use client";

import { useRouter, useParams } from "next/navigation";
import { format, intervalToDuration, formatDuration } from "date-fns";
import { MONTHS } from "@/utils/constants";
import EventsSection from "@/components/eventsSection";
import ZodiacSection from "@/components/zodiacSection";
import OnThisDaySection from "@/components/onThisDaySection";
import HomeButton from "@/components/homeButton";

// Helper to format: "Friday, 2 years 3 months 5 days ago"
function formatRelativeDateLabel(year: number, month: number, day: number) {
    const targetDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight for accurate distance

    // Get the full weekday name (e.g., "Friday")
    const dayName = format(targetDate, "EEEE");

    if (targetDate.getTime() === today.getTime()) {
        return `— ${dayName}, Today`;
    }

    const isFuture = targetDate > today;

    // Calculate exact difference in years, months, and days
    const duration = intervalToDuration({
        start: isFuture ? today : targetDate,
        end: isFuture ? targetDate : today
    });

    // Formats into a clean string: "2 years 3 months 5 days"
    const durationStr = formatDuration(duration, {
        format: ['years', 'months', 'days']
    });

    return `— ${dayName}, ${durationStr} ${isFuture ? "from now" : "ago"}`;
}

export default function DayPageClient() {
    const router = useRouter();
    const params = useParams();

    const year = Number(params.year);
    const month = Number(params.month);
    const day = Number(params.day);

    const years = Array.from({ length: 21 }, (_, i) => 2020 + i);
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Date comparison to hide "On This Day" / News for future dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const requestedDate = new Date(year, month - 1, day);
    const isFutureDate = requestedDate > today;

    // Navigation: Moves day by delta and handles month/year rollovers automatically
    const navigateDay = (delta: number) => {
        const d = new Date(year, month - 1, day);
        d.setDate(d.getDate() + delta);
        router.push(`/${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`);
    };

    const handleJump = (y: number, m: number, d: number) => {
        router.push(`/${y}/${m}/${d}`);
    };

    const navButtonStyle: React.CSSProperties = {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "1.2rem",
        opacity: 0.4,
        padding: "0 0.5rem",
        transition: "opacity 0.2s"
    };

    const selectStyle: React.CSSProperties = {
        appearance: "none",
        WebkitAppearance: "none",
        background: "transparent",
        border: "none",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        fontFamily: "inherit",
        fontSize: "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        cursor: "pointer",
        outline: "none",
        opacity: 0.6,
        padding: "0 4px",
    };

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return <div style={{ padding: "2rem", opacity: 0.5 }}>Loading chronological data...</div>;
    }

    return (
        <div style={{ minHeight: "100dvh", padding: "1rem", fontFamily: "Georgia, serif" }}>
            <style>{`
                .day-layout-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 3rem;
                }
                .jump-select:hover { opacity: 1 !important; border-bottom-color: rgba(0,0,0,0.4) !important; }
                .nav-arrow:hover { opacity: 1 !important; }
                .breadcrumb:hover { opacity: 1 !important; border-bottom-style: solid !important; }
                @media (min-width: 768px) {
                    .day-layout-grid { grid-template-columns: 1fr 2.5fr; align-items: start; }
                }
            `}</style>

            <header style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4rem",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                paddingBottom: "1.5rem"
            }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                    <HomeButton />
                    <h1 style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1.5rem",
                        fontWeight: 300,
                        letterSpacing: "0.1em",
                        opacity: 0.9,
                        margin: 0,
                        whiteSpace: "nowrap"
                    }}>
                        <button className="nav-arrow" onClick={() => navigateDay(-1)} style={navButtonStyle}>&lt;</button>
                        <span
                            className="breadcrumb"
                            style={{ borderBottom: "1px dashed currentColor", cursor: "pointer", opacity: 0.8, transition: "opacity 0.2s" }}
                            onClick={() => router.push(`/${year}`)}
                        >
                            {year}
                        </span>

                        <span style={{ opacity: 0.2, margin: "0 0.75rem", fontWeight: 100 }}>/</span>

                        <span
                            className="breadcrumb"
                            style={{ borderBottom: "1px dashed currentColor", cursor: "pointer", opacity: 0.8, transition: "opacity 0.2s" }}
                            onClick={() => router.push(`/${year}/${month}`)}
                        >
                            {MONTHS[month - 1]}
                        </span>

                        <span style={{ opacity: 0.2, margin: "0 0.75rem", fontWeight: 100 }}>/</span>

                        <span style={{ minWidth: "1.5rem", textAlign: "center" }}>{day}</span>

                        <button className="nav-arrow" onClick={() => navigateDay(1)} style={navButtonStyle}>&gt;</button>
                    </h1>

                    <span style={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        opacity: 0.5,
                        whiteSpace: "nowrap"
                    }}>
                        {formatRelativeDateLabel(year, month, day)}
                    </span>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <span style={{ fontSize: "0.6rem", opacity: 0.4, letterSpacing: "0.1em" }}>JUMP TO</span>
                    <select className="jump-select" value={year} onChange={(e) => handleJump(parseInt(e.target.value), month, day)} style={selectStyle}>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>

                    <select className="jump-select" value={month} onChange={(e) => handleJump(year, parseInt(e.target.value), day)} style={selectStyle}>
                        {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                    </select>

                    <select className="jump-select" value={day} onChange={(e) => handleJump(year, month, parseInt(e.target.value))} style={selectStyle}>
                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
            </header>

            <div className="day-layout-grid">
                <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                    {/* Guardian News Component */}
                    {!isFutureDate && (
                        <div style={{ opacity: 0.8 }}>
                            <h2 style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 400 }}>
                                World News
                            </h2>
                            <EventsSection year={year} month={month} day={day} />
                        </div>
                    )}

                    {/* Wikipedia History Component */}
                    <div style={{ opacity: 0.8 }}>
                        <OnThisDaySection month={month} day={day} />
                    </div>
                </div>

                <div>
                    <ZodiacSection year={year} month={month} day={day} />
                </div>
            </div>
        </div>
    );
}