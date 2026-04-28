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
  alternates: {
    canonical: "https://militaryauto.net",
  },
  openGraph: {
    title: "Military Auto — Підбір та доставка авто зі США під ключ",
    description:
      "Підбираємо, викуповуємо та доставляємо авто зі США в Україну. Економія до 20%.",
    type: "website",
    locale: "uk_UA",
    url: "https://militaryauto.net",
    siteName: "Military Auto",
    images: [
      {
        url: "https://militaryauto.net/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Military Auto — пригін авто зі США в Україну",
      },
    ],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Military Auto",
  description:
    "Підбір та доставка автомобілів зі США в Україну. 6 років досвіду, понад 1000 авто.",
  url: "https://militaryauto.net",
  telephone: "+380000000000",
  email: "info@militaryauto.net",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Київ",
    addressCountry: "UA",
  },
  areaServed: { "@type": "Country", name: "Ukraine" },
  priceRange: "$$",
  openingHours: "Mo-Sa 09:00-20:00",
  image: "https://militaryauto.net/og-image.jpg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${unbounded.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
