import YearPageClient from "./yearPageClient";
import YearSelector from "@/components/yearSelector"; // or ScrollYearSelector depending on which you kept
import MonthSelector from "@/components/monthSelector";
import isValidDate from "@/utils/isValidDate";
import HomeButton from "@/components/homeButton";



export default async function YearPage({ params }: { params: Promise<{ year: string }> }) {
    const { year } = await params;
    const y = Number(year);
    const today = new Date();

    if (!isValidDate(y)) return <div>Invalid year.</div>;

    return <YearPageClient year={y} today={today} />

}