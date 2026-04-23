import Link from "next/link";
import getDayPalette from "@/lib/getDayDetails";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const days: { key: string; month: number; day: number }[] = [];

  for (let month = 1; month <= 12; month++) {
    const daysInMonth = new Date(currentYear, month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        key: `${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
        month,
        day,
      });
    }
  }

  return (
    <div className="min-h-dvh p-4">
      <h1 className="text-2xl font-bold mb-4">🎨 Year in Colors</h1>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
        {days.map(({ key, month, day }) => {
          const value = getDayPalette(currentYear, month, day);

          return (
            <Link key={key} href={`/${String(currentYear).padStart(2, "0")}/${String(month).padStart(2, "0")}/${day}`}>
              <div
                className="rounded-xl p-3 h-20 flex flex-col justify-between cursor-pointer hover:scale-105 transition"
                style={{
                  background: `linear-gradient(135deg, ${value.palette.primary}, ${value.palette.secondary})`,
                  color: value.palette.text,
                }}
              >
                <span className="text-xs opacity-80">
                  {String(month).padStart(2, "0")}/{String(day).padStart(2, "0")}
                </span>

                <span className="text-[10px] font-medium truncate">
                  {value.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}