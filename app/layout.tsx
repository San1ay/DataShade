import type { Metadata } from "next";
import "./globals.css";
import getDayPalette from "@/lib/getDayPalette";
import hexToRgba from "@/utils/hexToRgba";

export const metadata: Metadata = {
  title: "DateShade",
  description: "Dates, reimagined in color.",

  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const today = new Date();
  const todayData = getDayPalette(today.getFullYear() + 1, today.getMonth(), today.getDate());

  const bg = todayData.background;
  const primary = todayData.primary;
  const secondary = todayData.secondary;
  const gradientBg = `
  radial-gradient(circle at top left, ${hexToRgba(primary, 0.4)}, transparent 60%),
  radial-gradient(circle at bottom right, ${hexToRgba(secondary, 0.4)}, transparent 60%),
  ${bg}
`;

  return (
    <html lang="en">
      <body
        className={``}
        style={{
          background: gradientBg,
          minHeight: "100dvh",
        }}
      >
        {children}
      </body>
    </html>
  );
}