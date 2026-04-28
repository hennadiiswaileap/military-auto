import type { Metadata } from "next";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";

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
    <html lang="uk">
      <body>
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
