import type { Metadata } from "next";
import { Unbounded, Inter } from "next/font/google";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Military Auto — Підбір та доставка авто зі США під ключ | Пригон авто",
  description:
    "Підбираємо, викуповуємо та доставляємо авто зі США в Україну. Економія до 20%. Працюємо з Copart, IAAI, Manheim. 6 років досвіду, 1000+ авто.",
  openGraph: {
    title: "Military Auto — Підбір та доставка авто зі США під ключ",
    description:
      "Підбираємо, викуповуємо та доставляємо авто зі США в Україну. Економія до 20%.",
    type: "website",
    locale: "uk_UA",
    url: "https://militaryauto.ua",
    siteName: "Military Auto",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${unbounded.variable} ${inter.variable}`}>
      <body>
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
