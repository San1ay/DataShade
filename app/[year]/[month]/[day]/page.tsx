import getDayDetails from "@/lib/getDayDetails";
import isValidDate from "@/utils/isValidDate";



export default async function Page({
    params,
}: {
    params: Promise<{ year: string; month: string; day: string }>;
}) {
    const { year, month, day } = await params;

    const y = Number(year);
    const m = Number(month);
    const d = Number(day);

    if (!isValidDate(y, m, d)) return <div>No data found for this date.</div>;

    const data = getDayDetails(y, m, d);

    return (
        <div
            style={{
                minHeight: "100dvh",
                color: data.palette.text,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h1>{data.name}</h1>
            <p>{data.palette.background}</p>
            <ul>
                {data.traits.map((t: string) => (
                    <li key={t}>{t}</li>
                ))}
            </ul>
        </div>
    );
}