import { Metadata } from "next";
import hexToRgba from "@/utils/hexToRgba";
import getCurrentDateDetails from "@/lib/getCurrentDateDetails";
import isValidDate from "@/utils/isValidDate";
import NoDataFound from "@/components/noData";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ year: string; }>;
}): Promise<Metadata> {
    const { year, } = await params;
    const parts = [year,].filter(Boolean);
    const dateString = parts.join("/");
    return {
        title: `DateShade: ${dateString}`,
        description: "Dates, reimagined in color.",
    };
}

export default async function YearLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ year: string; }>;
}) {
    const { year, } = await params;
    const y = Number(year);


    if (!isValidDate(y)) return <NoDataFound />;

    const dateData = getCurrentDateDetails(y);

    const bg = dateData.palette.background;
    const primary = dateData.palette.primary;
    const secondary = dateData.palette.secondary;

    const gradientBg = `
        radial-gradient(circle at top left, ${hexToRgba(primary, 0.4)}, transparent 60%),
        radial-gradient(circle at bottom right, ${hexToRgba(secondary, 0.4)}, transparent 60%),
        ${bg}
    `;

    return (
        <>
            <style>{`body { background: ${gradientBg} !important; min-height: 100dvh; margin: 0; }`}</style>
            {children}
        </>
    );
}

