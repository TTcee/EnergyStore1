import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat_Alternates } from "next/font/google";
import { Rubik_Mono_One, Montserrat } from "next/font/google";
import "./globals.css";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserratAlt = Montserrat_Alternates({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat-alt",
  display: "swap",
});

const rubikMonoOne = Rubik_Mono_One({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-rubik-mono-one",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Energy Store",
  description: "Сайт компанії з виробництва акумуляторів",
icons: {
    icon: "/logoV.png", // або /favicon.ico
  },};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="uk"
      className={`${montserratAlt.variable} ${geistMono.variable} ${geistSans.variable} ${rubikMonoOne.variable} ${montserrat.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
